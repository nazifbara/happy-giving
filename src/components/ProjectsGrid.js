import { Grid } from '@mui/material';

import { ProjectCard } from '.';

const ProjectsGrid = ({ projects }) => {
  return (
    <Grid
      sx={{ mb: '50px' }}
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 1, sm: 8, md: 12 }}
    >
      {projects.map((p) => (
        <Grid item xs={1} sm={4} key={`project-${p.id}`}>
          <ProjectCard project={p} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProjectsGrid;
