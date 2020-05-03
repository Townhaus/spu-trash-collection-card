import { CollectionType } from '../types/';

export const API = {
  URL: 'http://www.seattle.gov/UTIL/WARP/CollectionCalendar',
  GET_ADDRESS: 'GetCCAddress',
  GET_COLLECTION_DAYS: 'GetCollectionDays',
};

type CollectionTypes = {
  [key: string]: CollectionType;
};
export const COLLECTION_TYPES: CollectionTypes = {
  COMPOST: 'FoodAndYardWaste',
  GARBAGE: 'Garbage',
  RECYCLING: 'Recycling',
};
