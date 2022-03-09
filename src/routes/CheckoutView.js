import {
  Box,
  Container,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  TextField,
  FormGroup,
  Button,
  Divider,
  Alert,
  AlertTitle,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useCart } from '../hooks';
import { Link } from '../components';
import { dollarFormat } from '../utils';

const CheckoutView = () => {
  const { cartItems, getTotal, isEmpty, removeItem } = useCart();

  return (
    <Container maxWidth="lg" disableGutters>
      {isEmpty && (
        <Alert severity="warning">
          <AlertTitle>Your cart is empty</AlertTitle>
          <Link to="/">Return to the home page</Link>
        </Alert>
      )}
      {!isEmpty && (
        <>
          <Alert severity="info">
            The donation submission handling is not ready yet. It will be
            available as soon as possible.
          </Alert>

          <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
            <Box sx={{ width: { xs: '100%', md: '40%' } }}>
              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {cartItems.map((p) => (
                  <ListItem
                    key={p.title}
                    secondaryAction={
                      <IconButton onClick={() => removeItem(p)} edge="end">
                        <CloseIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar sx={{ mr: 1 }}>
                      <Avatar
                        sx={{ width: 100, height: 100 }}
                        variant="square"
                        alt=""
                        src={p.image}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Link to={`/project/${p.id}`}>{p.title}</Link>}
                    />
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      component="span"
                    >
                      {dollarFormat(p.amount)}
                    </Typography>
                  </ListItem>
                ))}
                <Divider sx={{ my: 2 }} />
                <ListItem>
                  <Typography variant="h6" component="span" mr={1}>
                    Total:
                  </Typography>
                  <Typography variant="h4" component="span">
                    {dollarFormat(getTotal())}
                  </Typography>
                </ListItem>
              </List>
            </Box>
            <Box sx={{ width: { xs: '100%', md: '60%' } }}>
              <Typography textAlign="center" variant="h3" component="h1">
                Donate
              </Typography>
              <form>
                <FormGroup>
                  <TextField label="Full Name" margin="normal" />
                  <TextField label="Email" margin="normal" type="email" />
                </FormGroup>
                <TextField label="Card Number" margin="normal" />
                <TextField label="MM/YY" margin="normal" />
                <TextField label="Code" margin="normal" />
                <FormGroup>
                  <Button variant="contained">Submit</Button>
                </FormGroup>
              </form>
            </Box>
          </Stack>
        </>
      )}
    </Container>
  );
};

const route = {
  name: 'CheckoutView',
  props: {
    path: '/checkout',
    element: <CheckoutView />,
  },
};

export default route;
