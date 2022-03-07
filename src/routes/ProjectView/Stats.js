import { Typography, LinearProgress, Stack } from '@mui/material';

import { dollarFormat } from '../../utils';

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

export default Stats;
