import {
  CardActionArea,
  Card,
  Link,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';

const ProjectCard = ({ project }) => (
  <CardActionArea sx={{ height: '100%' }}>
    <Card sx={{ bgcolor: 'background.default', height: '100%' }}>
      <Link
        underline="none"
        href={project.projectLink}
        target="_blank"
        rel="noreferrer"
      >
        <CardMedia
          component="img"
          height="140"
          image={project.image.imagelink[4].url}
          alt={project.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {project.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {project.summary.substring(0, 250)}...
          </Typography>
        </CardContent>
      </Link>
    </Card>
  </CardActionArea>
);

export default ProjectCard;
