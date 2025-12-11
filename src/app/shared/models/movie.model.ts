export interface IMovie {
  id: number;
  title: string;
  year: number;
  genre: string[];
  description: string;
  rating: number;
  poster: string;
  director: string;
  duration: string;
  actors: string[];
  country: string;
  language?: string;
  numericId: number;
}

export interface IPaginatedResponse<T> {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: T[];
}
