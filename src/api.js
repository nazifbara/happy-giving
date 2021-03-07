import axios from 'axios';

import API_KEY from './apiKey';

const BASE_URL = 'https://api.globalgiving.org';
const HEADERS = {
  accept: 'application/json',
  'content-type': 'application/json',
};

async function fetchAllProjects(nextId) {
  let url = `${BASE_URL}/api/public/projectservice/all/projects/active?api_key=${API_KEY}`;
  url = nextId ? `${url}&nextProject=${nextId}` : url;
  const result = await axios.get(url, { headers: HEADERS });
  return result.data;
}

export { fetchAllProjects };
