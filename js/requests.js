import { baseUrl, apiKey } from './constants.js';

export const fetchData = async (searchTerm) => {
  try {
    const response = await axios.get(`${baseUrl}`, {
      params: {
        apikey: apiKey,
        s: searchTerm,
      },
    });
    if (!response.data.Response) {
      return [];
    }
    return response.data.Search;
  } catch (error) {
    console.log(error);
  }
};
