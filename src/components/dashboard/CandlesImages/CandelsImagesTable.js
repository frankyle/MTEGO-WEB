import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddCandleImage from './AddCandleImage'; // Import the new component

const CandleImagesTable = () => {
    const [candleImages, setCandleImages] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false); // State to manage showing the form

    useEffect(() => {
        const fetchCandleImages = async () => {
            try {
                const token = localStorage.getItem('token'); 
                const response = await axios.get('http://127.0.0.1:8000/api/candleimages/candleimages/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCandleImages(response.data);
            } catch (error) {
                console.error("Error fetching candle images:", error);
            }
        };

        fetchCandleImages();
    }, []);

    const handleAddButtonClick = () => {
        setShowAddForm(true);
    };

    const handleFormClose = () => {
        setShowAddForm(false);
        // Optionally fetch candle images again after adding
        // fetchCandleImages();
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>CANDLE IMAGES</h1>
            <button style={styles.addButton} onClick={handleAddButtonClick}>Add Candle Image</button>
            {showAddForm && <AddCandleImage onClose={handleFormClose} />} {/* Show the form when needed */}
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Currency Pair</th>
                        <th style={styles.th}>Monday Candle</th>
                        <th style={styles.th}>Tuesday Candle</th>
                        <th style={styles.th}>Wednesday Candle</th>
                        <th style={styles.th}>Thursday Candle</th>
                        <th style={styles.th}>Friday Candle</th>
                        <th style={styles.th}>Saturday Candle</th>
                        <th style={styles.th}>Sunday Candle</th>
                        <th style={styles.th}>Swing Trade Candle</th>
                    </tr>
                </thead>
                <tbody>
                    {candleImages.map((candleImage) => (
                        <tr key={candleImage.id}>
                            <td style={styles.td}>{candleImage.currency_pair || '-'}</td>
                            <td style={styles.td}><img src={candleImage.monday_candle} alt="Monday Candle" style={styles.avatar} /></td>
                            <td style={styles.td}><img src={candleImage.tuesday_candle} alt="Tuesday Candle" style={styles.avatar} /></td>
                            <td style={styles.td}><img src={candleImage.wednesday_candle} alt="Wednesday Candle" style={styles.avatar} /></td>
                            <td style={styles.td}><img src={candleImage.thursday_candle} alt="Thursday Candle" style={styles.avatar} /></td>
                            <td style={styles.td}><img src={candleImage.friday_candle} alt="Friday Candle" style={styles.avatar} /></td>
                            <td style={styles.td}><img src={candleImage.saturday_candle} alt="Saturday Candle" style={styles.avatar} /></td>
                            <td style={styles.td}><img src={candleImage.sunday_candle} alt="Sunday Candle" style={styles.avatar} /></td>
                            <td style={styles.td}><img src={candleImage.swing_trade_candle} alt="Swing Trade Candle" style={styles.avatar} /></td>
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
    avatar: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        objectFit: 'cover',
    },
};

export default CandleImagesTable;
