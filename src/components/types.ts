export interface IService {
  [service: string]: {
    description: string;
    image: string;
  };
}

export interface IPrice {
  [carModel: string]: {
    [service: string]: number;
  };
}

export interface IData {
  services: IService;
  prices: IPrice;
}

export interface IOrder {
  orderCount: number;
  service: string;
  price: number;
}

export interface IInputProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export interface IInputs {
  cash: number | string;
  card: number | string;
  phoneNumber: string;
  carNumber: string;
  comment: string;
  total: number;
}

export interface IStoredData {
  carModel: string;
  basket: IOrder[];
  inputs: IInputs;
}

export interface INumericInput {
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    separator?: string,
  ) => void;
  value: string | number;
  icon: React.ReactNode;
  separator?: string;
  total: number;
  label: string;
  name: string;
}
