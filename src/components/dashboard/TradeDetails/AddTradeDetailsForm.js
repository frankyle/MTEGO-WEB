// AddTradeDetailsForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddTradeDetailsForm = ({ onClose }) => {
    const [newTradeData, setNewTradeData] = useState({
        user: '', // Assuming you'll handle user ID separately
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

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setNewTradeData({ ...newTradeData, [name]: files[0] });
        } else {
            setNewTradeData({ ...newTradeData, [name]: value });
        }
    };

    const handleAdd = async () => {
        const formData = new FormData();
        for (const key in newTradeData) {
            formData.append(key, newTradeData[key]);
        }

        try {
            await axios.post('http://127.0.0.1:8000/api/tradedetails/tradedetails/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onClose();
        } catch (error) {
            console.error("Error adding new trade:", error);
        }
    };

    return (
        <div>
            <h2>Add New Trade</h2>
            <input
                type="text"
                name="currency_pair"
                value={newTradeData.currency_pair}
                onChange={handleInputChange}
                placeholder="Currency Pair"
            />
            <select
                name="trade_signal"
                value={newTradeData.trade_signal}
                onChange={handleInputChange}
            >
                <option value="">Select Trade Signal</option>
                <option value="BUYS">BUYS</option>
                <option value="SELLS">SELLS</option>
            </select>
            <label>
                <input
                    type="checkbox"
                    name="is_active"
                    checked={newTradeData.is_active}
                    onChange={(e) => setNewTradeData({ ...newTradeData, is_active: e.target.checked })}
                />
                Is Active
            </label>
            <input
                type="file"
                name="idea_candle"
                onChange={handleInputChange}
                placeholder="Idea Candle"
            />
            <input
                type="file"
                name="line_graph_candle"
                onChange={handleInputChange}
                placeholder="Line Graph Candle"
            />
            <input
                type="file"
                name="signal_candle"
                onChange={handleInputChange}
                placeholder="Signal Candle"
            />
            <input
                type="file"
                name="hour_candle"
                onChange={handleInputChange}
                placeholder="Hour Candle"
            />
            <input
                type="file"
                name="two_hour_candle"
                onChange={handleInputChange}
                placeholder="Two Hour Candle"
            />
            <input
                type="file"
                name="entry_candle"
                onChange={handleInputChange}
                placeholder="Entry Candle"
            />
            <input
                type="file"
                name="breakeven_candle"
                onChange={handleInputChange}
                placeholder="Breakeven Candle"
            />
            <input
                type="file"
                name="take_profit_one_candle"
                onChange={handleInputChange}
                placeholder="Take Profit One Candle"
            />
            <input
                type="file"
                name="take_profit_two_candle"
                onChange={handleInputChange}
                placeholder="Take Profit Two Candle"
            />
            <button onClick={handleAdd}>Add</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default AddTradeDetailsForm;
