import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AddTradeDetailsForm.css';

const EditTradeDetailsForm = ({ id, onClose }) => {
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

    // Fetch data for the selected trade detail on component mount
    useEffect(() => {
        const fetchTradeDetail = async () => {
            if (!id) return;  // Ensure there's an ID to fetch
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/tradedetails/tradedetails/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching trade detail:', error);
            }
        };

        fetchTradeDetail();
    }, [id]);

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

        // Append only the fields that are present and should be updated
        for (const key in formData) {
            if (formData[key]) {
                data.append(key, formData[key]);  // Append only valid File objects or values
            }
        }

        try {
            await axios.put(`http://127.0.0.1:8000/api/tradedetails/tradedetails/${id}/`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data', // this can be omitted as Axios sets it automatically
                    Authorization: `Bearer ${token}`,
                },
            });
            onClose();
        } catch (error) {
            console.error('Error updating trade detail:', error);

            if (error.response) {
                console.error('Response data:', error.response.data);
                if (error.response.status === 400) {
                    alert('Bad Request: ' + JSON.stringify(error.response.data));
                } else {
                    alert('An error occurred: ' + error.response.status);
                }
            } else if (error.request) {
                alert('No response received from the server.');
            } else {
                alert('Error: ' + error.message);
            }
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <form onSubmit={handleSubmit} className="trade-details-form">
                    <h2>Edit Trade Detail</h2>

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
                        {['idea_candle', 'line_graph_candle', 'signal_candle', 'hour_candle', 'two_hour_candle', 'entry_candle', 'breakeven_candle', 'take_profit_one_candle', 'take_profit_two_candle'].map((field) => (
                            <div className="form-group" key={field}>
                                <label>{field.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</label>
                                <input type="file" name={field} onChange={handleChange} />
                            </div>
                        ))}
                    </div>

                    <div className="form-buttons">
                        <button type="submit">Save Changes</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTradeDetailsForm;
