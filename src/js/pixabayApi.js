import axios from 'axios';

const PIXABAY_API_KEY = '41564492-608cbec99b2782b0c7c759bf5';
const PIXABAY_BASE_URL = 'https://pixabay.com/api/';

const pixabayInstance = axios.create({
  baseURL: PIXABAY_BASE_URL,
});

export const fetchImages = (q, page) => {
  const searchParams = new URLSearchParams({
    key: PIXABAY_API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page,
    q,
  });

  return pixabayInstance.get(`?${searchParams}`);
}
