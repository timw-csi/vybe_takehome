import { connection } from "../utils/connection";
import redisClient from "../cache/redisClient";
import { ONE_HOUR, ONE_MINUTE, SHORT_TTL } from "../config/constants";
import { TPSData } from "../models";

let tpsHistory: TPSData[] = [];
/**
 *
 * @returns Promise with number representing sample transactions per second
 */
const fetchTransactionsPerSecond = async (): Promise<number> => {
  try {
    const cachedData = await redisClient.get("transactionsPerSecond");
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const recentPerformanceSamples =
      await connection.getRecentPerformanceSamples(1);
    let tps;

    // guard clause against empty sample array
    if (recentPerformanceSamples.length > 0) {
      // divide number of transactions by 60 seconds
      tps =
        recentPerformanceSamples[0].numTransactions /
        recentPerformanceSamples[0].samplePeriodSecs;

      // round to 2 decimals for front end graph presentation
      tps = Math.round(tps);
      // enter tps into cache. expire cached entry after 10 seconds for near-real time accuracy
      // while also protecting against excessive API calls
      redisClient.set("transactionsPerSecond", JSON.stringify(tps), {
        EX: SHORT_TTL,
      });

      return tps;
    }

    console.log(tps);
    return 0;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

// figure out best way to: "Choose the timeframe for an optimized interval
// based on data availability and server load considerations."
const refreshTPSHistory = async () => {
  const tps = await fetchTransactionsPerSecond();
  const timestamp = Date.now();
  tpsHistory.push({ timestamp, tps });

  // Store TPS records for one hour at max
  const oneHourAgo = timestamp - ONE_HOUR;
  tpsHistory = tpsHistory.filter((tps) => tps.timestamp >= oneHourAgo);
};

const fetchTPSHistory = async (): Promise<TPSData[]> => {
  return tpsHistory;
};

refreshTPSHistory(); // call once so frontend time series chart has at least one datapoint
setInterval(refreshTPSHistory, ONE_MINUTE); // update TPS history with new data every minute

export default fetchTPSHistory;
