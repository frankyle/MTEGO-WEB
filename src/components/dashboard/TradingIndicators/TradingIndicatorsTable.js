import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddTradingIndicator from './AddTradingIndicator'; // Import the new component

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

    const handleAddButtonClick = () => {
        setShowAddForm(true);
    };

    const handleFormClose = () => {
        setShowAddForm(false);
        // Optionally refresh the trading indicators after adding
        // fetchTradingIndicators();
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>INDICATORS CONFIRMATIONS</h1>
            <button style={styles.addButton} onClick={handleAddButtonClick}>Add Trading Indicator</button>
            {showAddForm && <AddTradingIndicator onClose={handleFormClose} />} {/* Show the form when needed */}
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Currency Pair</th>
                        <th style={styles.th}>Candle Pattern</th>
                        <th style={styles.th}>Fibonacci Level</th>
                        <th style={styles.th}>Session</th>
                        <th style={styles.th}>5 Min Order Block</th>
                        <th style={styles.th}>Previous Day Color Structure</th>
                        <th style={styles.th}>Asian Kill Zone</th>
                        <th style={styles.th}>London Kill Zone</th>
                        <th style={styles.th}>New York Kill Zone</th>
                        <th style={styles.th}>Flip Four Hour Candle</th>
                        <th style={styles.th}>15 Min Break of Structure</th>
                        <th style={styles.th}>FVG Blocks</th>
                        <th style={styles.th}>Change Color UT Alert</th>
                        <th style={styles.th}>Flactial and Alligator</th>
                        <th style={styles.th}>Pips Stop Loss</th>
                        <th style={styles.th}>Pips Gained</th>
                    </tr>
                </thead>
                <tbody>
                    {tradingIndicators.map((indicator) => (
                        <tr key={indicator.id}>
                            <td style={styles.td}>{indicator.currency_pair || '-'}</td>
                            <td style={styles.td}>{indicator.candle_pattern || '-'}</td>
                            <td style={styles.td}>{indicator.fibonacci_level || '-'}</td>
                            <td style={styles.td}>{indicator.session || '-'}</td>
                            <td style={styles.td}>{indicator.five_min_order_block ? 'Yes' : 'No'}</td>
                            <td style={styles.td}>{indicator.previous_day_color_structure ? 'Yes' : 'No'}</td>
                            <td style={styles.td}>{indicator.asian_kill_zone ? 'Yes' : 'No'}</td>
                            <td style={styles.td}>{indicator.london_kill_zone ? 'Yes' : 'No'}</td>
                            <td style={styles.td}>{indicator.newyork_kill_zone ? 'Yes' : 'No'}</td>
                            <td style={styles.td}>{indicator.flip_four_hour_candle ? 'Yes' : 'No'}</td>
                            <td style={styles.td}>{indicator.fifteen_min_break_of_structure ? 'Yes' : 'No'}</td>
                            <td style={styles.td}>{indicator.fvg_blocks ? 'Yes' : 'No'}</td>
                            <td style={styles.td}>{indicator.change_color_ut_alert ? 'Yes' : 'No'}</td>
                            <td style={styles.td}>{indicator.flactial_and_alligator ? 'Yes' : 'No'}</td>
                            <td style={styles.td}>{indicator.pips_stoplost || '0'}</td>
                            <td style={styles.td}>{indicator.pips_gained || '0'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// CSS-in-JS styling
const styles = {
    container: {
        width: '90%',
        margin: '0 auto',
        textAlign: 'center',
    },
    heading: {
        margin: '20px 0',
        fontSize: '24px',
    },
    addButton: {
        marginBottom: '20px',
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    },
    th: {
        padding: '12px',
        border: '1px solid #ddd',
        backgroundColor: '#f2f2f2',
        fontWeight: 'bold',
    },
    td: {
        padding: '12px',
        border: '1px solid #ddd',
    },
};

export default TradingIndicatorsTable;
