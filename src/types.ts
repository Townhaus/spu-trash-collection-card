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
