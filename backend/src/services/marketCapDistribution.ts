import axios from "axios";
import { connection, PublicKey } from "../utils/connection";
import redisClient from "../cache/redisClient";
import BigNumber from "bignumber.js";
import { IMarketCap } from "../models";
import { BILLION, LONG_TTL, SPL_TOKENS } from "../config/constants";
import { PRICE_API_ENDPOINT } from "../config/constants";
import { SettledResult } from "../models/settledResult";

/**
 * @param
 * @returns Promise with array of market cap results.
 *
 */
const fetchMarketCapDistribution = async (
  tokens: string[]
): Promise<IMarketCap[]> => {
  // check cache first for data
  try {
    const cachedData = await redisClient.get("marketCapDistribution");
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    // retrieve current supply, use price API to get token price, multiply for market cap.
    // future work: break out call to Price API to its own function. Jupiter API takes array
    // of token addresses, so could consolidate separate price calls into one array.
    const marketCapData: SettledResult<IMarketCap>[] = await Promise.allSettled(
      tokens.map(async (token) => {
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

        // TODO: include in front end legend that marketcap # is in denom of billions
        const marketCap = totalSupply
          .multipliedBy(tokenPrice)
          .div(BILLION)
          .dp(2)
          .toNumber();

        return {
          symbol,
          token,
          marketCap,
        };
      })
    );

    // filter out rejected
    let fulfilledMarketCaps: IMarketCap[] = marketCapData
      .filter((data) => data.status == "fulfilled")
      .map((data) => data.value);

    // enter stringified array of marketCap objects into cache. expire after 15 minutes.
    // market caps aren't as dynamic as wallets and tps, hence longer TTL
    redisClient.set(
      "marketCapDistribution",
      JSON.stringify(fulfilledMarketCaps),
      {
        EX: LONG_TTL,
      }
    );

    return fulfilledMarketCaps;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default fetchMarketCapDistribution;
