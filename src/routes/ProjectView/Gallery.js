import { CircularProgress, Grid } from '@mui/material';

import { useGallery } from '../../hooks';

function Gallery({ projectId }) {
  const { data: images, isLoading, isSuccess } = useGallery(projectId);

  return (
    <>
      {isLoading && <CircularProgress />}
      {isSuccess && (
        <Grid
          container
          alignItems="center"
          spacing={2}
          columns={{ xs: 2, sm: 4, lg: 12 }}
        >
          {images.map((img) => (
            <Grid item xs={2} sm={2} lg={4} key={img.id}>
              <img src={`${img.imagelink[3].url}`} alt="" />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default Gallery;
