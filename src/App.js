import { useEffect, useCallback, useReducer } from 'react';
import {
  Typography,
  Container,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';

import HeroJPG from './assets/hero.jpg';
import { SearchForm, AppBar, Cover, ProjectsGrid } from './components';
import { fetchProjects } from './client';

function appReducer(state, action) {
  switch (action.type) {
    case 'FETCH_INIT':
      return { status: 'fetching', data: null, error: null };
    case 'FETCH_MORE_INIT':
      return { ...state, status: 'fetching more', error: null };
    case 'FETCH_SUCCESS':
      return { status: 'resolved', data: action.data, error: null };
    case 'FETCH_MORE_SUCCESS':
      return {
        status: 'resolved',
        data: {
          ...action.data,
          project: [...state.data.project, ...action.data.project],
        },
      };
    case 'FETCH_FAILURE':
      return { ...state, status: 'rejected', error: action.error };
    default:
      break;
  }
}

function App() {
  const [{ status, data, error }, dispatch] = useReducer(appReducer, {
    status: 'idle',
    data: null,
    error: null,
  });

  const isResolved = status === 'resolved';
  const isFetching = status === 'fetching';
  const isFetchingMore = status === 'fetching more';
  const isError = Boolean(error);
  const isFound = data && data.numberFound > 0;

  useEffect(() => {
    dispatch({ type: 'FETCH_INIT' });
    fetchProjects().then(
      (data) => {
        dispatch({ type: 'FETCH_SUCCESS', data });
      },
      (error) => {
        dispatch({ type: 'FETCH_FAILURE', error });
      }
    );
  }, []);

  const onSearch = useCallback((option) => {
    dispatch({ type: 'FETCH_INIT' });
    fetchProjects(null, option).then(
      (data) => {
        dispatch({ type: 'FETCH_SUCCESS', data });
      },
      (error) => {
        dispatch({ type: 'FETCH_FAILURE', error });
      }
    );
  }, []);

  function fetchMore() {
    dispatch({ type: 'FETCH_MORE_INIT' });
    data.fetchMore().then(
      (data) => {
        dispatch({ type: 'FETCH_MORE_SUCCESS', data });
      },
      (error) => {
        dispatch({ type: 'FETCH_FAILURE', error });
      }
    );
  }

  return (
    <>
      <AppBar />
      <main>
        <Container maxWidth="lg">
          <section>
            <Container disableGutters maxWidth="lg">
              <Cover src={HeroJPG} alt="" />
            </Container>
            <Container maxWidth="md" sx={{ textAlign: 'center' }}>
              <Typography
                sx={{ marginTop: '10px', marginBottom: '10px' }}
                variant="h2"
                component="h1"
              >
                Find a charity
              </Typography>
              <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  component="p"
                >
                  Charity is the most generous thing we can do in our lives. A
                  helping hand to those in need will always bless you. Don’t shy
                  away from giving, price doesn’t matter. What matters is how
                  big is your heart.
                </Typography>
              </Container>
            </Container>
          </section>
          <Container disableGutters maxWidth="sm" sx={{ my: '50px' }}>
            <SearchForm isLoading={isFetching} onSearch={onSearch} />
          </Container>

          <section>
            <Container disableGutters maxWidth="md">
              {!isFound && !isFetching && !isError && (
                <Alert variant="filled" severity="warning">
                  No projects found
                </Alert>
              )}
              {isError && (
                <Alert variant="filled" severity="error">
                  {error.message === 'Network Error'
                    ? 'Please check your internet connection and refresh the page'
                    : 'Something went wrong...'}
                </Alert>
              )}
            </Container>
            {(isResolved || isFetchingMore) && isFound && (
              <ProjectsGrid projects={data.project} />
            )}

            {data && data.fetchMore && (
              <Container sx={{ mb: '50px' }} maxWidth="xs">
                <Button
                  fullWidth
                  disabled={isFetchingMore}
                  variant="contained"
                  size="large"
                  onClick={fetchMore}
                >
                  {isFetchingMore ? <CircularProgress /> : 'More projects'}
                </Button>
              </Container>
            )}
          </section>
        </Container>
      </main>
    </>
  );
}

export default App;
