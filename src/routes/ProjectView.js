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
  Paper,
  LinearProgress,
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
    <Container disableGutters maxWidth="md">
      {isLoading && <CircularProgress />}

      {isSuccess && (
        <Stack alignItems="center" spacing={3}>
          <Typography
            color="primary"
            variant="h4"
            component="h1"
            textAlign="center"
          >
            {project.title}
          </Typography>

          <img src={project.image.imagelink[4].url} alt="" />

          <Stats project={project} />

          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Story" />
            <Tab label="Photos" />
          </Tabs>

          <Paper
            elevation={3}
            sx={{
              width: '100%',
              p: { xs: 2, sm: 3 },
              py: { xs: 3, sm: 4 },
            }}
          >
            <TabPanel value={tabValue} index={0}>
              <ProjectStory project={project} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <ProjectGallery projectId={project.id} />
            </TabPanel>
          </Paper>
        </Stack>
      )}
    </Container>
  );
}

function Stats({ project }) {
  const { funding, goal, numberOfDonations } = project;
  const completion = (funding / goal) * 100;
  const remaining = goal - funding;

  return (
    <Box sx={{ width: '100%', maxWidth: 600 }}>
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
    </Box>
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
        <Typography variant="h5" component="h3">
          Summary
        </Typography>
        <Typography variant="body1">{project.summary}</Typography>
      </Stack>
      <Stack spacing={0.5}>
        <Typography variant="h5" component="h3">
          Challenge
        </Typography>
        <Typography variant="body1">{project.need}</Typography>
      </Stack>
      <Stack spacing={0.5}>
        <Typography variant="h5" component="h3">
          Solution
        </Typography>
        <Typography variant="body1">{project.activities}</Typography>
      </Stack>
      <Stack spacing={0.5}>
        <Typography variant="h5" component="h3">
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
