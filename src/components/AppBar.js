import {
  Box,
  AppBar,
  Container,
  Toolbar,
  Typography,
  Link,
} from '@mui/material';

const AppBarWrapper = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" sx={{ bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography variant="h4" component="div">
            <Link color="text.primary" underline="none" href="/">
              HappyGiving
            </Link>
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  </Box>
);
export default AppBarWrapper;
