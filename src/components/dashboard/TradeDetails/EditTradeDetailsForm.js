import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditTradeDetails = ({ tradeId }) => {
    const [currencyPair, setCurrencyPair] = useState('');
    const [tradeSignal, setTradeSignal] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [ideaCandle, setIdeaCandle] = useState(null);
    const [lineGraphCandle, setLineGraphCandle] = useState(null);
    const [signalCandle, setSignalCandle] = useState(null);
    const [hourCandle, setHourCandle] = useState(null);
    const [entryCandle, setEntryCandle] = useState(null);
    const [takeProfitOneCandle, setTakeProfitOneCandle] = useState(null);
    const [takeProfitTwoCandle, setTakeProfitTwoCandle] = useState(null);

    // Fetch trade details on component mount
    useEffect(() => {
        const fetchTradeDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://127.0.0.1:8000/api/tradedetails/tradedetails/${tradeId}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = response.data;
                setCurrencyPair(data.currency_pair);
                setTradeSignal(data.trade_signal);
                setIsActive(data.is_active);
                // Note: We do not pre-fill file inputs, as the current images can't be displayed directly in a file input
            } catch (error) {
                console.error('Error fetching trade details:', error);
            }
        };

        if (tradeId) {
            fetchTradeDetails();
        }
    }, [tradeId]);

    // Handle form submission to update trade details
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('currency_pair', currencyPair);
        formData.append('trade_signal', tradeSignal);
        formData.append('is_active', isActive);
        if (ideaCandle) formData.append('idea_candle', ideaCandle);
        if (lineGraphCandle) formData.append('line_graph_candle', lineGraphCandle);
        if (signalCandle) formData.append('signal_candle', signalCandle);
        if (hourCandle) formData.append('hour_candle', hourCandle);
        if (entryCandle) formData.append('entry_candle', entryCandle);
        if (takeProfitOneCandle) formData.append('take_profit_one_candle', takeProfitOneCandle);
        if (takeProfitTwoCandle) formData.append('take_profit_two_candle', takeProfitTwoCandle);

        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://127.0.0.1:8000/api/tradedetails/tradedetails/${tradeId}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Trade details updated successfully!');
        } catch (error) {
            console.error('Error updating trade details:', error);
            alert('Error updating trade details.');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h2>Edit Trade Details</h2>
            <label>
                Currency Pair:
                <input
                    type="text"
                    value={currencyPair}
                    onChange={(e) => setCurrencyPair(e.target.value)}
                    required
                />
            </label>
            <label>
                Trade Signal:
                <select
                    value={tradeSignal}
                    onChange={(e) => setTradeSignal(e.target.value)}
                    required
                >
                    <option value="">Select</option>
                    <option value="BUYS">Buy</option>
                    <option value="SELLS">Sell</option>
                </select>
            </label>

            <label>
                <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                />
                Is Active
            </label>

            <h3>Update Candles (Optional)</h3>

            <label>
                Idea Candle:
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setIdeaCandle(e.target.files[0])}
                />
            </label>

            <label>
                Line Graph Candle:
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setLineGraphCandle(e.target.files[0])}
                />
            </label>

            <label>
                Signal Candle:
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSignalCandle(e.target.files[0])}
                />
            </label>

            <label>
                Hour Candle:
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setHourCandle(e.target.files[0])}
                />
            </label>

            <label>
                Entry Candle:
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEntryCandle(e.target.files[0])}
                />
            </label>

            <label>
                Take Profit 1 Candle:
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setTakeProfitOneCandle(e.target.files[0])}
                />
            </label>

            <label>
                Take Profit 2 Candle:
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setTakeProfitTwoCandle(e.target.files[0])}
                />
            </label>

            <button type="submit" style={styles.button}>
                Update Trade Details
            </button>
        </form>
    );
};

// CSS-in-JS styling
const styles = {
    form: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#f9f9f9',
    },
    button: {
        marginTop: '10px',
        padding: '10px 15px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default EditTradeDetails;
