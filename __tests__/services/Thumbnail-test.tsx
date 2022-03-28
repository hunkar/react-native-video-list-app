import {getList, ListResponse} from '../../src/api/Thumbnail';
import axios from 'axios';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('Error fn should be called with error', async () => {
  mockedAxios.get.mockReturnValueOnce(
    new Promise<{
      data: ListResponse;
    }>((res, rej) => {
      rej('error');
    }),
  );

  let result = 'success';

  try {
    await getList();
  } catch (error) {
    result = 'failed';
  }

  expect(result).toEqual('failed');
});

test('Succes fn should be called with mock data', async () => {
  const mockResult: ListResponse = {
    genres: [
      {
        id: 1,
        name: 'pop',
      },
    ],
    videos: [
      {
        artist: 'artist',
        genre_id: 1,
        id: 1,
        image_url: 'image_url',
        release_year: 2022,
        title: 'title',
      },
    ],
  };

  mockedAxios.get.mockReturnValueOnce(
    new Promise<{
      data: ListResponse;
    }>((res, rej) => {
      res({
        data: mockResult,
      });
    }),
  );

  const result = await getList();

  expect(result).toEqual(mockResult);
});

test('Succes fn should be called with null', async () => {
  const mockResult: ListResponse = {
    genres: [
      {
        id: 1,
        name: 'pop',
      },
    ],
    videos: [
      {
        artist: 'artist',
        genre_id: 1,
        id: 1,
        image_url: 'image_url',
        release_year: 2022,
        title: 'title',
      },
    ],
  };

  mockedAxios.get.mockReturnValueOnce(
    new Promise<{
      data?: ListResponse;
    }>((res, rej) => {
      res({});
    }),
  );

  const result = await getList();

  expect(result).toEqual(null);
});
