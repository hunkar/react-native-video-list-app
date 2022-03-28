import axios from 'axios';
import {API_URL} from '@env';

export type Genre = {
  id: number;
  name: string;
};

export type Video = {
  id: number;
  artist: string;
  title: string;
  release_year: number;
  genre_id: number;
  image_url: string;
};

export type ListResponse = {
  genres: Genre[];
  videos: Video[];
};

export const getList = () => {
  return new Promise<ListResponse | null>((resolve, reject) => {
    axios
      .get<ListResponse>(`${API_URL}/XiteTV/frontend-coding-exercise/main/data/dataset.json`, {
        timeout: 5000,
      })
      .then(response => {
        if (
          response &&
          response.data &&
          response.data.genres &&
          response.data.videos
        ) {
          resolve(response.data);
        } else {
          resolve(null);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};
