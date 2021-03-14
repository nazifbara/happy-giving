import spinner from './images/oval.svg';

import { useEffect, useState } from 'react';

import useAsync from './use-async';
import { fetchThemes } from './api';
import countryCodes from './country-codes';
import Button from './Button';

const CRITERIA = {
  allProjects: 'all projects',
  theme: 'themes',
  countryServed: 'countries',
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
        <option value={CRITERIA.allProjects}>All projects</option>
        <option value={CRITERIA.theme}>Theme</option>
        <option value={CRITERIA.countryServed}>Country served</option>
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
      {criterion === CRITERIA.countryServed && (
        <>
          <label htmlFor="theme">Choose a country</label>
          <select value={searchTerm} onChange={onSearchTermChange}>
            <option value={''}>----------</option>
            {Object.entries(countryCodes).map((c) => (
              <option key={c[0]} value={c[0]}>
                {c[1]}
              </option>
            ))}
          </select>
        </>
      )}
      <Button
        disabled={criterion !== CRITERIA.allProjects && searchTerm === ''}
        onClick={(e) => {
          e.preventDefault();
          onSearch({ criterion, term: searchTerm });
        }}
        isLoading={isLoading}
      >
        Search
      </Button>
    </form>
  );
}

export default SearchForm;
