
export type ViewState = 'home' | 'spaces' | 'contact' | 'detail';

export interface FilterCriteria {
  city: string;
  type: string;
  capacity: number;
}
