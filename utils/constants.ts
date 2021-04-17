import { ChainId, Token } from "@pancakeswap-libs/sdk";

// BEP-20 addresses.
export const CAKE = "0xaaae746b5e55d14398879312660e9fde07fbc1dc";
export const WBNB = "0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f";
export const DEAD = "0x000000000000000000000000000000000000dEaD";

// Contract addresses.
export const CAKE_BNB_FARM = "0xf9783240ecc6126727a43ff43316d932e942fc3a";
export const MASTERCHEF_CONTRACT = "0xa02fF30986211B7ca571AcAE5AD4D25ab1e58426";
export const LOTTERY_CONTRACT = "0x3C3f2049cc17C136a604bE23cF7E42745edf3b91";
export const MULTICALL_CONTRACT = "0x8dd2f8105Dbaf80821fC5085EBa50Ca7927C6bdf";

// PancakeSwap SDK Token.
export const CAKE_TOKEN = new Token(ChainId.MAINNET, CAKE, 18);
export const WBNB_TOKEN = new Token(ChainId.MAINNET, WBNB, 18);
export const CAKE_BNB_TOKEN = new Token(ChainId.MAINNET, CAKE_BNB_FARM, 18);
