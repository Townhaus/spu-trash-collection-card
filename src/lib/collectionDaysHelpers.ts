import moment from 'moment';
import { HomeAssistant } from 'custom-card-helpers';

import { ICONS } from './appConstants';
import { CollectionDaysInfo, CollectionDays } from '../types';

export const formatDate = (date: string): any => {
  const newDate = moment(date, 'YYYYMMDD').format('MMM Do YYYY');
  return newDate;
};

export const getDaysUntilDate = (date: string, startTime = new Date()): number => {
  const newDate = moment(date, 'YYYYMMDD');
  const currentDate = moment(startTime);
  const isToday = moment(newDate).isSame(currentDate, 'day');
  if (isToday) {
    return 0;
  } else {
    return Math.ceil(newDate.diff(currentDate) / (1000 * 60 * 60 * 24));
  }
};

export const getHaEntityValueByName = (haEntityName: string, { states: haStates }: HomeAssistant): string => {
  const { state: entityValue } = haStates[haEntityName];
  return entityValue;
};

const sortCollectionDaysByType = (collectionDaysInfo: CollectionDaysInfo[]): CollectionDaysInfo[] => {
  return collectionDaysInfo.sort(({ collectionType: collectionType1 }, { collectionType: collectionType2 }) => {
    if (collectionType1 < collectionType2) return -1;
    return 1;
  });
};

export const getCollectionDaysInfo = (collectionDays: CollectionDays, haStates): CollectionDaysInfo[] => {
  const collectionDaysInfo: CollectionDaysInfo[] = [];
  for (const [collectionType, haEntityName] of Object.entries(collectionDays)) {
    const nextCollectionDate = getHaEntityValueByName(haEntityName, haStates);
    const newCollectionDayInfo = {
      collectionType,
      haEntityName,
      nextCollectionDate,
      nextCollectionDateString: formatDate(nextCollectionDate),
      daysUntilCollectionDay: getDaysUntilDate(nextCollectionDate),
      icon: ICONS[collectionType.toUpperCase()],
    };
    collectionDaysInfo.push(newCollectionDayInfo);
  }
  return sortCollectionDaysByType(collectionDaysInfo);
};
