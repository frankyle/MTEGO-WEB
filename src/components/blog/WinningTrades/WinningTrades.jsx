import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'; // To handle navigation
import axios from 'axios';
import Heading from "../../common/Heading";
import { Button, Typography, Grid, Card, CardContent, CardMedia, Chip } from '@mui/material';

const WinningTrades = () => {
  const [candles, setCandles] = useState([]);
  const history = useHistory(); // To navigate programmatically

  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem('token');

  useEffect(() => {
    if (!isLoggedIn) {
      return; // If not logged in, don't fetch data
    }

    const fetchCandles = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        const response = await axios.get('https://auth-django-85a2671276ca.herokuapp.com/api/tradedetails/tradedetails/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCandles(response.data);
      } catch (error) {
        console.error('Error fetching candles:', error);
      }
    };

    fetchCandles();
  }, [isLoggedIn]);

  const handleLearnMore = (id) => {
    history.push(`/trade-details/${id}`); // Navigate to the detailed page
  };

  if (!isLoggedIn) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Heading
          title="Please Log In to View Recent Profit Takes"
          subtitle="To access this content, you need to be logged in. Please sign in or create an account to continue."
        />
        <Typography variant="h6" color="textSecondary" gutterBottom>
          You need to be logged in to view the successful trades.
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          style={{ margin: '10px' }}
          sx={{ fontWeight: 'bold', mx: 1, borderRadius: '18px' }}
          onClick={() => history.push('/login')}
        >
          Log In
        </Button>
        <Button
          onClick={() => history.push("/register")}
          variant="contained"
          color="primary"
          sx={{ fontWeight: 'bold', mx: 1, borderRadius: '18px' }}
        >
          Register
        </Button>
      </div>
    );
  }

  return (
    <>
      <Heading
        title="Recent Profit Takes: Celebrating Successful Trades in the Forex Market"
        subtitle="Explore our recent trades that have achieved their take profits, showcasing the effectiveness of our proven strategies and signals."
      />
      <Grid container spacing={4} justifyContent="center" style={{ padding: '20px' }}>
        {candles
          .filter((candle) => candle.take_profit_two_candle) // Only show items with a take profit candle image
          .sort((a, b) => b.is_active - a.is_active || new Date(b.created_at) - new Date(a.created_at)) // Sort by active status, then by creation date
          .slice(0, 8) // Show only the latest 8 items
          .map((candle, index) => {
            const { id, take_profit_two_candle, currency_pair, is_active, created_at } = candle;
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card className="box shadow" style={{ maxWidth: '100%', borderRadius: '10px' }}>
                  <CardMedia
                    component="img"
                    alt={currency_pair || 'Trade Image'}
                    image={take_profit_two_candle}
                    title={currency_pair || 'Trade Image'}
                    style={{ height: '200px', objectFit: 'cover', borderRadius: '10px' }}
                  />
                  <CardContent>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Chip
                        label={currency_pair || 'N/A'}
                        style={{
                          background: "#f0f0f0",
                          color: "#333",
                          fontWeight: 'bold',
                        }}
                      />
                      <Chip
                        label={is_active ? "Active" : "Inactive"}
                        style={{
                          background: is_active ? 'green' : 'gray',
                          color: '#fff',
                          fontSize: '14px',
                          fontWeight: 'bold',
                        }}
                      />
                    </div>
                    <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
                      Created on: {new Date(created_at).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" style={{ marginTop: '10px', fontSize: '14px', color: '#555' }}>
                      Today we took a risk of 36 Pips and achieved a profit of 36+ pips using the MGI Candles trading strategy.
                      The risk-to-reward ratio was 1:1.
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      style={{
                        marginTop: '15px',
                        fontWeight: 'bold',
                        borderRadius: '25px',
                      }}
                      onClick={() => handleLearnMore(id)} // Pass the id to navigate
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export default WinningTrades;
