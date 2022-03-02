import axios from 'axios';

import { CRITERIA } from './constants';

const API_KEY = process.env.REACT_APP_GG_API_KEY;
const BASE_URL = 'https://api.globalgiving.org/api/public/projectservice';
const HEADERS = {
  accept: 'application/json',
  'content-type': 'application/json',
};

export async function fetchGallery(projectId) {
  const { data } = await axios.get(
    `${BASE_URL}/projects/${projectId}/imagegallery?api_key=${API_KEY}`,
    {
      headers: HEADERS,
    }
  );
  return data?.images?.image.slice(1);
}

export async function fetchSpecificProject(projectId) {
  const { data } = await axios.get(
    `${BASE_URL}/projects/${projectId}?api_key=${API_KEY}`,
    {
      headers: HEADERS,
    }
  );
  return data?.project;
}

export async function fetchProjects(
  nextId,
  option = { criterion: CRITERIA.allProjects }
) {
  let url = '';

  if (option.criterion === CRITERIA.allProjects) {
    url = `${BASE_URL}/all/projects/active?api_key=${API_KEY}`;
  } else {
    url = `${BASE_URL}/${option.criterion}/${option.term}/projects/active?api_key=${API_KEY}`;
  }

  url = nextId ? `${url}&nextProjectId=${nextId}` : url;

  const {
    data: { projects },
  } = await axios.get(url, { headers: HEADERS });

  if (projects.numberFound === 0) {
    return {
      nextProjectId: null,
      projects: [],
    };
  }

  const { nextProjectId, project } = projects;

  return {
    nextProjectId: nextProjectId,
    projects: project,
  };
}

export async function fetchThemes() {
  let url = `${BASE_URL}/themes?api_key=${API_KEY}`;
  const result = await axios.get(url, { headers: HEADERS });
  return result.data.themes;
}
