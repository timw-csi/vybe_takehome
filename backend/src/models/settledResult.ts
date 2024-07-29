interface FulfilledResult<T> {
  status: "fulfilled";
  value: T;
}

interface RejectedResult {
  status: "rejected";
  reason: string;
}

export type SettledResult<T> = FulfilledResult<T> | RejectedResult;
