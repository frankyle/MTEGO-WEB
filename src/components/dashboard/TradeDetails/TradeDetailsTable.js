import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Modal, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './TradeDetailsTable.css';

const TradeDetailsTable = () => {
    const [tradeDetails, setTradeDetails] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchTradeDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                // const response = await axios.get('http://127.0.0.1:8000/api/tradedetails/tradedetails/', {
                    const response = await axios.get('https://auth-django-85a2671276ca.herokuapp.com/api/tradedetails/tradedetails/', {
                    
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

    const handleImageClick = (imageSrc) => {
        setSelectedImage(imageSrc);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedImage(null);
    };

    const handleViewDetails = (tradeId) => {
        // Navigate to the detailed view page or open a modal with detailed info.
        // Example: Redirect to a detailed page (assuming you have routing setup):
        window.location.href = `/trade-all-details/${tradeId}`;
    };

    return (
        <div className="container">
            <Typography
                variant="h4"
                className="heading"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    marginBottom: '20px'
                }}
            >
                TRADE DETAILS
            </Typography>
            <TableContainer className="table-container">
                <Table>
                    <TableHead className="table-head">
                        <TableRow>
                            <TableCell>Currency Pair</TableCell>
                            <TableCell>Trade Signal</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Trade's Idea </TableCell>
                            <TableCell>Line Graph Candle</TableCell>
                            <TableCell>Setup Candle</TableCell>
                            <TableCell>Hour Candle</TableCell>
                            <TableCell>2 Hour Candle</TableCell>
                            <TableCell>Entry Candle</TableCell>
                            <TableCell>Breakeven Candle</TableCell>
                            <TableCell>Take Profit 1</TableCell>
                            <TableCell>Take Profit 2</TableCell>
                            <TableCell>Actions</TableCell> {/* New column for actions */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tradeDetails.map((trade) => (
                            <TableRow key={trade.id}>
                                <TableCell className="cell">{trade.currency_pair || '-'}</TableCell>
                                <TableCell className="cell">{trade.trade_signal || '-'}</TableCell>
                                <TableCell className="cell">{trade.is_active ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell className="cell">{new Date(trade.created_at).toLocaleDateString()}</TableCell>
                                <TableCell className="cell">
                                    <img
                                        src={trade.idea_candle}
                                        alt="Idea Candle"
                                        className="image"
                                        onClick={() => handleImageClick(trade.idea_candle)}
                                    />
                                </TableCell>
                                <TableCell className="cell">
                                    <img
                                        src={trade.line_graph_candle}
                                        alt="Line Graph Candle"
                                        className="image"
                                        onClick={() => handleImageClick(trade.line_graph_candle)}
                                    />
                                </TableCell>
                                <TableCell className="cell">
                                    <img
                                        src={trade.signal_candle}
                                        alt="Signal Candle"
                                        className="image"
                                        onClick={() => handleImageClick(trade.signal_candle)}
                                    />
                                </TableCell>
                                <TableCell className="cell">
                                    <img
                                        src={trade.hour_candle}
                                        alt="Hour Candle"
                                        className="image"
                                        onClick={() => handleImageClick(trade.hour_candle)}
                                    />
                                </TableCell>
                                <TableCell className="cell">
                                    <img
                                        src={trade.two_hour_candle}
                                        alt="2 Hour Candle"
                                        className="image"
                                        onClick={() => handleImageClick(trade.two_hour_candle)}
                                    />
                                </TableCell>
                                <TableCell className="cell">
                                    <img
                                        src={trade.entry_candle}
                                        alt="Entry Candle"
                                        className="image"
                                        onClick={() => handleImageClick(trade.entry_candle)}
                                    />
                                </TableCell>
                                <TableCell className="cell">
                                    <img
                                        src={trade.breakeven_candle}
                                        alt="Breakeven Candle"
                                        className="image"
                                        onClick={() => handleImageClick(trade.breakeven_candle)}
                                    />
                                </TableCell>
                                <TableCell className="cell">
                                    <img
                                        src={trade.take_profit_one_candle}
                                        alt="Take Profit 1"
                                        className="image"
                                        onClick={() => handleImageClick(trade.take_profit_one_candle)}
                                    />
                                </TableCell>
                                <TableCell className="cell">
                                    <img
                                        src={trade.take_profit_two_candle}
                                        alt="Take Profit 2"
                                        className="image"
                                        onClick={() => handleImageClick(trade.take_profit_two_candle)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleViewDetails(trade.id)}
                                    >
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={openModal} onClose={handleCloseModal}>
                <div
                    className="modal-content"
                    style={{
                        width: '80%',
                        height: '80%',
                        margin: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        padding: '20px',
                        outline: 'none',
                    }}
                >
                    <IconButton
                        className="close-button"
                        onClick={handleCloseModal}
                        style={{ position: 'absolute', top: '10px', right: '10px' }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <img
                        src={selectedImage}
                        alt="Selected"
                        style={{ width: '100%', height: '100%', borderRadius: '8px', objectFit: 'contain' }}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default TradeDetailsTable;
