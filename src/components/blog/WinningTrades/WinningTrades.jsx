import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'; // To handle navigation
import axios from 'axios';
import Heading from "../../common/Heading";
import { Button, Typography } from '@mui/material';

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
          // const response = await axios.get('http://127.0.0.1:8000/api/tradedetails/tradedetails/', {

          
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
      <div className="content grid3 mtop">
        {candles
          .filter((candle) => candle.take_profit_two_candle) // Only show items with a take profit candle image
          .sort((a, b) => b.is_active - a.is_active || new Date(b.created_at) - new Date(a.created_at)) // Sort by active status, then by creation date
          .slice(0, 8) // Show only the latest 8 items
          .map((candle, index) => {
            const { id, take_profit_two_candle, currency_pair, is_active, created_at } = candle;
            return (
              <div className="box shadow" key={index}>
                <div className="img">
                  <img src={take_profit_two_candle} alt={currency_pair} />
                </div>
                <div className="text">
                  <div className="category flex">
                    <span
                      style={{
                        background: "#f0f0f0",
                        color: "#333",
                      }}
                    >
                      {currency_pair || "N/A"}
                    </span>
                    <div style={{ textAlign: "center", marginLeft: "10px" }}>
                      <span
                        style={{
                          color: is_active ? "green" : "gray",
                          fontSize: "20px",
                        }}
                      >
                        {is_active ? "✔" : "✖"}
                      </span>
                      <p
                        style={{
                          fontSize: "12px",
                          color: is_active ? "green" : "gray",
                          marginTop: "5px",
                        }}
                      >
                        {is_active ? "Active" : "Inactive"}
                      </p>
                    </div>
                  </div>

                  <p style={{ fontSize: "12px", color: "#888" }}>
                    Created on: {new Date(created_at).toLocaleDateString()}
                  </p>

                  <p style={{ marginTop: '10px', fontSize: '14px', color: '#555' }}>
                    Today we took a risk of 36 Pips and achieved a profit of 36+ pips using the MGI Candles trading strategy.
                    The risk-to-reward ratio was 1:1.
                  </p>

                  <button
                    style={{
                      marginTop: '15px',
                      padding: '10px 20px',
                      backgroundColor: '#007bff',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '25px',
                      cursor: 'pointer',
                      fontSize: '14px',
                    }}
                    onClick={() => handleLearnMore(id)} // Pass the id to navigate
                  >
                    Learn More
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default WinningTrades;
