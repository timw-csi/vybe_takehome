import { connection, PublicKey } from "../utils/connection";
import redisClient from "../cache/redisClient";
import { WALLETS } from "../config/constants";
import { IWalletBalance } from "../models";

/**
 *
 * @returns Promise with array of objects with wallet address string and balance number
 */
const fetchWalletBalance = async (): Promise<IWalletBalance[] | number> => {
  try {
    const cachedData = await redisClient.get("walletBalance");
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const balances = await Promise.all(
      WALLETS.map(async (wallet) => {
        const balance = await connection.getBalance(new PublicKey(wallet));
        return {
          wallet,
          balance,
        };
      })
    );

    // enter stringified array of wallet balances into cache. expire after 2 minutes
    // to balance between real-time and rate limiting
    redisClient.set("walletBalance", JSON.stringify(balances), {
      EX: 120,
    });

    return balances;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

export default fetchWalletBalance;
