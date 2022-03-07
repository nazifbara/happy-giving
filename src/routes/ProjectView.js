import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  CircularProgress,
  Container,
  Stack,
  Typography,
  Tabs,
  Tab,
  Box,
  FormGroup,
  LinearProgress,
  TextField,
  Button,
  Grid,
} from '@mui/material';

import { useProject, useGallery } from '../hooks';
import { dollarFormat } from '../utils';

function ProjectView() {
  const { projectId } = useParams();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (e, newValue) => setTabValue(newValue);

  const { data: project, isSuccess, isLoading } = useProject(projectId);

  return (
    <>
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
                <ProjectStory project={project} />
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <ProjectGallery projectId={project.id} />
              </TabPanel>
            </Stack>
          </Container>
        </>
      )}
    </>
  );
}

function Stats({ project }) {
  const { funding, goal, numberOfDonations } = project;
  const completion = (funding / goal) * 100;
  const remaining = goal - funding;

  return (
    <>
      <Typography mb={1} variant="body1">
        <Typography
          fontWeight="bold"
          variant="h4"
          color="secondary"
          component="span"
        >
          {dollarFormat(funding)}
        </Typography>{' '}
        raised out of {dollarFormat(goal)}
      </Typography>

      <LinearProgress
        variant="determinate"
        color="secondary"
        value={completion}
        sx={{ height: 12 }}
      />
      <Stack justifyContent="space-between" direction="row">
        <Typography variant="body1">
          <Typography fontWeight="bold" variant="body1" component="span">
            {numberOfDonations}
          </Typography>{' '}
          donations
        </Typography>

        <Typography variant="body1">
          <Typography fontWeight="bold" variant="body1" component="span">
            {dollarFormat(remaining)}
          </Typography>{' '}
          to go
        </Typography>
      </Stack>
    </>
  );
}

function ProjectGallery({ projectId }) {
  const { data: images, isLoading, isSuccess } = useGallery(projectId);

  return (
    <>
      {isLoading && <CircularProgress />}
      {isSuccess && (
        <Grid
          container
          alignItems="center"
          spacing={2}
          columns={{ xs: 2, sm: 4, lg: 12 }}
        >
          {images.map((img) => (
            <Grid item xs={2} sm={2} lg={4} key={img.id}>
              <img src={`${img.imagelink[3].url}`} alt="" />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

function ProjectStory({ project }) {
  return (
    <Stack alignItems="center" spacing={2}>
      <Stack spacing={0.5}>
        <Typography variant="h5" fontWeight="bold" component="h3">
          Summary
        </Typography>
        <Typography variant="body1">{project.summary}</Typography>
      </Stack>
      <Stack spacing={0.5}>
        <Typography variant="h5" fontWeight="bold" component="h3">
          Challenge
        </Typography>
        <Typography variant="body1">{project.need}</Typography>
      </Stack>
      <Stack spacing={0.5}>
        <Typography variant="h5" fontWeight="bold" component="h3">
          Solution
        </Typography>
        <Typography variant="body1">{project.activities}</Typography>
      </Stack>
      <Stack spacing={0.5}>
        <Typography variant="h5" fontWeight="bold" component="h3">
          Long-Term Impact
        </Typography>
        <Typography variant="body1">{project.longTermImpact}</Typography>
      </Stack>
    </Stack>
  );
}

function TabPanel({ value, index, children }) {
  if (value !== index) {
    return null;
  }
  return <Box>{children}</Box>;
}

const route = {
  name: 'ProjectView',
  props: {
    path: '/project/:projectId',
    element: <ProjectView />,
  },
};

export default route;
