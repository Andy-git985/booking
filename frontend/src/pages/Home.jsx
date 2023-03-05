import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ContactUs from '../components/ContactUs';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Team from '../components/Team';
const Home = () => {
  return (
    <main>
      <Hero />
      <Services />
      <Team />
      <ContactUs />
    </main>
  );
};

export default Home;
