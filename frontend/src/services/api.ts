import axios from "axios";
import { API_BASE_URL } from "../config/constants";

export const getMarketCapDistribution = async (tokens: string[]) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/market-cap-distribution`,
      {
        params: {
          tokens: tokens.join(","),
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getTransactionsPerSecond = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions-per-second`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getWalletBalances = async (wallets: string[]) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/wallet-balance`, {
      params: {
        wallets: wallets.join(","),
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
