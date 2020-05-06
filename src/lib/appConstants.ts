import { CollectionType } from '../types/';

type CollectionTypes = {
  [key: string]: CollectionType;
};
export const COLLECTION_TYPES: CollectionTypes = {
  COMPOST: 'compost',
  GARBAGE: 'garbage',
  RECYCLING: 'recycling',
};

export const ICONS = {
  COMPOST: 'leaf',
  GARBAGE: 'delete',
  RECYCLING: 'recycle',
};
