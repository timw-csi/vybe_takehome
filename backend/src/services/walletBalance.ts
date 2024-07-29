import { connection, PublicKey } from "../utils/connection";
import redisClient from "../cache/redisClient";
import { IWalletBalance } from "../models";
import { SettledResult } from "../models/settledResult";

/**
 *@param array of strings, wallet addresses
 * @returns Promise with array of objects with wallet address string and balance number
 */
const fetchWalletBalance = async (wallets: string[]) => {
  try {
    const cachedData = await redisClient.get("walletBalance");
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    let balances: SettledResult<IWalletBalance>[] = await Promise.allSettled(
      wallets.map(async (wallet) => {
        const balance = await connection.getBalance(new PublicKey(wallet));
        return {
          wallet,
          balance,
        };
      })
    );

    // filter out rejected
    let fulfilledBalances: IWalletBalance[] = balances
      .filter((bal) => bal.status == "fulfilled")
      .map((bal) => bal.value);

    // enter stringified array of wallet balances into cache. expire after 2 minutes
    // to balance between real-time and rate limiting
    redisClient.set("walletBalance", JSON.stringify(fulfilledBalances), {
      EX: 120,
    });
    return fulfilledBalances;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

export default fetchWalletBalance;
