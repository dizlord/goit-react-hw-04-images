import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const KEY = '30056344-f5b1c1bc910d7c008a7198f8f';

export const fetchImages = async (query, page) => {
  const { data } = await axios.get(
    `/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
};
