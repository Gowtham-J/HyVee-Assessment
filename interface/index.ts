export interface UserData {
  name: string;
  age: number | string;
  gender: string;
  country: string;
}

export interface CountryResponse {
  count: number;
  name: string;
  country: {
    country_id: string;
    probability: number;
  }[];
}

export interface AgeResponse {
  count: number;
  name: string;
  age: number;
}

export interface GenderResponse {
  count: number;
  name: string;
  gender: string;
  probability: number;
}
