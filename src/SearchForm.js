import spinner from './images/oval.svg';

import { useEffect, useState } from 'react';

import useAsync from './use-async';
import { fetchThemes } from './api';

const CRITERIA = {
  allProjects: 'all projects',
  theme: 'theme',
};

function SearchForm({ onSearch, isLoading }) {
  const { status, data, run } = useAsync();
  const [criterion, setCriterion] = useState(CRITERIA.allProjects);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (criterion === CRITERIA.theme) {
      run(fetchThemes());
    } else if (criterion === CRITERIA.allProjects) {
      onSearch({ criterion });
    }
  }, [run, criterion, onSearch]);

  function onCriterionChange(e) {
    setCriterion(e.target.value);
  }

  function onSearchTermChange(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <form>
      <label htmlFor="criterion">Choose a search criterion</label>
      <select value={criterion} onChange={onCriterionChange}>
        <option value="all projects">All projects</option>
        <option value="theme">Theme</option>
        <option value="home country">Organization home country</option>
        <option value="country served">Country served</option>
      </select>
      {status === 'pending' && <img className="spinner" alt="" src={spinner} />}
      {criterion === CRITERIA.theme && status === 'resolved' && (
        <>
          <label htmlFor="theme">Choose a theme</label>
          <select value={searchTerm} onChange={onSearchTermChange}>
            <option value={''}>----------</option>
            {data.theme.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </>
      )}
      <button
        disabled={criterion !== CRITERIA.allProjects && searchTerm === ''}
        onClick={(e) => {
          e.preventDefault();
          onSearch({ criterion, term: searchTerm });
        }}
        className="button"
      >
        {isLoading ? (
          <img className="spinner" alt="" src={spinner} />
        ) : (
          'Search'
        )}
      </button>
    </form>
  );
}

export default SearchForm;
