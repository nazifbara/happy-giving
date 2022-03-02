import { Box } from '@mui/material';

function ContentBox({ children }) {
  return (
    <Box component="main" sx={{ my: 4 }}>
      {children}
    </Box>
  );
}

export default ContentBox;
