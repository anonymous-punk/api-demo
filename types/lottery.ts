export const enum LotteryStatus {
  NotStarted = "0", // The lottery has not started yet
  Open = "1", // The lottery is open for ticket purchases
  Closed = "2", // The lottery is no longer open for ticket purchases
  Completed = "3", // The lottery has been closed and the numbers drawn
}

export interface ResError {
  error: string;
  errorMessage: string;
}

export interface BaseLottery {
  id: string;
  poolSize: string;
  totalTickets: string;
  winningNumbers: string[];
  lotteryStatus: LotteryStatus;
}

export interface DrawedLottery {
  match4Ticket: string;
  match3Ticket: string;
  match2Ticket: string;
  poolMatch4: string;
  poolMatch3: string;
  poolMatch2: string;
  burned: string;
}

export type ILottery = DrawedLottery & BaseLottery;
