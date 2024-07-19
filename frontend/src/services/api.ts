import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api"; // Change if needed

export const getMarketCapDistribution = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/market-cap-distribution`);
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

export const getWalletBalances = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/wallet-balance`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
