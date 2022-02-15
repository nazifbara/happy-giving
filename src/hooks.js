import { useState } from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';

import { fetchProjects, fetchThemes } from './client';
import { CRITERIA } from './constants';

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
