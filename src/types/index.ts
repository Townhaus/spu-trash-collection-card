export type CollectionDay = {
  FoodAndYardWaste: boolean;
  Garbage: boolean;
  Recycling: boolean;
  allDay: boolean;
  delimitedData: null;
  end: null;
  id: number;
  start: string;
  status: string | null;
  title: string;
  url: null;
};

export type CollectionType = 'compost' | 'garbage' | 'recycling';
