import { useCallback } from 'react';

import {
  Typography,
  Container,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';

import HeroJPG from '../assets/hero.jpg';
import { SearchForm, Cover, ProjectsGrid } from '../components';
import { useProjects } from '../hooks';

function HomeView() {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    isFound,
    isSuccess,
    isError,
    setSearchOption,
  } = useProjects();

  const onSearch = useCallback(setSearchOption, [setSearchOption]);

  return (
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
            <Typography variant="body1" color="text.secondary" component="p">
              Charity is the most generous thing we can do in our lives. A
              helping hand to those in need will always bless you. Don’t shy
              away from giving, price doesn’t matter. What matters is how big is
              your heart.
            </Typography>
          </Container>
        </Container>
      </section>
      <Container disableGutters maxWidth="sm" sx={{ my: '50px' }}>
        <SearchForm isLoading={isFetching} onSearch={onSearch} />
      </Container>

      <section>
        <Container disableGutters maxWidth="md">
          {!isFound && !isFetching && (
            <Alert variant="filled" severity="warning">
              No projects found
            </Alert>
          )}
          {isError && (
            <Alert variant="filled" severity="error">
              Something went wrong...
            </Alert>
          )}
        </Container>
        {(isSuccess || isFetchingNextPage) && isFound && (
          <ProjectsGrid projects={data} />
        )}

        {hasNextPage && (
          <Container sx={{ mb: '50px' }} maxWidth="xs">
            <Button
              fullWidth
              disabled={isFetchingNextPage}
              variant="contained"
              size="large"
              onClick={fetchNextPage}
            >
              {isFetchingNextPage ? <CircularProgress /> : 'More projects'}
            </Button>
          </Container>
        )}
      </section>
    </Container>
  );
}

const route = {
  name: 'HomeView',
  props: {
    path: '/',
    element: <HomeView />,
  },
};

export default route;
