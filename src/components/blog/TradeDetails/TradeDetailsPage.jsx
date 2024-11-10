import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';

const TradeDetailsPage = () => {
  const { id } = useParams(); // Get the `id` from the URL parameters
  const [tradeDetails, setTradeDetails] = useState(null);

  useEffect(() => {
    const fetchTradeDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        const response = await axios.get(`https://auth-django-85a2671276ca.herokuapp.com/api/tradedetails/tradedetails/${id}/`, {
          // const response = await axios.get(`http://127.0.0.1:8000/api/tradedetails/tradedetails/${id}/`, {
         
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTradeDetails(response.data);
      } catch (error) {
        console.error('Error fetching trade details:', error);
      }
    };

    fetchTradeDetails();
  }, [id]);

  if (!tradeDetails) return <CircularProgress />; // Show loading spinner while fetching data

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Trade Details for {tradeDetails.currency_pair}
      </Typography>
      <Typography variant="h6" color="textSecondary" paragraph>
        <strong>Trade Signal:</strong> {tradeDetails.trade_signal}
      </Typography>
      <Typography variant="body1" color={tradeDetails.is_active ? 'green' : 'gray'}>
        <strong>Status:</strong> {tradeDetails.is_active ? 'Active' : 'Inactive'}
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        <strong>Created At:</strong> {new Date(tradeDetails.created_at).toLocaleDateString()}
      </Typography>

      {/* Grid Layout for Images */}
      <Grid container spacing={4} sx={{ marginTop: 4 }}>
        {/* Display images conditionally */}

        {/* Signal Candle */}
        {tradeDetails.signal_candle && (
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Setup Candle
                </Typography>
                <Box>
                  <img src={tradeDetails.signal_candle} alt="Signal Candle" style={{ width: '100%', borderRadius: '8px' }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Hour Candle */}
        {tradeDetails.hour_candle && (
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Hour Candle
                </Typography>
                <Box>
                  <img src={tradeDetails.hour_candle} alt="Hour Candle" style={{ width: '100%', borderRadius: '8px' }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Entry Candle */}
        {tradeDetails.entry_candle && (
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Entry Candle
                </Typography>
                <Box>
                  <img src={tradeDetails.entry_candle} alt="Entry Candle" style={{ width: '100%', borderRadius: '8px' }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Breakeven Candle */}
        {tradeDetails.breakeven_candle && (
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Breakeven Candle
                </Typography>
                <Box>
                  <img src={tradeDetails.breakeven_candle} alt="Breakeven Candle" style={{ width: '100%', borderRadius: '8px' }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Take Profit Candles */}
        {tradeDetails.take_profit_one_candle && (
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Take Profit One Candle
                </Typography>
                <Box>
                  <img src={tradeDetails.take_profit_one_candle} alt="Take Profit One Candle" style={{ width: '100%', borderRadius: '8px' }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
        {tradeDetails.take_profit_two_candle && (
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Take Profit Two Candle
                </Typography>
                <Box>
                  <img src={tradeDetails.take_profit_two_candle} alt="Take Profit Two Candle" style={{ width: '100%', borderRadius: '8px' }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default TradeDetailsPage;
