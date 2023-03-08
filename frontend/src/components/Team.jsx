import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { employees } from '../data';

const Team = () => {
  return (
    <Container sx={{ py: 8 }}>
      <Typography
        component="h3"
        variant="h4"
        align="center"
        color="text.primary"
        gutterBottom
      >
        Our Team
      </Typography>

      <Grid container spacing={4}>
        {employees.map((employee) => (
          <Grid
            item
            key={employee.id}
            xs={12}
            sm={6}
            md={4}
            sx={{ marginInline: 'auto' }}
          >
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardMedia
                component="img"
                image={employee.image}
                alt={employee.name}
                sx={{
                  aspectRatio: '9 / 16',
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  gutterBottom
                  component="h4"
                  variant="h5"
                  align="center"
                >
                  {employee.name}
                </Typography>
                <Typography variant="body2">{employee.profile}</Typography>
              </CardContent>
              <CardActions sx={{ marginInline: 'auto', mb: 2 }}>
                <Button
                  size="small"
                  variant="outlined"
                >{`Book with ${employee.name}`}</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Team;
