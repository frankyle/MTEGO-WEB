import React, { useState } from 'react';
import axios from 'axios';

const AddTradingIndicator = ({ onClose }) => {
    const [currencyPair, setCurrencyPair] = useState('');
    const [candlePattern, setCandlePattern] = useState('');
    const [fibonacciLevel, setFibonacciLevel] = useState('');
    const [session, setSession] = useState('');
    const [fiveMinOrderBlock, setFiveMinOrderBlock] = useState(false);
    const [previousDayColorStructure, setPreviousDayColorStructure] = useState(false);
    const [asianKillZone, setAsianKillZone] = useState(false);
    const [londonKillZone, setLondonKillZone] = useState(false);
    const [newyorkKillZone, setNewyorkKillZone] = useState(false);
    const [flipFourHourCandle, setFlipFourHourCandle] = useState(false);
    const [fifteenMinBreakOfStructure, setFifteenMinBreakOfStructure] = useState(false);
    const [fvgBlocks, setFvgBlocks] = useState(false);
    const [changeColorUtAlert, setChangeColorUtAlert] = useState(false);
    const [flactialAndAlligator, setFlactialAndAlligator] = useState(false);
    const [pipsStopLost, setPipsStopLost] = useState(0);
    const [pipsGained, setPipsGained] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://127.0.0.1:8000/api/tradingindicators/tradingindicators/', {
                currency_pair: currencyPair,
                candle_pattern: candlePattern,
                fibonacci_level: fibonacciLevel,
                session: session,
                five_min_order_block: fiveMinOrderBlock,
                previous_day_color_structure: previousDayColorStructure,
                asian_kill_zone: asianKillZone,
                london_kill_zone: londonKillZone,
                newyork_kill_zone: newyorkKillZone,
                flip_four_hour_candle: flipFourHourCandle,
                fifteen_min_break_of_structure: fifteenMinBreakOfStructure,
                fvg_blocks: fvgBlocks,
                change_color_ut_alert: changeColorUtAlert,
                flactial_and_alligator: flactialAndAlligator,
                pips_stoplost: pipsStopLost,
                pips_gained: pipsGained,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Trading indicator added:", response.data);
            onClose(); // Close the form after submission
            // Optionally refresh the data in the parent component
        } catch (error) {
            console.error("Error adding trading indicator:", error);
        }
    };

    return (
        <div style={styles.formContainer}>
            <h2 style={styles.formHeading}>Add New Trading Indicator</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Currency Pair" 
                    value={currencyPair}
                    onChange={(e) => setCurrencyPair(e.target.value)}
                    required
                    style={styles.input}
                />
                <input 
                    type="text" 
                    placeholder="Candle Pattern" 
                    value={candlePattern}
                    onChange={(e) => setCandlePattern(e.target.value)}
                    required
                    style={styles.input}
                />
                <input 
                    type="text" 
                    placeholder="Fibonacci Level" 
                    value={fibonacciLevel}
                    onChange={(e) => setFibonacciLevel(e.target.value)}
                    required
                    style={styles.input}
                />
                <input 
                    type="text" 
                    placeholder="Session" 
                    value={session}
                    onChange={(e) => setSession(e.target.value)}
                    required
                    style={styles.input}
                />
                <label>
                    5 Min Order Block
                    <input 
                        type="checkbox" 
                        checked={fiveMinOrderBlock}
                        onChange={() => setFiveMinOrderBlock(!fiveMinOrderBlock)}
                    />
                </label>
                <label>
                    Previous Day Color Structure
                    <input 
                        type="checkbox" 
                        checked={previousDayColorStructure}
                        onChange={() => setPreviousDayColorStructure(!previousDayColorStructure)}
                    />
                </label>
                <label>
                    Asian Kill Zone
                    <input 
                        type="checkbox" 
                        checked={asianKillZone}
                        onChange={() => setAsianKillZone(!asianKillZone)}
                    />
                </label>
                <label>
                    London Kill Zone
                    <input 
                        type="checkbox" 
                        checked={londonKillZone}
                        onChange={() => setLondonKillZone(!londonKillZone)}
                    />
                </label>
                <label>
                    New York Kill Zone
                    <input 
                        type="checkbox" 
                        checked={newyorkKillZone}
                        onChange={() => setNewyorkKillZone(!newyorkKillZone)}
                    />
                </label>
                <label>
                    Flip Four Hour Candle
                    <input 
                        type="checkbox" 
                        checked={flipFourHourCandle}
                        onChange={() => setFlipFourHourCandle(!flipFourHourCandle)}
                    />
                </label>
                <label>
                    15 Min Break of Structure
                    <input 
                        type="checkbox" 
                        checked={fifteenMinBreakOfStructure}
                        onChange={() => setFifteenMinBreakOfStructure(!fifteenMinBreakOfStructure)}
                    />
                </label>
                <label>
                    FVG Blocks
                    <input 
                        type="checkbox" 
                        checked={fvgBlocks}
                        onChange={() => setFvgBlocks(!fvgBlocks)}
                    />
                </label>
                <label>
                    Change Color UT Alert
                    <input 
                        type="checkbox" 
                        checked={changeColorUtAlert}
                        onChange={() => setChangeColorUtAlert(!changeColorUtAlert)}
                    />
                </label>
                <label>
                    Flactial and Alligator
                    <input 
                        type="checkbox" 
                        checked={flactialAndAlligator}
                        onChange={() => setFlactialAndAlligator(!flactialAndAlligator)}
                    />
                </label>
                <input 
                    type="number" 
                    placeholder="Pips Stop Loss" 
                    value={pipsStopLost}
                    onChange={(e) => setPipsStopLost(e.target.value)}
                    required
                    style={styles.input}
                />
                <input 
                    type="number" 
                    placeholder="Pips Gained" 
                    value={pipsGained}
                    onChange={(e) => setPipsGained(e.target.value)}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.submitButton}>Add Trading Indicator</button>
                <button type="button" onClick={onClose} style={styles.cancelButton}>Cancel</button>
            </form>
        </div>
    );
};

// CSS-in-JS styling
const styles = {
    formContainer: {
        width: '300px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    formHeading: {
        marginBottom: '15px',
        fontSize: '20px',
        textAlign: 'center',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '10px',
        cursor: 'pointer',
        width: '48%',
    },
    cancelButton: {
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '10px',
        cursor: 'pointer',
        width: '48%',
        marginLeft: '4%',
    },
};

export default AddTradingIndicator;
