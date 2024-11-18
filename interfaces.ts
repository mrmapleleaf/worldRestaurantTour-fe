export interface Countries {
  id: number;
  name: string;
  next: boolean;
  restaurant: Restaurant;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Restaurant {
  id: number;
  name: string;
  thoughts: string;
  country: Countries;
  created_at: string;
  updated_at: string;
}
