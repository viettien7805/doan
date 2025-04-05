import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Container, 
  Typography, 
  CircularProgress,
  Box,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/data');
        setData(response.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" variant="h6">
          Error: {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h3" gutterBottom align="center">
          Welcome to Our Website
        </Typography>
        
        <Typography variant="body1" paragraph>
          {data?.message || 'No data received from server'}
        </Typography>
        
        <Box mt={4} textAlign="center">
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => navigate('/about')}
          >
            Learn More About Us
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;