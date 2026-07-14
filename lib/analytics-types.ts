export type Visit = {
  t: number;
  path: string;
  ref: string;
  country: string;
  device: string;
  ipHash: string;
};

export type Download = {
  t: number;
  lang: string;
  ipHash: string;
};

export type Analytics = {
  visits: Visit[];
  downloads: Download[];
};

export type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  t: number;
  read: boolean;
};
