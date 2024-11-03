import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditTradeDetailsForm from './EditTradeDetailsForm';
import AddTradeDetailsForm from './AddTradeDetailsForm';

const TradeDetailsTable = () => {
    const [tradeDetails, setTradeDetails] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTradeId, setSelectedTradeId] = useState(null);
    const [isAddingNewTrade, setIsAddingNewTrade] = useState(false);

    useEffect(() => {
        const fetchTradeDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:8000/api/tradedetails/tradedetails/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTradeDetails(response.data);
            } catch (error) {
                console.error("Error fetching trade details:", error);
            }
        };

        fetchTradeDetails();
    }, []);

    const handleEditClick = (tradeId) => {
        setSelectedTradeId(tradeId);
        setIsAddingNewTrade(false);
        setShowModal(true);
    };

    const handleAddNewTradeClick = () => {
        setSelectedTradeId(null);
        setIsAddingNewTrade(true);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedTradeId(null);
        setIsAddingNewTrade(false);
    };

    const handleDeleteClick = async (tradeId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://127.0.0.1:8000/api/tradedetails/tradedetails/${tradeId}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Remove the deleted trade from the state
            setTradeDetails(tradeDetails.filter((trade) => trade.id !== tradeId));
        } catch (error) {
            console.error("Error deleting trade:", error);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>TRADE DETAILS</h1>
            <button style={styles.addButton} onClick={handleAddNewTradeClick}>
                Add New Trade
            </button>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Currency Pair</th>
                        <th style={styles.th}>Trade Signal</th>
                        <th style={styles.th}>Status</th>
                        <th style={styles.th}>Created At</th>
                        <th style={styles.th}>Idea Candle</th>
                        <th style={styles.th}>Line Graph Candle</th>
                        <th style={styles.th}>Signal Candle</th>
                        <th style={styles.th}>Hour Candle</th>
                        <th style={styles.th}>2 Hour Candle</th>
                        <th style={styles.th}>Entry Candle</th>
                        <th style={styles.th}>Breakeven Candle</th>
                        <th style={styles.th}>Take Profit 1</th>
                        <th style={styles.th}>Take Profit 2</th>
                        <th style={styles.th}>Edit</th>
                        <th style={styles.th}>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {tradeDetails.map((trade) => (
                        <tr key={trade.id}>
                            <td style={styles.td}>{trade.currency_pair || '-'}</td>
                            <td style={styles.td}>{trade.trade_signal || '-'}</td>
                            <td style={styles.td}>{trade.is_active ? 'Active' : 'Inactive'}</td>
                            <td style={styles.td}>{new Date(trade.created_at).toLocaleDateString()}</td>
                            <td style={styles.td}><img src={trade.idea_candle} alt="Idea Candle" style={styles.avatar} /></td>
                            <td style={styles.td}><img src={trade.line_graph_candle} alt="Line Graph Candle" style={styles.avatar} /></td>
                            <td style={styles.td}><img src={trade.signal_candle} alt="Signal Candle" style={styles.avatar} /></td>
                            <td style={styles.td}><img src={trade.hour_candle} alt="Hour Candle" style={styles.avatar} /></td>
                            <td style={styles.td}><img src={trade.two_hour_candle} alt="2 Hour Candle" style={styles.avatar} /></td>
                            <td style={styles.td}><img src={trade.entry_candle} alt="Entry Candle" style={styles.avatar} /></td>
                            <td style={styles.td}><img src={trade.breakeven_candle} alt="Breakeven Candle" style={styles.avatar} /></td>
                            <td style={styles.td}><img src={trade.take_profit_one_candle} alt="Take Profit 1" style={styles.avatar} /></td>
                            <td style={styles.td}><img src={trade.take_profit_two_candle} alt="Take Profit 2" style={styles.avatar} /></td>
                            <td style={styles.td}>
                                <button style={styles.button} onClick={() => handleEditClick(trade.id)}>
                                    Edit
                                </button>
                            </td>
                            <td style={styles.td}>
                                <button style={styles.deleteButton} onClick={() => handleDeleteClick(trade.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        {isAddingNewTrade ? (
                            <AddTradeDetailsForm onClose={handleCloseModal} />
                        ) : (
                            <EditTradeDetailsForm tradeId={selectedTradeId} onClose={handleCloseModal} />
                        )}
                    </div>
                </div>
            )}
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
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
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
        borderRadius: '4px',
    },
    button: {
        padding: '8px 16px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    deleteButton: {
        padding: '8px 16px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        width: '400px',
        textAlign: 'left',
    },
};

export default TradeDetailsTable;
