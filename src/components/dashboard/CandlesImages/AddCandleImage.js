import React, { useState } from 'react';
import axios from 'axios';

const AddCandleImage = ({ onClose }) => {
    const [currencyPair, setCurrencyPair] = useState('');
    const [mondayCandle, setMondayCandle] = useState('');
    const [tuesdayCandle, setTuesdayCandle] = useState('');
    const [wednesdayCandle, setWednesdayCandle] = useState('');
    const [thursdayCandle, setThursdayCandle] = useState('');
    const [fridayCandle, setFridayCandle] = useState('');
    const [saturdayCandle, setSaturdayCandle] = useState('');
    const [sundayCandle, setSundayCandle] = useState('');
    const [swingTradeCandle, setSwingTradeCandle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://127.0.0.1:8000/api/candleimages/candleimages/', {
                currency_pair: currencyPair,
                monday_candle: mondayCandle,
                tuesday_candle: tuesdayCandle,
                wednesday_candle: wednesdayCandle,
                thursday_candle: thursdayCandle,
                friday_candle: fridayCandle,
                saturday_candle: saturdayCandle,
                sunday_candle: sundayCandle,
                swing_trade_candle: swingTradeCandle,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Candle image added:", response.data);
            onClose(); // Close the form after submission
            // Optionally refresh the data in the parent component
        } catch (error) {
            console.error("Error adding candle image:", error);
        }
    };

    return (
        <div style={styles.formContainer}>
            <h2 style={styles.formHeading}>Add New Candle Image</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Currency Pair" 
                    value={currencyPair}
                    onChange={(e) => setCurrencyPair(e.target.value)}
                    required
                    style={styles.input}
                />
                <input 
                    type="text" 
                    placeholder="Monday Candle URL" 
                    value={mondayCandle}
                    onChange={(e) => setMondayCandle(e.target.value)}
                    required
                    style={styles.input}
                />
                <input 
                    type="text" 
                    placeholder="Tuesday Candle URL" 
                    value={tuesdayCandle}
                    onChange={(e) => setTuesdayCandle(e.target.value)}
                    required
                    style={styles.input}
                />
                <input 
                    type="text" 
                    placeholder="Wednesday Candle URL" 
                    value={wednesdayCandle}
                    onChange={(e) => setWednesdayCandle(e.target.value)}
                    required
                    style={styles.input}
                />
                <input 
                    type="text" 
                    placeholder="Thursday Candle URL" 
                    value={thursdayCandle}
                    onChange={(e) => setThursdayCandle(e.target.value)}
                    required
                    style={styles.input}
                />
                <input 
                    type="text" 
                    placeholder="Friday Candle URL" 
                    value={fridayCandle}
                    onChange={(e) => setFridayCandle(e.target.value)}
                    required
                    style={styles.input}
                />
                <input 
                    type="text" 
                    placeholder="Saturday Candle URL" 
                    value={saturdayCandle}
                    onChange={(e) => setSaturdayCandle(e.target.value)}
                    required
                    style={styles.input}
                />
                <input 
                    type="text" 
                    placeholder="Sunday Candle URL" 
                    value={sundayCandle}
                    onChange={(e) => setSundayCandle(e.target.value)}
                    required
                    style={styles.input}
                />
                <input 
                    type="text" 
                    placeholder="Swing Trade Candle URL" 
                    value={swingTradeCandle}
                    onChange={(e) => setSwingTradeCandle(e.target.value)}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.submitButton}>Add Candle Image</button>
                <button type="button" onClick={onClose} style={styles.cancelButton}>Cancel</button>
            </form>
        </div>
    );
};

// CSS-in-JS styling
const styles = {
    formContainer: {
        width: '300px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    formHeading: {
        marginBottom: '15px',
        fontSize: '20px',
        textAlign: 'center',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '10px',
        cursor: 'pointer',
        width: '48%',
    },
    cancelButton: {
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '10px',
        cursor: 'pointer',
        width: '48%',
        marginLeft: '4%',
    },
};

export default AddCandleImage;
