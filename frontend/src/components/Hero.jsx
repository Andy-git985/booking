import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import main from '../assets/images/nathon-oski-EW_rqoSdDes-unsplash.jpg';

const Hero = () => {
  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${main})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        aspectRatio: '16 / 9',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Welcome to our barbershop!
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          If you're looking for a top-quality haircut service in a welcoming and
          relaxing environment, look no further than our barbershop. Book your
          appointment today and let us help you achieve the perfect haircut!
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Link to="/reserve">
            <Button variant="contained">Schedule an appointment</Button>
          </Link>
          {/* <Button variant="outlined">Secondary action</Button> */}
        </Stack>
      </Container>
    </Box>
  );
};

export default Hero;
