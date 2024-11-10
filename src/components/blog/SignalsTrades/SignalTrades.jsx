import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'; // To handle navigation
import axios from 'axios';
import Heading from "../../common/Heading";
import { Grid, Card, CardContent, CardMedia, Chip, Button, Typography } from '@mui/material';

const SignalTrades = () => {
  const [candles, setCandles] = useState([]);
  const history = useHistory(); // To navigate programmatically

  useEffect(() => {
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
  }, []);

  const handleLearnMore = (id) => {
    history.push(`/trade-details/${id}`); // Navigate to the detailed page
  };

  return (
    <>
      <Heading 
        title="Our Setup Entries: Get to Enter a trade with a repetition pattern" 
        subtitle="Don't just take trades, take high-probability trades with a well-calculated Risk-to-Reward Ratio."
      />
      <Grid container spacing={4} justifyContent="center" style={{ padding: '20px' }}>
        {candles
          .filter((candle) => candle.entry_candle) // Only show items with an entry candle
          .sort((a, b) => b.is_active - a.is_active || new Date(b.created_at) - new Date(a.created_at)) // Sort by active status, then by creation date
          .slice(0, 8) // Show only the latest 8 items
          .map((candle, index) => {
            const { id, entry_candle, currency_pair, is_active, created_at } = candle;
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card className="box shadow" style={{ maxWidth: '100%', borderRadius: '10px' }}>
                  <CardMedia
                    component="img"
                    alt={currency_pair || 'Trade Image'}
                    image={entry_candle}
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
                        padding: '8px', // Smaller padding for a smaller button
                        fontSize: '13px', // Smaller font size
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

export default SignalTrades;
