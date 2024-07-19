import axios from "axios";
import { connection, PublicKey } from "../utils/connection";
import redisClient from "../cache/redisClient";
import BigNumber from "bignumber.js";
import { IMarketCap } from "../models";
import { LONG_TTL, SPL_TOKENS } from "../config/constants";
import { PRICE_API_ENDPOINT } from "../config/constants";

/**
 * @param
 * @returns Promise with array of market cap results.
 *
 */
const fetchMarketCapDistribution = async (): Promise<IMarketCap[]> => {
  // check cache first for data
  try {
    const cachedData = await redisClient.get("marketCapDistribution");
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    // retrieve current supply, use price API to get token price, multiply for market cap.
    // future work: break out call to Price API to its own function. Jupiter API takes array
    // of token addresses, so could consolidate separate price calls into one array.
    const marketCapData: IMarketCap[] = await Promise.all(
      SPL_TOKENS.map(async (token) => {
        const { data: priceDataObj } = await axios.get(
          `${PRICE_API_ENDPOINT}${token}`
        );
        const price = priceDataObj.data[token].price;
        const symbol = priceDataObj.data[token].mintSymbol;
        const supply = await connection.getTokenSupply(new PublicKey(token));

        //use BigNumber to avoid loss of precision with numbers beyond JS safe int range
        const totalSupply = supply.value.uiAmountString
          ? BigNumber(supply.value.uiAmountString)
          : BigNumber(0);
        const tokenPrice = BigNumber(price);

        const marketCap = totalSupply.multipliedBy(tokenPrice).dp(2).toFixed(2);

        return {
          symbol,
          token,
          marketCap,
        };
      })
    );
    // enter stringified array of marketCap objects into cache. expire after 15 minutes.
    // market caps aren't as dynamic as wallets and tps, hence longer TTL
    redisClient.set("marketCapDistribution", JSON.stringify(marketCapData), {
      EX: LONG_TTL,
    });

    return marketCapData;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Get ratio of each token's market cap to total of all 5 tokens's combined market cap
// for use in 'series' data of front end pie chart
const fetchMarketCapRatio = async () => {
  try {
    const tokenMarketCaps = await fetchMarketCapDistribution();
    const combinedMarketCaps = tokenMarketCaps.reduce((acc, cur) => {
      const curMarketCap = cur.marketCap;
      return BigNumber(acc).plus(BigNumber(curMarketCap));
    }, BigNumber(0));

    const ratiosAdded = tokenMarketCaps.map((tokenMarketCapObj) => {
      const ratio = BigNumber(tokenMarketCapObj.marketCap)
        .dividedBy(combinedMarketCaps)
        .multipliedBy(100)
        .dp(0)
        .toNumber();
      return { ...tokenMarketCapObj, ratio };
    });

    return ratiosAdded;
  } catch (err) {
    console.log(err);
  }
};

export default fetchMarketCapRatio;
