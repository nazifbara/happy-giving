import { useParams } from 'react-router-dom';
import { CircularProgress, Container, Stack, Typography } from '@mui/material';

import { useProject } from '../hooks';

function ProjectView() {
  const { projectId } = useParams();
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
        </Stack>
      )}
    </Container>
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
