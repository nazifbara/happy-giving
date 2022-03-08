import { useState, useContext } from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';

import {
  fetchProjects,
  fetchThemes,
  fetchSpecificProject,
  fetchGallery,
} from './client';
import { CartContext } from './contexts';
import { CRITERIA } from './constants';

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const useGallery = (projectId) =>
  useQuery(`project-${projectId}-gallery`, () => fetchGallery(projectId));

export const useProject = (projectId) =>
  useQuery(`project-${projectId}`, () => fetchSpecificProject(projectId));

export const useThemes = () => useQuery('themes', fetchThemes);

export const useProjects = () => {
  const [searchOption, setSearchOption] = useState({
    criterion: CRITERIA.allProjects,
  });

  const { data, ...others } = useInfiniteQuery(
    ['projects', searchOption],
    ({ pageParam }) => fetchProjects(pageParam, searchOption),
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.nextProjectId;
      },
    }
  );

  let result = [];

  if (data) {
    for (let page of data.pages ?? []) {
      result.push(...page.projects);
    }
  }

  return {
    data: result,
    setSearchOption,
    searchOption,
    isFound: result.length > 0,
    ...others,
  };
};
