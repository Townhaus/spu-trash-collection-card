import { CollectionType } from '../types/';

type CollectionTypes = {
  [key: string]: CollectionType;
};
export const COLLECTION_TYPES: CollectionTypes = {
  COMPOST: 'FoodAndYardWaste',
  GARBAGE: 'Garbage',
  RECYCLING: 'Recycling',
};
