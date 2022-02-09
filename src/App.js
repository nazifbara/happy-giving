import { useEffect, useCallback, useReducer } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Link,
  Container,
  Button,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Grid,
  Alert,
} from '@mui/material';
import styled from '@emotion/styled';

import HeroJPG from './assets/hero.jpg';
import SearchForm from './components/SearchForm';
import { fetchAllProjects, searchProjects } from './api';

const HeroImg = styled.img`
  margin-top: 20px;
  border-radius: 10px;
  width: 100%;
`;

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
    fetchAllProjects().then(
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
    searchProjects(option).then(
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
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: 'background.default' }}>
          <Container maxWidth="lg">
            <Toolbar disableGutters>
              <Typography variant="h4" component="div">
                <Link color="text.primary" underline="none" href="/">
                  HappyGiving
                </Link>
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      <main>
        <Container maxWidth="lg">
          <section>
            <Container disableGutters maxWidth="lg">
              <HeroImg src={HeroJPG} alt="" />
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
            <Grid
              sx={{ mb: '50px' }}
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 1, sm: 8, md: 12 }}
            >
              {(isResolved || isFetchingMore) &&
                isFound &&
                data.project.map((p) => (
                  <Grid item xs={1} sm={4} key={`project-${p.id}`}>
                    <CardActionArea sx={{ height: '100%' }}>
                      <Card
                        sx={{ bgcolor: 'background.default', height: '100%' }}
                      >
                        <Link
                          underline="none"
                          href={p.projectLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <CardMedia
                            component="img"
                            height="140"
                            image={p.image.imagelink[4].url}
                            alt={p.title}
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              {p.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {p.summary.substring(0, 250)}...
                            </Typography>
                          </CardContent>
                        </Link>
                      </Card>
                    </CardActionArea>
                  </Grid>
                ))}
            </Grid>
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
