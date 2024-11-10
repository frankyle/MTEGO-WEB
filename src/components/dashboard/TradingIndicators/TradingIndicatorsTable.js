import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddTradingIndicator from './AddTradingIndicator'; // Import the new component
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';

const TradingIndicatorsTable = () => {
    const [tradingIndicators, setTradingIndicators] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false); // State to manage showing the form

    useEffect(() => {
        const fetchTradingIndicators = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve token from storage
                const response = await axios.get('http://127.0.0.1:8000/api/tradingindicators/tradingindicators/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTradingIndicators(response.data);
            } catch (error) {
                console.error("Error fetching trading indicators:", error);
            }
        };

        fetchTradingIndicators();
    }, []);


    const handleFormClose = () => {
        setShowAddForm(false);
        // Optionally refresh the trading indicators after adding
        // fetchTradingIndicators();
    };

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom align="center">
                Indicators Confirmations
            </Typography>
            

            {/* Table container */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="trading indicators table">
                    <TableHead>
                        <TableRow>
                            {[
                                "Currency Pair",
                                "Candle Pattern",
                                "Fibonacci Level",
                                "Session",
                                "5 Min Order Block",
                                "Previous Day Color Structure",
                                "Asian Kill Zone",
                                "London Kill Zone",
                                "New York Kill Zone",
                                "Flip Four Hour Candle",
                                "15 Min Break of Structure",
                                "FVG Blocks",
                                "Change Color UT Alert",
                                "Flactial and Alligator",
                                "Pips Stop Loss",
                                "Pips Gained"
                            ].map((header, index) => (
                                <TableCell key={index} align="center" style={{ fontWeight: 'bold' }}>
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tradingIndicators.map((indicator) => (
                            <TableRow key={indicator.id}>
                                <TableCell align="center">{indicator.currency_pair || '-'}</TableCell>
                                <TableCell align="center">{indicator.candle_pattern || '-'}</TableCell>
                                <TableCell align="center">{indicator.fibonacci_level || '-'}</TableCell>
                                <TableCell align="center">{indicator.session || '-'}</TableCell>
                                <TableCell align="center">{indicator.five_min_order_block ? 'Yes' : 'No'}</TableCell>
                                <TableCell align="center">{indicator.previous_day_color_structure ? 'Yes' : 'No'}</TableCell>
                                <TableCell align="center">{indicator.asian_kill_zone ? 'Yes' : 'No'}</TableCell>
                                <TableCell align="center">{indicator.london_kill_zone ? 'Yes' : 'No'}</TableCell>
                                <TableCell align="center">{indicator.newyork_kill_zone ? 'Yes' : 'No'}</TableCell>
                                <TableCell align="center">{indicator.flip_four_hour_candle ? 'Yes' : 'No'}</TableCell>
                                <TableCell align="center">{indicator.fifteen_min_break_of_structure ? 'Yes' : 'No'}</TableCell>
                                <TableCell align="center">{indicator.fvg_blocks ? 'Yes' : 'No'}</TableCell>
                                <TableCell align="center">{indicator.change_color_ut_alert ? 'Yes' : 'No'}</TableCell>
                                <TableCell align="center">{indicator.flactial_and_alligator ? 'Yes' : 'No'}</TableCell>
                                <TableCell align="center">{indicator.pips_stoplost || '0'}</TableCell>
                                <TableCell align="center">{indicator.pips_gained || '0'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {showAddForm && (
                <AddTradingIndicator handleClose={handleFormClose} />
            )}
        </div>
    );
};

export default TradingIndicatorsTable;
