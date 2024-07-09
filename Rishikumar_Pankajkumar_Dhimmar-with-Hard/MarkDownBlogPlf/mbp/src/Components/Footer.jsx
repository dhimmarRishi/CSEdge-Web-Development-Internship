import React from 'react';
import { Container, Typography, Link, Grid } from '@mui/material';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#f0f0f0', padding: '20px 0', marginTop: 28 }}>
      <Container maxWidth="full" sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h2" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt risus.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h2" gutterBottom>
              Useful Links
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <Link href="#">Home</Link>
              <br />
              <Link href="#">About Us</Link>
              <br />
              <Link href="#">Services</Link>
              <br />
              <Link href="#">Contact Us</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h2" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="textSecondary">
              1234 Main Street,
              <br />
              City, State ZIP
              <br />
              Phone: (123) 456-7890
              <br />
              Email: info@example.com
            </Typography>
          </Grid>
        </Grid>

      </Container>
      <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: '20px' }}>
        © {new Date().getFullYear()} Your Website. All rights reserved.
      </Typography>
    </footer>
  );
}

export default Footer;
