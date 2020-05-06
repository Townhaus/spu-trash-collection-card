import { ActionConfig } from 'custom-card-helpers';

export interface SpuTrashCollectionCardConfig {
  collection_days: CollectionDays;
  type: string;
  name?: string;
  show_warning?: boolean;
  show_error?: boolean;
  test_gui?: boolean;
  entity?: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

export interface CollectionDays {
  compost: string;
  garbage: string;
  recycling: string;
}

export interface CollectionDaysInfo {
  collectionType: string;
  haEntityName: string;
  icon?: string;
  nextCollectionDate: string; // ISO YYYMMDD
  nextCollectionDateString: string; // Month Dth YYYY
  daysUntilCollectionDay: number;
}
