import BigNumber from "bignumber.js";
import { PromisifyBatchRequest } from "../lib/PromiseBatchRequest";
import { LOTTERY_CONTRACT } from "./constants";
import { getContract } from "./web3";
import { bnToDec } from "../utils/number";
import lotteryABI from "./abis/lottery.json";
import { ticketPrice, ratesToUse } from "../configs/lottery";
import { BaseLottery, DrawedLottery, LotteryStatus, ResError } from "../types/lottery";

export const getIssueIndex = async (): Promise<string | ResError> => {
  const lotteryContract = getContract(lotteryABI, LOTTERY_CONTRACT);
  let issueIndex = "0";
  let retryIsseIndex = 0;
  while (issueIndex === "0" && retryIsseIndex <= 3) {
    try {
      issueIndex = await lotteryContract.methods.issueIndex().call();
    } catch (error) {
      issueIndex = "0";
      retryIsseIndex++;
    }
  }
  if (+issueIndex < 1) {
    return {
      error: "Internal Server Error",
      errorMessage: `Internal Server Error try again later`,
    };
  }
  return issueIndex;
};

export const getBaseLottery = async (index: string): Promise<BaseLottery> => {
  const lotteryContract = getContract(lotteryABI, LOTTERY_CONTRACT);
  const batch = new PromisifyBatchRequest<string>();
  const batch2 = new PromisifyBatchRequest<string>();
  [
    lotteryContract.methods.winningNumbers(0).call,
    lotteryContract.methods.winningNumbers(1).call,
    lotteryContract.methods.winningNumbers(2).call,
    lotteryContract.methods.winningNumbers(3).call,
  ].map((x) => batch.add(x));
  [
    lotteryContract.methods.totalAmount().call,
    lotteryContract.methods.getTotalTickets().call,
    lotteryContract.methods.lotteryStatus().call,
  ].map((x) => batch2.add(x));
  const [res1, res2] = await Promise.all([batch.execute(), batch2.execute()]);

  const baseLottery: BaseLottery = {
    id: index,
    poolSize: bnToDec(res2[0]),
    totalTickets: res2[1],
    lotteryStatus: res2[2] as LotteryStatus,
    winningNumbers: res1,
  };

  return baseLottery;
};

const cropTicket = (rawNum: string) => new BigNumber(bnToDec(rawNum)).dividedBy(ticketPrice).toFixed(0);
const cropPercent = (poolSize: string, rate: string) => new BigNumber(poolSize).multipliedBy(rate).toFixed(0);

export const getDrawedLottery = async (index: string): Promise<DrawedLottery> => {
  const lotteryContract = getContract(lotteryABI, LOTTERY_CONTRACT);
  const batch = new PromisifyBatchRequest<string>();
  [
    lotteryContract.methods.historyAmount(index, 0).call,
    lotteryContract.methods.historyAmount(index, 1).call,
    lotteryContract.methods.historyAmount(index, 2).call,
    lotteryContract.methods.historyAmount(index, 3).call,
  ].map((x) => batch.add(x));
  const res = await batch.execute();
  const poolSize = bnToDec(res[0]);

  const drawedLottery: DrawedLottery = {
    match4Ticket: cropTicket(res[1]),
    match3Ticket: cropTicket(res[2]),
    match2Ticket: cropTicket(res[3]),
    poolMatch4: cropPercent(poolSize, ratesToUse.match4),
    poolMatch3: cropPercent(poolSize, ratesToUse.match3),
    poolMatch2: cropPercent(poolSize, ratesToUse.match2),
    burned: cropPercent(poolSize, ratesToUse.burned),
  };

  return drawedLottery;
};
