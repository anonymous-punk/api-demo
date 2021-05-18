import { NowRequest, NowResponse } from "@vercel/node";
import punksJson from "./config/punks.json";
import { PUNK_TYPES, ALL_ACCESSORIES } from "./config/type";

export const getPunkMeta = (punkId: string) => {
  if (+punkId < 0 || +punkId > 9999) {
    throw new Error("PunkIndex out of range");
  }
  // @ts-ignore
  const rawPunk = punksJson[punkId];
  return {
    punkIndex: punkId,
    type: PUNK_TYPES[rawPunk.t],
    accessories: rawPunk.a.map((idx: number) => ALL_ACCESSORIES[idx]),
  };
};

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  try {
    const { punkId } = req.query;
    const data = getPunkMeta(punkId as string);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: "internal server error" });
  }
};
