export interface IdataPrice {
  price: number;
  modelAuto: string;
}

export interface IService {
  id: number;
  service: string;
  description: string;
  dataPrice: IdataPrice[];
  foto: string;
}

export interface IModel {
  id: number;
  service: string;
  description: string;
  modelAuto: string;
  price: number;
  foto: string;
}
