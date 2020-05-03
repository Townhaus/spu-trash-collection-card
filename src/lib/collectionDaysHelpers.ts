import { CollectionDay, CollectionType } from '../types/';

export const getStartTime = (startTime = Date.now()): number => {
  const startTimeArray = startTime.toString().split('');
  startTimeArray.pop();
  startTimeArray.pop();
  startTimeArray.pop();
  const startTimeInt = parseInt(startTimeArray.join(''));
  return startTimeInt;
};

export const getNexCollectiontDay = (collectionData: CollectionDay[], collectionType: CollectionType): string => {
  for (let i = 0; i < collectionData.length; i++) {
    if (collectionData[i][collectionType]) {
      return collectionData[i]['start'];
    }
  }
  return '';
};

export const getDaysUntilDate = (date: string, startTime = new Date()): number => {
  const dateTime = new Date(date).getTime();
  const startTimeTime = new Date(startTime).getTime();
  const timeDiff = Math.floor(Math.abs(startTimeTime - dateTime) / (1000 * 60 * 60 * 24));
  return timeDiff;
};

export const fetchCollectionDays = (address: string): Promise<CollectionDay[]> => {
  const url = `http://localhost:3001/getCollectionDays?address=${address}`;
  return fetch(url)
    .then((response) => response.json())
    .then((collectionDays) => {
      return collectionDays;
    })
    .catch((e) => {
      console.log(e);
    });
};
