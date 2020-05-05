import moment from 'moment';

export const formatDate = (date: string): any => {
  const newDate = moment(date, 'YYYYMMDD').format('MMM Do YYYY');
  return newDate;
};

export const getDaysUntilDate = (date: string, startTime = new Date()): number => {
  const newDate = moment(date, 'YYYYMMDD');
  const currentDate = moment(startTime);
  const timeDiff = Math.ceil(newDate.diff(currentDate) / (1000 * 60 * 60 * 24));

  return timeDiff;
};
