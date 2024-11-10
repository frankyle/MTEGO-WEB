import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Button, Modal, IconButton, Grid, Card, CardContent, CardMedia } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'react-router-dom';

const CandleImageDetail = () => {
    const { id } = useParams();  // Get the ID from the URL
    const [candleImage, setCandleImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const fetchCandleImage = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://127.0.0.1:8000/api/candleimages/candleimages/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCandleImage(response.data);
            } catch (error) {
                console.error("Error fetching candle image:", error);
            }
        };

        fetchCandleImage();
    }, [id]);

    const handleImageClick = (imageSrc) => {
        setSelectedImage(imageSrc);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedImage(null);
    };

    if (!candleImage) {
        return <Typography variant="h6" align="center">Loading...</Typography>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" align="center" style={{ marginBottom: '20px' }}>
                Candle Image Details
            </Typography>
            <Typography variant="h6" align="center" style={{ marginBottom: '20px' }}>
                Currency Pair: {candleImage.currency_pair || '-'}
            </Typography>

            <Grid container spacing={2} justifyContent="center">
                {/* Mapping through the images */}
                {[
                    { label: 'Monday', image: candleImage.monday_candle },
                    { label: 'Tuesday', image: candleImage.tuesday_candle },
                    { label: 'Wednesday', image: candleImage.wednesday_candle },
                    { label: 'Thursday', image: candleImage.thursday_candle },
                    { label: 'Friday', image: candleImage.friday_candle },
                    { label: 'Saturday', image: candleImage.saturday_candle },
                    { label: 'Sunday', image: candleImage.sunday_candle },
                    { label: 'Swing Trade', image: candleImage.swing_trade_candle },
                ].map((candle, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardMedia
                                component="img"
                                alt={`${candle.label} Candle`}
                                height="200"
                                image={candle.image}
                                title={`${candle.label} Candle`}
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleImageClick(candle.image)}
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" align="center">
                                    {candle.label} Candle
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                onClick={() => window.history.back()}  // Go back to the previous page
            >
                Back to List
            </Button>

            <Modal open={openModal} onClose={handleCloseModal}>
                <div
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
                        onClick={handleCloseModal}
                        style={{ position: 'absolute', top: '10px', right: '10px' }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <img
                        src={selectedImage}
                        alt="Selected"
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '8px',
                            objectFit: 'contain',
                        }}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default CandleImageDetail;
