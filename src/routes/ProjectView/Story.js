import { Stack, Typography } from '@mui/material';

function Story({ project }) {
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

export default Story;
