import { useEffect, useState } from 'react';
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
  CircularProgress,
} from '@mui/material';

import useAsync from '../use-async';
import { fetchThemes } from '../client';
import countryCodes from '../country-codes';

const CRITERIA = {
  allProjects: 'all projects',
  theme: 'themes',
  countryServed: 'countries',
};

function SearchForm({ onSearch, isLoading }) {
  const { status, data, run } = useAsync();
  const [criterion, setCriterion] = useState(CRITERIA.allProjects);
  const [searchTerm, setSearchTerm] = useState('');

  const isPending = status === 'pending';

  useEffect(() => {
    if (criterion === CRITERIA.theme) {
      run(fetchThemes());
    } else if (criterion === CRITERIA.allProjects) {
      onSearch();
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
      <FormControl margin="normal" fullWidth>
        <InputLabel id="criterion-label">Choose a search criterion</InputLabel>
        <Select
          labelId="criterion-label"
          label="Choose a search criterion"
          id="criterion"
          value={criterion}
          onChange={onCriterionChange}
        >
          <MenuItem value={CRITERIA.allProjects}>All projects</MenuItem>
          <MenuItem value={CRITERIA.theme}>Theme</MenuItem>
          <MenuItem value={CRITERIA.countryServed}>Country served</MenuItem>
        </Select>
        {isPending && <CircularProgress />}
        {criterion === CRITERIA.theme && status === 'resolved' && (
          <FormControl margin="normal">
            <InputLabel id="theme-label">Choose a theme</InputLabel>
            <Select
              labelId="theme-label"
              label="Choose a theme"
              id="theme"
              value={searchTerm}
              onChange={onSearchTermChange}
            >
              {data.theme.map((t) => (
                <MenuItem key={t.id} value={t.id}>
                  {t.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {criterion === CRITERIA.countryServed && (
          <FormControl margin="normal">
            <InputLabel id="country-label">Choose a country</InputLabel>
            <Select
              labelId="country-label"
              label="Choose a country"
              id="country"
              value={searchTerm}
              onChange={onSearchTermChange}
            >
              {Object.entries(countryCodes).map((c) => (
                <MenuItem key={c[0]} value={c[0]}>
                  {c[1]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </FormControl>
      <FormControl fullWidth>
        <Button
          variant="contained"
          disabled={
            (criterion !== CRITERIA.allProjects && searchTerm === '') ||
            isLoading
          }
          onClick={(e) => {
            e.preventDefault();
            onSearch({ criterion, term: searchTerm });
          }}
        >
          {isLoading ? <CircularProgress /> : 'Search'}
        </Button>
      </FormControl>
    </form>
  );
}

export default SearchForm;
