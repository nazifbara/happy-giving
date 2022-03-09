import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  InputAdornment,
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
  IconButton,
} from '@mui/material';

import Stats from './Stats';
import Gallery from './Gallery';
import Story from './Story';
import { TabPanel, Link } from '../../components';
import { useProject, useCart } from '../../hooks';

function ProjectView() {
  const { projectId } = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [amount, setAmount] = useState('10');

  const {
    data: project,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useProject(projectId);
  const { addItem } = useCart();
  const navigate = useNavigate();

  const isNotFound = error?.message.includes('code 404');

  const handleTabChange = (e, newValue) => setTabValue(newValue);
  const handleAmoutChange = (e) => {
    const regex = new RegExp(/^\d+$/);
    const value = e.target.value;

    if (!regex.test(value) && value !== '') {
      return;
    }

    setAmount(value);
  };
  const donate = (e) => {
    e.preventDefault();
    if (amount === '' || amount === '0') {
      return;
    }
    addItem(project, amount);
    navigate('/checkout');
  };

  return (
    <>
      {isNotFound && (
        <Alert severity="warning">
          <AlertTitle>Project Not Found</AlertTitle>
          <Link to="/">Return to the home page</Link>
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
                <form onSubmit={donate}>
                  <FormGroup>
                    <TextField
                      type="text"
                      value={amount}
                      onChange={handleAmoutChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton size="small">$</IconButton>
                          </InputAdornment>
                        ),
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                      }}
                      size="small"
                      margin="normal"
                    />
                    <Button type="submit" variant="contained">
                      Donate
                    </Button>
                  </FormGroup>
                </form>
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
