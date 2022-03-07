import { useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import {
  Alert,
  AlertTitle,
  CircularProgress,
  Container,
  Stack,
  Typography,
  Tabs,
  Tab,
  Box,
  FormGroup,
  TextField,
  Button,
  Link,
} from '@mui/material';

import Stats from './Stats';
import Gallery from './Gallery';
import Story from './Story';
import { TabPanel } from '../../components';
import { useProject } from '../../hooks';

function ProjectView() {
  const { projectId } = useParams();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (e, newValue) => setTabValue(newValue);

  const {
    data: project,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useProject(projectId);

  const isNotFound = error?.message.includes('code 404');

  return (
    <>
      {isNotFound && (
        <Alert severity="warning">
          <AlertTitle>Project Not Found</AlertTitle>
          <Link component={RouterLink} to="/">
            Return to the home page
          </Link>
        </Alert>
      )}

      {isError && !isNotFound && (
        <Alert severity="error">
          <AlertTitle>Unable to fetch the project</AlertTitle>
          Please refresh the page and try again
        </Alert>
      )}

      {isLoading && <CircularProgress />}

      {isSuccess && (
        <>
          <Typography variant="h4" component="h1" textAlign="center" mb={8}>
            {project.title}
          </Typography>

          <Container sx={{ mb: 5 }} disableGutters maxWidth="lg">
            <Stack
              spacing={{ xs: 3, md: 5 }}
              direction={{ xs: 'column-reverse', md: 'row' }}
              alignItems="center"
            >
              <Box sx={{ width: { xs: '100%', maxWidth: 600, md: '40%' } }}>
                <Stats project={project} />
                <FormGroup>
                  <TextField size="small" margin="normal" />
                  <Button variant="contained">Donate</Button>
                </FormGroup>
              </Box>
              <Box
                sx={{
                  boxShadow: {
                    xs: 'none',
                    md: '30px 30px #b75d69',
                  },
                  width: { xs: '100%', md: '60%' },
                }}
                src={project.image.imagelink[4].url}
                alt=""
                component="img"
              />
            </Stack>
          </Container>

          <Container disableGutters maxWidth="md">
            <Stack alignItems="center" spacing={3}>
              <Tabs value={tabValue} onChange={handleTabChange} centered>
                <Tab label="Story" />
                <Tab label="Photos" />
              </Tabs>

              <TabPanel value={tabValue} index={0}>
                <Story project={project} />
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <Gallery projectId={project.id} />
              </TabPanel>
            </Stack>
          </Container>
        </>
      )}
    </>
  );
}

const route = {
  name: 'ProjectView',
  props: {
    path: '/project/:projectId',
    element: <ProjectView />,
  },
};

export default route;
