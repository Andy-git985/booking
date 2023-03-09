import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import userServices from '../services/user';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Team = () => {
  const user = useSelector(({ user }) => user);

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
        {(user.isLoading ? Array.from(new Array(3)) : user.employees).map(
          (employee, index) => (
            <Grid
              item
              key={employee ? employee.id : `skeleton-key-${index}`}
              xs={12}
              sm={6}
              md={4}
              sx={{ marginInline: 'auto' }}
            >
              {employee ? (
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
                    alt={employee.firstName}
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
                      {employee.firstName}
                    </Typography>
                    <Typography variant="body2">{employee.profile}</Typography>
                  </CardContent>
                  <CardActions sx={{ marginInline: 'auto', mb: 2 }}>
                    <Button
                      size="small"
                      variant="outlined"
                    >{`Book with ${employee.firstName}`}</Button>
                  </CardActions>
                </Card>
              ) : (
                <Skeleton
                  variant="rectangular"
                  sx={{
                    aspectRatio: '9 / 16',
                    height: 'clamp(400px, 60vh, 600px)',
                    height: 'clamp(400px, 60dvh, 600px)',
                    marginInline: 'auto',
                  }}
                />
              )}
            </Grid>
          )
        )}
      </Grid>
    </Container>
  );
};

export default Team;
