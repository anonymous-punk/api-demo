import Web3 from "web3";

const HECO_NODE_RPC = [
  // "https://http-testnet.hecochain.com",
  "https://http-mainnet-node.defibox.com",
  "https://http-mainnet.hecochain.com",
];

const HECO_ARCHIVE_NODE_RPC = [
  "https://bsc-private-dataseed1.nariox.org/",
  "https://bsc-private-dataseed4.nariox.org/",
];

export const getWeb3 = (archive = false): Web3 => {
  const provider: string = archive
    ? HECO_ARCHIVE_NODE_RPC[Math.floor(Math.random() * HECO_ARCHIVE_NODE_RPC.length)]
    : HECO_NODE_RPC[Math.floor(Math.random() * HECO_NODE_RPC.length)];

  return new Web3(new Web3.providers.HttpProvider(provider, { timeout: 30000 }));
};

export const getContract = (abi: any, address: string, archive = false) => {
  const web3: Web3 = getWeb3(archive);

  return new web3.eth.Contract(abi, address);
};
