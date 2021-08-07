import BigNumber from 'bignumber.js'

export const bnToDec = (bn: BigNumber | string, decimals = 18): string => {
  return new BigNumber(bn).dividedBy(new BigNumber(10).pow(decimals)).toString()
}

export const decToBn = (dec: number | string, decimals = 18): string => {
  return new BigNumber(dec).multipliedBy(new BigNumber(10).pow(decimals)).toString()
}
