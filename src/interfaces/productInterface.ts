interface IDescription {
  title: string;
  text: string;
}

interface IDiscount {
  status: boolean;
  howMuch: number;
}

export interface IProduct {
  name: string;
  description: IDescription[];
  strongPoints: string[];
  price: number;
  discount: IDiscount;
  category: string;
  image: string;
}
