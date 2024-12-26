export interface Countries {
  id: number;
  name: string;
  next: boolean;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Restaurant {
  id: number;
  name: string;
  thoughts: string;
  url: string;
  countries: Countries;
  created_at: string;
  updated_at: string;
}

export interface AllCountriesIndexResponse {
  countries: Array<Countries>;
}

export interface CountryResponse {
  country: Countries;
}

export interface NextCountryResponse {
  nextCountry: Array<Countries>;
}

export interface RestaurantResponse {
  restaurant: Restaurant;
}

export interface AllRestaurantsIndexResponse {
  contents: Array<Restaurant>;
}

export interface RestaurantDetailResponse {
  restaurant: Restaurant;
}
