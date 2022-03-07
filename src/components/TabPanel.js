import { Box } from '@mui/material';

function TabPanel({ value, index, children }) {
  if (value !== index) {
    return null;
  }
  return <Box>{children}</Box>;
}

export default TabPanel;
