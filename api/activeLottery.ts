import { NowRequest, NowResponse } from "@vercel/node";
import { getIssueIndex, getBaseLottery, getDrawedLottery } from "../utils/lottery";
import { defaultDrawedLotteryInfo } from '../configs/lottery'
import { ILottery, LotteryStatus, ResError } from '../types/lottery';

export const activelottery = async (): Promise<
  | ILottery
  | ResError
> => {
  const issueIndex = await getIssueIndex();
  if (typeof issueIndex !== "string") {
    return issueIndex;
  }

  const baseLottery = await getBaseLottery(issueIndex);
  if (baseLottery.lotteryStatus !== LotteryStatus.Completed) {
    // not drawed
    return {
      ...baseLottery,
      ...defaultDrawedLotteryInfo
    }
  }
  const drawedLotterInfo = await getDrawedLottery(issueIndex);

  return {
    ...baseLottery,
    ...drawedLotterInfo
  }
};

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  const data = await activelottery();
  res.status(200).send(data);
};
