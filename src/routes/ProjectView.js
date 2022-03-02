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
} from '@mui/material';

import { useProject } from '../hooks';

function ProjectView() {
  const { projectId } = useParams();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (e, newValue) => setTabValue(newValue);

  const { data: project, isSuccess, isLoading } = useProject(projectId);
  console.log({ project });

  return (
    <Container maxWidth="md">
      {isLoading && <CircularProgress />}

      {isSuccess && (
        <Stack spacing={3}>
          <Typography
            color="primary"
            variant="h3"
            component="h1"
            textAlign="center"
          >
            {project.title}
          </Typography>

          <img src={project.image.imagelink[4].url} alt="" />

          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Story" />
            <Tab label="Photos" />
          </Tabs>

          <Paper sx={{ px: 3, py: 4 }}>
            <TabPanel value={tabValue} index={0}>
              Project Story
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              Project Photos
            </TabPanel>
          </Paper>
        </Stack>
      )}
    </Container>
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
