const API_KEY = process.env.API_KEY;

export const SOLANA_RPC_ENDPOINT: string = `${process.env.SOLANA_URL}${API_KEY}`;
export const PRICE_API_ENDPOINT: string = `${process.env.PRICE_API}`;
export const PORT: number = Number(process.env.PORT);
export const LONG_TTL: number = 900;
export const SHORT_TTL: number = 10;
export const ONE_MINUTE: number = 60000;
export const ONE_HOUR: number = 3600000;
export const BILLION: number = 1000000000;
export const SPL_TOKENS = [
  "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm", //$WIF
  "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN", //JUP
  "HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3", //PYTH
  "85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ", //W
  "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263", //BONK
];
