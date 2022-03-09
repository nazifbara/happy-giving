import { Link as MUILink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Link = (props) => <MUILink {...props} component={RouterLink} />;

export default Link;
