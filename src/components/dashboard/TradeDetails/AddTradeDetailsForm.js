import React, { useState } from 'react';
import axios from 'axios';
import './AddTradeDetailsForm.css';

const AddTradeDetailsForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        currency_pair: '',
        trade_signal: '',
        is_active: false,
        idea_candle: null,
        line_graph_candle: null,
        signal_candle: null,
        hour_candle: null,
        two_hour_candle: null,
        entry_candle: null,
        breakeven_candle: null,
        take_profit_one_candle: null,
        take_profit_two_candle: null,
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
        } else if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const data = new FormData();

        for (const key in formData) {
            if (formData[key]) {
                data.append(key, formData[key]);
            }
        }

        try {
            await axios.post('http://127.0.0.1:8000/api/tradedetails/tradedetails/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            onClose();
        } catch (error) {
            console.error('Error adding new trade detail:', error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <form onSubmit={handleSubmit} className="trade-details-form">
                    <h2>Add Trade Detail</h2>
                    
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Currency Pair</label>
                            <input
                                type="text"
                                name="currency_pair"
                                value={formData.currency_pair}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Trade Signal</label>
                            <select name="trade_signal" value={formData.trade_signal} onChange={handleChange}>
                                <option value="">Select Signal</option>
                                <option value="BUYS">BUYS</option>
                                <option value="SELLS">SELLS</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Active</label>
                            <input
                                type="checkbox"
                                name="is_active"
                                checked={formData.is_active}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Image fields */}
                        <div className="form-group">
                            <label>Idea Candle</label>
                            <input type="file" name="idea_candle" onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Line Graph Candle</label>
                            <input type="file" name="line_graph_candle" onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Signal Candle</label>
                            <input type="file" name="signal_candle" onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Hour Candle</label>
                            <input type="file" name="hour_candle" onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Two Hour Candle</label>
                            <input type="file" name="two_hour_candle" onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Entry Candle</label>
                            <input type="file" name="entry_candle" onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Breakeven Candle</label>
                            <input type="file" name="breakeven_candle" onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Take Profit 1</label>
                            <input type="file" name="take_profit_one_candle" onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Take Profit 2</label>
                            <input type="file" name="take_profit_two_candle" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-buttons">
                        <button type="submit">Save Trade Detail</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTradeDetailsForm;
