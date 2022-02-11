import axios from 'axios';

import { CRITERIA } from './constants';

const API_KEY = process.env.REACT_APP_GG_API_KEY;
const BASE_URL = 'https://api.globalgiving.org/api/public/projectservice';
const HEADERS = {
  accept: 'application/json',
  'content-type': 'application/json',
};

async function fetchProjects(
  nextId,
  option = { criterion: CRITERIA.allProjects }
) {
  let url = '';

  if (option.criterion === CRITERIA.allProjects) {
    url = `${BASE_URL}/all/projects/active?api_key=${API_KEY}`;
  } else {
    url = `${BASE_URL}/${option.criterion}/${option.term}/projects/active?api_key=${API_KEY}`;
  }

  console.log(nextId);

  url = nextId ? `${url}&nextProjectId=${nextId}` : url;

  const {
    data: { projects },
  } = await axios.get(url, { headers: HEADERS });
  return {
    fetchMore: projects.hasNext
      ? () => fetchProjects(projects.nextProjectId, option)
      : null,
    ...projects,
  };
}

async function fetchThemes() {
  let url = `${BASE_URL}/themes?api_key=${API_KEY}`;
  const result = await axios.get(url, { headers: HEADERS });
  return result.data.themes;
}

export { fetchProjects, fetchThemes };
