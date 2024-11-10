import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Typography, Modal, IconButton, Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddCandleImage from './AddCandleImage';
import './CandleImagesTable.css';

const CandleImagesTable = () => {
    const [candleImages, setCandleImages] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const fetchCandleImages = async () => {
            try {
                const token = localStorage.getItem('token');
                // const response = await axios.get('http://127.0.0.1:8000/api/candleimages/candleimages/', {
                    const response = await axios.get('https://auth-django-85a2671276ca.herokuapp.com/api/candleimages/candleimages/', {
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

    const handleImageClick = (imageSrc) => {
        setSelectedImage(imageSrc);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedImage(null);
    };

    const handleViewClick = (id) => {
        // Navigate to detailed page (adjust URL as needed)
        window.location.href = `/candleimages/${id}`;
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
                CANDLE IMAGES
            </Typography>
            {showAddForm && <AddCandleImage onClose={() => setShowAddForm(false)} />}
            <TableContainer className="table-container">
                <Table>
                    <TableHead className="table-head">
                        <TableRow>
                            <TableCell>Currency Pair</TableCell>
                            <TableCell>Monday Candle</TableCell>
                            <TableCell>Tuesday Candle</TableCell>
                            <TableCell>Wednesday Candle</TableCell>
                            <TableCell>Thursday Candle</TableCell>
                            <TableCell>Friday Candle</TableCell>
                            <TableCell>Saturday Candle</TableCell>
                            <TableCell>Sunday Candle</TableCell>
                            <TableCell>Swing Trade Candle</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {candleImages.map((candleImage) => (
                            <TableRow key={candleImage.id}>
                                <TableCell className="cell">{candleImage.currency_pair || '-'}</TableCell>
                                <TableCell className="cell">
                                    <img
                                        src={candleImage.monday_candle}
                                        alt="Monday Candle"
                                        className="image"
                                        onClick={() => handleImageClick(candleImage.monday_candle)}
                                    />
                                </TableCell>
                                <TableCell className="cell">
                                    <img
                                        src={candleImage.tuesday_candle}
                                        alt="Tuesday Candle"
                                        className="image"
                                        onClick={() => handleImageClick(candleImage.tuesday_candle)}
                                    />
                                </TableCell>
                                <TableCell className="cell">
                                    <img
                                        src={candleImage.wednesday_candle}
                                        alt="Wednesday Candle"
                                        className="image"
                                        onClick={() => handleImageClick(candleImage.wednesday_candle)}
                                    />
                                </TableCell>
                                <TableCell className="cell">
                                    <img
                                        src={candleImage.thursday_candle}
                                        alt="Thursday Candle"
                                        className="image"
                                        onClick={() => handleImageClick(candleImage.thursday_candle)}
                                    />
                                </TableCell>
                                <TableCell className="cell">
                                    <img
                                        src={candleImage.friday_candle}
                                        alt="Friday Candle"
                                        className="image"
                                        onClick={() => handleImageClick(candleImage.friday_candle)}
                                    />
                                </TableCell>
                                <TableCell className="cell">
                                    <img
                                        src={candleImage.saturday_candle}
                                        alt="Saturday Candle"
                                        className="image"
                                        onClick={() => handleImageClick(candleImage.saturday_candle)}
                                    />
                                </TableCell>
                                <TableCell className="cell">
                                    <img
                                        src={candleImage.sunday_candle}
                                        alt="Sunday Candle"
                                        className="image"
                                        onClick={() => handleImageClick(candleImage.sunday_candle)}
                                    />
                                </TableCell>
                                <TableCell className="cell">
                                    <img
                                        src={candleImage.swing_trade_candle}
                                        alt="Swing Trade Candle"
                                        className="image"
                                        onClick={() => handleImageClick(candleImage.swing_trade_candle)}
                                    />
                                </TableCell>
                                <TableCell className="cell">
                                    <Button variant="contained" color="primary" onClick={() => handleViewClick(candleImage.id)}>
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

export default CandleImagesTable;
