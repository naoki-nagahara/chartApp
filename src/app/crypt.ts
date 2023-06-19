export type ColoType = {
  [key: string]: string;
};
export const ColorObj: ColoType = {
  BTC: ' RGB(236, 145, 33)',
  ETH: 'RGB(95, 122, 227)',
  LTC: 'white',
  MONA: 'RGB(222, 199, 153)',
  XEM: 'RGB(0, 196, 179)',
  BAT: 'RGB(255, 80, 0)',
  XTZ: 'RGB(44, 125, 247)',
  QTUM: 'RGB(44, 125, 247)',
};

export interface JSonType {
  status: number;
  data: {
    asks: Asks[];
    symbol: string;
  };
}
export interface Asks {
  price: string;
  size: string;
}
