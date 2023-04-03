let page = 1;
const per_page = 40;

import axios from "axios";

const API_KEY = "34963790-b238492e38b83f6eacf1dd9bd";

export async function query(searchQuery) {
  const urlOptions = "image_type=photo&orientation=horizontal&safesearch=true";
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&${urlOptions}&page=${page}&per_page=${per_page}`;
  const response = await axios.get(url);
  return response;
}
