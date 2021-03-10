import axios from 'axios';

import API_KEY from './apiKey';

const BASE_URL = 'https://api.globalgiving.org/api/public/projectservice';
const HEADERS = {
  accept: 'application/json',
  'content-type': 'application/json',
};

async function fetchAllProjects(nextId) {
  let url = `${BASE_URL}/all/projects/active?api_key=${API_KEY}`;
  url = nextId ? `${url}&nextProject=${nextId}` : url;
  const result = await axios.get(url, { headers: HEADERS });
  return result.data.projects;
}

async function fetchThemes() {
  let url = `${BASE_URL}/themes?api_key=${API_KEY}`;
  const result = await axios.get(url, { headers: HEADERS });
  return result.data.themes;
}

async function searchProjects(option) {
  if (option.criterion === 'all projects') {
    return fetchAllProjects();
  } else {
    return fetchProjectsByCriterion(option);
  }
}

async function fetchProjectsByCriterion({ criterion, term }) {
  let url = `${BASE_URL}/${criterion}/${term}/projects/active?api_key=${API_KEY}`;
  const result = await axios.get(url, { headers: HEADERS });
  return result.data.projects;
}

export { fetchAllProjects, fetchThemes, searchProjects };
