import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { 

  Card, Box, Typography, IconButton, Button, FormControl, 
  InputLabel, Select, MenuItem, TextField, Checkbox, 
  FormControlLabel, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import UploadFile from '@mui/icons-material/UploadFile';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import Grid from '@mui/material/Grid';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// styles
const FormWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

// =============================|| MGISTRATEGY IDEA ||============================= //

const MgiStrategy = () => {
  const [message, setMessage] = useState('');
  const [tradeSignal, setTradeSignal] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [candlePattern, setCandlePattern] = useState('');
  const [fibonacciLevel, setFibonacciLevel] = useState('');
  const [fiveMinOrderBlock, setFiveMinOrderBlock] = useState(false);
  const [flipFourHourCandle, setFlipFourHourCandle] = useState(false);
  const [fourHourBreakOfStructure, setFourHourBreakOfStructure] = useState(false);
  const [fiveMinBreakOfStructure, setFiveMinBreakOfStructure] = useState(false);
  const [currencyPair, setCurrencyPair] = useState('');
  const [session, setSession] = useState('');
  const [changeColorUTAlert, setChangeColorUTAlert] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);

    // Idea Candle
    const [ideaCandle, setIdeaCandle] = useState(null);
    const [ideaCandleUrl, setIdeaCandleUrl] = useState(null);
 
    //  Line Graph Candle
    const [lineGraphCandle, setLineGraphCandle] = useState(null);
    const [lineGraphCandleUrl, setLineGraphCandleUrl] = useState(null);
  
    // Signal Candle
    const [signalCandle, setSignalCandle] = useState(null);
    const [signalCandleUrl, setSignalCandleUrl] = useState(null);
  
  // Hour Candle
  const [hourCandle, setHourCandle] = useState(null);
  const [hourCandleUrl, setHourCandleUrl] = useState(null);

  // Two Hour Candle
  const [twoHourCandle, setTwoHourCandle] = useState(null);
  const [twoHourCandleUrl, setTwoHourCandleUrl] = useState(null);

  // Entry Candle
  const [entryCandle, setEntryCandle] = useState(null);
  const [entryCandleUrl, setEntryCandleUrl] = useState(null);

  // Breakeven Candle
  const [breakevenCandle, setBreakevenCandle] = useState(null);
  const [breakevenCandleUrl, setBreakevenCandleUrl] = useState(null);

  // Take Profit Candle
  const [takeProfitCandle, setTakeProfitCandle] = useState(null);
  const [takeProfitCandleUrl, setTakeProfitCandleUrl] = useState(null);

  const [mondayCandle, setMondayCandle] = useState(null);
  const [mondayCandleUrl, setMondayCandleUrl] = useState(null);

  const [tuesdayCandle, setTuesdayCandle] = useState(null);
  const [tuesdayCandleUrl, setTuesdayCandleUrl] = useState(null);

  const [wednesdayCandle, setWednesdayCandle] = useState(null);
  const [wednesdayCandleUrl, setWednesdayCandleUrl] = useState(null);

  const [thursdayCandle, setThursdayCandle] = useState(null);
  const [thursdayCandleUrl, setThursdayCandleUrl] = useState(null);

  const [fridayCandle, setFridayCandle] = useState(null);
  const [fridayCandleUrl, setFridayCandleUrl] = useState(null);

  const [saturdayCandle, setSaturdayCandle] = useState(null);
  const [saturdayCandleUrl, setSaturdayCandleUrl] = useState(null);

  const [sundayCandle, setSundayCandle] = useState(null);
  const [sundayCandleUrl, setSundayCandleUrl] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    
    // Append existing fields
    formData.append('user', user.id);
    formData.append('signal_candle', signalCandle || ''); // Handle optional file fields
    formData.append('hour_candle', hourCandle || '');
    formData.append('trade_signal', tradeSignal || '');
    formData.append('is_active', isActive || false);
    formData.append('candle_pattern', candlePattern || '');
    formData.append('fibonacci_level', fibonacciLevel || '');
    formData.append('session', session || '');
    formData.append('currency_pair', currencyPair || '');
    formData.append('five_min_order_block', fiveMinOrderBlock || false);
    formData.append('flip_four_hour_candle', flipFourHourCandle || false);
    formData.append('four_hour_break_of_structure', fourHourBreakOfStructure || false);
    formData.append('five_min_break_of_structure', fiveMinBreakOfStructure || false);
    formData.append('change_color_ut_alert', changeColorUTAlert || false);
  
    // Append additional image fields if they exist
    if (twoHourCandle) formData.append('two_hour_candle', twoHourCandle);
    if (entryCandle) formData.append('entry_candle', entryCandle);
    if (breakevenCandle) formData.append('breakeven_candle', breakevenCandle);
    if (takeProfitCandle) formData.append('take_profit_candle', takeProfitCandle);
   

    if (ideaCandle) formData.append('idea_candle', ideaCandle);
    if (lineGraphCandle) formData.append('line_graph_candle', lineGraphCandle);
  
  
    if (mondayCandle) formData.append('monday_candle', mondayCandle);
    if (tuesdayCandle) formData.append('tuesday_candle', tuesdayCandle);
    if (wednesdayCandle) formData.append('wednesday_candle', wednesdayCandle);
    if (thursdayCandle) formData.append('thursday_candle', thursdayCandle);
    if (fridayCandle) formData.append('friday_candle', fridayCandle);
    if (saturdayCandle) formData.append('saturday_candle', saturdayCandle);
    if (sundayCandle) formData.append('sunday_candle', sundayCandle);
  
    try {
      const response = await axios.post('http://localhost:8000/api/mgi/mgicandles/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      if (response.status === 201) {
        setMessage('MGI Strategy submitted successfully!');
        
        // Reset the form fields
        setSignalCandle(null);
        setHourCandle(null);
        setSignalCandleUrl(null);
        setHourCandleUrl(null);
        setTwoHourCandle(null);
        setEntryCandle(null);
        setBreakevenCandle(null);
        setTakeProfitCandle(null);
  
        setIdeaCandle(null);
        setLineGraphCandle(null);
        
        setMondayCandle(null);
        setTuesdayCandle(null);
        setWednesdayCandle(null);
        setThursdayCandle(null);
        setFridayCandle(null);
        setSaturdayCandle(null);
        setSundayCandle(null);
        
        
        setTradeSignal('');
        setIsActive(false);
        setCandlePattern('');
        setFibonacciLevel('');
        setSession('');
        setCurrencyPair('');
        setFiveMinOrderBlock(false);
        setFlipFourHourCandle(false);
        setFourHourBreakOfStructure(false);
        setFiveMinBreakOfStructure(false);
        setChangeColorUTAlert(false);
  
        // Add the submitted data to the state
        setSubmittedData(prevData => [
          ...prevData,
          {
            tradeSignal,
            isActive,
            candlePattern,
            fibonacciLevel,
            session,
            currencyPair,
            fiveMinOrderBlock,
            flipFourHourCandle,
            fourHourBreakOfStructure,
            fiveMinBreakOfStructure,
            changeColorUTAlert,
            signalCandleUrl,
            hourCandleUrl,
            twoHourCandle,     
            entryCandle,       
            breakevenCandle,   
            takeProfitCandle,

            ideaCandle,
            lineGraphCandle,  

            mondayCandle,
            tuesdayCandle,
            wednesdayCandle,
            thursdayCandle,
            fridayCandle,
            saturdayCandle,
            sundayCandle,
          }
        ]);
  
      } else {
        setMessage('Error submitting MGI Strategy. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting MGI Strategy:', error);
      setMessage(`Error submitting MGI Strategy: ${error.response?.data?.detail || error.message}`);
    }
  };
  
  const handleSignalCandleChange = (event) => {
    const file = event.target.files[0];
    setSignalCandle(file);
    setSignalCandleUrl(URL.createObjectURL(file));
  };

  const handleHourCandleChange = (event) => {
    const file = event.target.files[0];
    setHourCandle(file);
    setHourCandleUrl(URL.createObjectURL(file));
  };

  const handleTwoHourCandleChange = (event) => {
    const file = event.target.files[0];
    setTwoHourCandle(file);
    setTwoHourCandleUrl(URL.createObjectURL(file));
  };
  
  const handleEntryCandleChange = (event) => {
    const file = event.target.files[0];
    setEntryCandle(file);
    setEntryCandleUrl(URL.createObjectURL(file));
  };
  
  const handleBreakevenCandleChange = (event) => {
    const file = event.target.files[0];
    setBreakevenCandle(file);
    setBreakevenCandleUrl(URL.createObjectURL(file));
  };
  
  const handleTakeProfitCandleChange = (event) => {
    const file = event.target.files[0];
    setTakeProfitCandle(file);
    setTakeProfitCandleUrl(URL.createObjectURL(file));
  };

  const handleMondayCandleChange = (event) => {
    const file = event.target.files[0];
    setMondayCandle(file);
    setMondayCandleUrl(URL.createObjectURL(file)); // Assume you also create a state for the URL
  };
  
  const handleTuesdayCandleChange = (event) => {
    const file = event.target.files[0];
    setTuesdayCandle(file);
    setTuesdayCandleUrl(URL.createObjectURL(file)); // Assume you also create a state for the URL
  };
  
  const handleWednesdayCandleChange = (event) => {
    const file = event.target.files[0];
    setWednesdayCandle(file);
    setWednesdayCandleUrl(URL.createObjectURL(file)); // Assume you also create a state for the URL
  };
  
  const handleThursdayCandleChange = (event) => {
    const file = event.target.files[0];
    setThursdayCandle(file);
    setThursdayCandleUrl(URL.createObjectURL(file)); // Assume you also create a state for the URL
  };
  
  const handleFridayCandleChange = (event) => {
    const file = event.target.files[0];
    setFridayCandle(file);
    setFridayCandleUrl(URL.createObjectURL(file)); // Assume you also create a state for the URL
  };
  
  const handleSaturdayCandleChange = (event) => {
    const file = event.target.files[0];
    setSaturdayCandle(file);
    setSaturdayCandleUrl(URL.createObjectURL(file)); // Assume you also create a state for the URL
  };
  
  const handleSundayCandleChange = (event) => {
    const file = event.target.files[0];
    setSundayCandle(file);
    setSundayCandleUrl(URL.createObjectURL(file)); // Assume you also create a state for the URL
  };
  
  const handleIdeaCandleChange = (event) => {
    const file = event.target.files[0];
    setIdeaCandle(file);
    setIdeaCandleUrl(URL.createObjectURL(file)); // Assume you also create a state for the URL
  };
  
  const handleLineGraphCandleChange = (event) => {
    const file = event.target.files[0];
    setLineGraphCandle(file);
    setLineGraphCandleUrl(URL.createObjectURL(file)); // Assume you also create a state for the URL
  };
  
  
  useEffect(() => {
    return () => {
      // Revoke object URLs for all image fields
      if (signalCandleUrl) {
        URL.revokeObjectURL(signalCandleUrl);
      }
      if (hourCandleUrl) {
        URL.revokeObjectURL(hourCandleUrl);
      }
      if (twoHourCandleUrl) {
        URL.revokeObjectURL(twoHourCandleUrl);
      }
      if (entryCandleUrl) {
        URL.revokeObjectURL(entryCandleUrl);
      }
      if (breakevenCandleUrl) {
        URL.revokeObjectURL(breakevenCandleUrl);
      }
      if (takeProfitCandleUrl) {
        URL.revokeObjectURL(takeProfitCandleUrl);
      }
      // Revoke object URLs for new candle fields
      if (mondayCandleUrl) {
        URL.revokeObjectURL(mondayCandleUrl);
      }
      if (tuesdayCandleUrl) {
        URL.revokeObjectURL(tuesdayCandleUrl);
      }
      if (wednesdayCandleUrl) {
        URL.revokeObjectURL(wednesdayCandleUrl);
      }
      if (thursdayCandleUrl) {
        URL.revokeObjectURL(thursdayCandleUrl);
      }
      if (fridayCandleUrl) {
        URL.revokeObjectURL(fridayCandleUrl);
      }
      if (saturdayCandleUrl) {
        URL.revokeObjectURL(saturdayCandleUrl);
      }
      if (sundayCandleUrl) {
        URL.revokeObjectURL(sundayCandleUrl);
      }
      if (ideaCandleUrl) {
        URL.revokeObjectURL(ideaCandleUrl);
      }
      if (lineGraphCandleUrl) {
        URL.revokeObjectURL(lineGraphCandleUrl);
      }
    };
  }, [
    signalCandleUrl,
    hourCandleUrl,
    twoHourCandleUrl,
    entryCandleUrl,
    breakevenCandleUrl,
    takeProfitCandleUrl,
    mondayCandleUrl,
    tuesdayCandleUrl,
    wednesdayCandleUrl,
    thursdayCandleUrl,
    fridayCandleUrl,
    saturdayCandleUrl,
    sundayCandleUrl,
    ideaCandleUrl,
    lineGraphCandleUrl,
  ]);
  

  // Styled TableHead for customization
  const StyledTableHead = styled(TableHead)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main, // Use theme colors
    '& .MuiTableCell-root': {  // Style all cells within the header
      fontWeight: 'bold',
      border: '1px solid #ddd', // Add a border to each header cell
      color: theme.palette.text.primary, // Use theme text color
    }
  }));
  

  
  return (
    <MainCard
      title="MGI Strategy Trading"
    >
      <Card sx={{ overflow: 'hidden' }}>
        <FormWrapper>
        <Box sx={{ m: 9 }} component="form" onSubmit={handleSubmit}>
      {user && <p>Logged in as: {user.username}</p>}
      {message && <div className="alert alert-info">{message}</div>}

      <Box sx={{ mr: 4 }}>
        {/* Currency Pair Selector */}
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Currency Pair</InputLabel>
          <Select value={currencyPair} onChange={(e) => setCurrencyPair(e.target.value)}>
            <MenuItem value="AUDCAD">AUDCAD</MenuItem>
            <MenuItem value="AUDUSD">AUDUSD</MenuItem>
            <MenuItem value="AUDJPY">AUDNZD</MenuItem>
            <MenuItem value="AUDJPY">AUDJPY</MenuItem>
            <MenuItem value="BTCUSD">BTCUSD</MenuItem>
            <MenuItem value="CADJPY">CADJPY</MenuItem>
            <MenuItem value="CHFJPY">CHFJPY</MenuItem>
            <MenuItem value="EURAUD">EURAUD</MenuItem>
            <MenuItem value="EURCAD">EURCAD</MenuItem>
            <MenuItem value="EURUSD">EURUSD</MenuItem>
            <MenuItem value="EURCHF">EURCHF</MenuItem>
            <MenuItem value="EURNZD">EURNZD</MenuItem>
            <MenuItem value="EURJPY">EURJPY</MenuItem>
            <MenuItem value="EURCAD">EURCAD</MenuItem>
            <MenuItem value="GBPAUD">GBPAUD</MenuItem>
            <MenuItem value="GBPCAD">GBPCAD</MenuItem>
            <MenuItem value="GBPCHF">GBPCHF</MenuItem>
            <MenuItem value="GBPJPY">GBPJPY</MenuItem>
            <MenuItem value="GBPNZD">GBPNZD</MenuItem>
            <MenuItem value="GBPUSD">GBPUSD</MenuItem>
            <MenuItem value="NZDCAD">NZDCAD</MenuItem>
            <MenuItem value="NZDJPY">NZDJPY</MenuItem>
            <MenuItem value="NZDUSD">NZDUSD</MenuItem>
            <MenuItem value="USDCAD">USDCAD</MenuItem>
            <MenuItem value="USDCHF">USDCHF</MenuItem>
            <MenuItem value="USDJPY">USDJPY</MenuItem>
            <MenuItem value="USOIL">USOIL</MenuItem>
            <MenuItem value="XAGUSD">XAGUSD</MenuItem>
            <MenuItem value="XAUUSD">XAUUSD</MenuItem>
            <MenuItem value="JUMP75">JUMP75</MenuItem>
            <MenuItem value="Vix10">Vix10</MenuItem>

          </Select>
        </FormControl>

              <Box>
              <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
          {/* Idea Candle */}
          <Typography variant="subtitle1" sx={{ mb: 2, mt: 2 }}>
            Idea Candle
          </Typography>
          {ideaCandleUrl && (
            <img
              src={ideaCandleUrl}
              alt="Idea Candle"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: 4,
                border: '2px solid #ccc',
                objectFit: 'cover',
              }}
            />
          )}
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="idea-candle-input"
            type="file"
            onChange={handleIdeaCandleChange}
          />
          <label htmlFor="idea-candle-input">
            <IconButton color="primary" aria-label="upload idea candle" component="span">
              <UploadFile />
            </IconButton>
          </label>
        </Grid>

        <Grid item xs={12} sm={6}>
        {/* Line Graph Candle */}
        <Typography variant="subtitle1" sx={{ mb: 2, mt: 2 }}>
          Line Graph Candle
        </Typography>
        {lineGraphCandleUrl && (
          <img
            src={lineGraphCandleUrl}
            alt="Line Graph Candle"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: 4,
              border: '2px solid #ccc',
              objectFit: 'cover',
            }}
          />
        )}
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="line-graph-candle-input"
          type="file"
          onChange={handleLineGraphCandleChange}
        />
        <label htmlFor="line-graph-candle-input">
          <IconButton color="primary" aria-label="upload line graph candle" component="span">
            <UploadFile />
          </IconButton>
        </label>
        </Grid>

        <Grid item xs={12} sm={6}>

        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Signal Candle
        </Typography>
        {signalCandleUrl && (
          <img
            src={signalCandleUrl}
            alt="Signal Candle"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: 4,
              border: '2px solid #ccc',
              objectFit: 'cover',
            }}
          />
        )}
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="signal-candle-input"
          type="file"
          onChange={handleSignalCandleChange}
        />
        <label htmlFor="signal-candle-input">
          <IconButton color="primary" aria-label="upload signal candle" component="span">
            <UploadFile />
          </IconButton>
        </label>
</Grid>
<Grid item xs={12} sm={6}>

        <Typography variant="subtitle1" sx={{ mb: 2, mt: 2 }}>
          Hour Candle
        </Typography>
        {hourCandleUrl && (
          <img
            src={hourCandleUrl}
            alt="Hour Candle"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: 4,
              border: '2px solid #ccc',
              objectFit: 'cover',
            }}
          />
        )}
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="hour-candle-input"
          type="file"
          onChange={handleHourCandleChange}
        />
        <label htmlFor="hour-candle-input">
          <IconButton color="primary" aria-label="upload hour candle" component="span">
            <UploadFile />
          </IconButton>
        </label>
</Grid>
<Grid item xs={12} sm={6}>

        <Typography variant="subtitle1" sx={{ mb: 2, mt: 2 }}>
          Two Hour Candle
        </Typography>
        {twoHourCandleUrl && (
          <img
            src={twoHourCandleUrl}
            alt="Two Hour Candle"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: 4,
              border: '2px solid #ccc',
              objectFit: 'cover',
            }}
          />
        )}
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="two-hour-candle-input"
          type="file"
          onChange={handleTwoHourCandleChange}
        />
        <label htmlFor="two-hour-candle-input">
          <IconButton color="primary" aria-label="upload two hour candle" component="span">
            <UploadFile />
          </IconButton>
        </label>
</Grid>
<Grid item xs={12} sm={6}>

        <Typography variant="subtitle1" sx={{ mb: 2, mt: 2 }}>
          Entry Candle
        </Typography>
        {entryCandleUrl && (
          <img
            src={entryCandleUrl}
            alt="Entry Candle"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: 4,
              border: '2px solid #ccc',
              objectFit: 'cover',
            }}
          />
        )}
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="entry-candle-input"
          type="file"
          onChange={handleEntryCandleChange}
        />
        <label htmlFor="entry-candle-input">
          <IconButton color="primary" aria-label="upload entry candle" component="span">
            <UploadFile />
          </IconButton>
        </label>
</Grid>
<Grid item xs={12} sm={6}>

        <Typography variant="subtitle1" sx={{ mb: 2, mt: 2 }}>
          Breakeven Candle
        </Typography>
        {breakevenCandleUrl && (
          <img
            src={breakevenCandleUrl}
            alt="Breakeven Candle"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: 4,
              border: '2px solid #ccc',
              objectFit: 'cover',
            }}
          />
        )}
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="breakeven-candle-input"
          type="file"
          onChange={handleBreakevenCandleChange}
        />
        <label htmlFor="breakeven-candle-input">
          <IconButton color="primary" aria-label="upload breakeven candle" component="span">
            <UploadFile />
          </IconButton>
        </label>
</Grid>
<Grid item xs={12} sm={6}>

        <Typography variant="subtitle1" sx={{ mb: 2, mt: 2 }}>
          Take Profit Candle
        </Typography>
        {takeProfitCandleUrl && (
          <img
            src={takeProfitCandleUrl}
            alt="Take Profit Candle"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: 4,
              border: '2px solid #ccc',
              objectFit: 'cover',
            }}
          />
        )}
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="take-profit-candle-input"
          type="file"
          onChange={handleTakeProfitCandleChange}
        />
        <label htmlFor="take-profit-candle-input">
          <IconButton color="primary" aria-label="upload take profit candle" component="span">
            <UploadFile />
          </IconButton>
        </label>

</Grid>
<Grid item xs={12} sm={6}>

        {/* Monday Candle */}
<Typography variant="subtitle1" sx={{ mb: 2, mt: 2 }}>
  Monday Candle
</Typography>
{mondayCandleUrl && (
  <img
    src={mondayCandleUrl}
    alt="Monday Candle"
    style={{
      width: '100%',
      height: 'auto',
      display: 'block',
      borderRadius: 4,
      border: '2px solid #ccc',
      objectFit: 'cover',
    }}
  />
)}
<input
  accept="image/*"
  style={{ display: 'none' }}
  id="monday-candle-input"
  type="file"
  onChange={handleMondayCandleChange}
/>
<label htmlFor="monday-candle-input">
  <IconButton color="primary" aria-label="upload monday candle" component="span">
    <UploadFile />
  </IconButton>

</label>

</Grid>
<Grid item xs={12} sm={6}>

{/* Tuesday Candle */}
<Typography variant="subtitle1" sx={{ mb: 2, mt: 2 }}>
  Tuesday Candle
</Typography>
{tuesdayCandleUrl && (
  <img
    src={tuesdayCandleUrl}
    alt="Tuesday Candle"
    style={{
      width: '100%',
      height: 'auto',
      display: 'block',
      borderRadius: 4,
      border: '2px solid #ccc',
      objectFit: 'cover',
    }}
  />
)}
<input
  accept="image/*"
  style={{ display: 'none' }}
  id="tuesday-candle-input"
  type="file"
  onChange={handleTuesdayCandleChange}
/>
<label htmlFor="tuesday-candle-input">
  <IconButton color="primary" aria-label="upload tuesday candle" component="span">
    <UploadFile />
  </IconButton>
</label>
</Grid>
<Grid item xs={12} sm={6}>

{/* Wednesday Candle */}
<Typography variant="subtitle1" sx={{ mb: 2, mt: 2 }}>
  Wednesday Candle
</Typography>
{wednesdayCandleUrl && (
  <img
    src={wednesdayCandleUrl}
    alt="Wednesday Candle"
    style={{
      width: '100%',
      height: 'auto',
      display: 'block',
      borderRadius: 4,
      border: '2px solid #ccc',
      objectFit: 'cover',
    }}
  />
)}
<input
  accept="image/*"
  style={{ display: 'none' }}
  id="wednesday-candle-input"
  type="file"
  onChange={handleWednesdayCandleChange}
/>
<label htmlFor="wednesday-candle-input">
  <IconButton color="primary" aria-label="upload wednesday candle" component="span">
    <UploadFile />
  </IconButton>
</label>
</Grid>
<Grid item xs={12} sm={6}>

{/* Thursday Candle */}
<Typography variant="subtitle1" sx={{ mb: 2, mt: 2 }}>
  Thursday Candle
</Typography>
{thursdayCandleUrl && (
  <img
    src={thursdayCandleUrl}
    alt="Thursday Candle"
    style={{
      width: '100%',
      height: 'auto',
      display: 'block',
      borderRadius: 4,
      border: '2px solid #ccc',
      objectFit: 'cover',
    }}
  />
)}
<input
  accept="image/*"
  style={{ display: 'none' }}
  id="thursday-candle-input"
  type="file"
  onChange={handleThursdayCandleChange}
/>
<label htmlFor="thursday-candle-input">
  <IconButton color="primary" aria-label="upload thursday candle" component="span">
    <UploadFile />
  </IconButton>
</label>
</Grid>
<Grid item xs={12} sm={6}>

{/* Friday Candle */}
<Typography variant="subtitle1" sx={{ mb: 2, mt: 2 }}>
  Friday Candle
</Typography>
{fridayCandleUrl && (
  <img
    src={fridayCandleUrl}
    alt="Friday Candle"
    style={{
      width: '100%',
      height: 'auto',
      display: 'block',
      borderRadius: 4,
      border: '2px solid #ccc',
      objectFit: 'cover',
    }}
  />
)}
<input
  accept="image/*"
  style={{ display: 'none' }}
  id="friday-candle-input"
  type="file"
  onChange={handleFridayCandleChange}
/>
<label htmlFor="friday-candle-input">
  <IconButton color="primary" aria-label="upload friday candle" component="span">
    <UploadFile />
  </IconButton>
</label>
</Grid>
<Grid item xs={12} sm={6}>

{/* Saturday Candle */}
<Typography variant="subtitle1" sx={{ mb: 2, mt: 2 }}>
  Saturday Candle
</Typography>
{saturdayCandleUrl && (
  <img
    src={saturdayCandleUrl}
    alt="Saturday Candle"
    style={{
      width: '100%',
      height: 'auto',
      display: 'block',
      borderRadius: 4,
      border: '2px solid #ccc',
      objectFit: 'cover',
    }}
  />
)}
<input
  accept="image/*"
  style={{ display: 'none' }}
  id="saturday-candle-input"
  type="file"
  onChange={handleSaturdayCandleChange}
/>
<label htmlFor="saturday-candle-input">
  <IconButton color="primary" aria-label="upload saturday candle" component="span">
    <UploadFile />
  </IconButton>
</label>
</Grid>
<Grid item xs={12} sm={6}>

{/* Sunday Candle */}
<Typography variant="subtitle1" sx={{ mb: 2, mt: 2 }}>
  Sunday Candle
</Typography>
{sundayCandleUrl && (
  <img
    src={sundayCandleUrl}
    alt="Sunday Candle"
    style={{
      width: '100%',
      height: 'auto',
      display: 'block',
      borderRadius: 4,
      border: '2px solid #ccc',
      objectFit: 'cover',
    }}
  />
)}
<input
  accept="image/*"
  style={{ display: 'none' }}
  id="sunday-candle-input"
  type="file"
  onChange={handleSundayCandleChange}
/>
<label htmlFor="sunday-candle-input">
  <IconButton color="primary" aria-label="upload sunday candle" component="span">
    <UploadFile />
  </IconButton>
</label>
</Grid>
</Grid>
      </Box>

      </Box>

      <Box sx={{ mt: 4 }}>
      <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Trade Signal</InputLabel>
          <Select value={tradeSignal} onChange={(e) => setTradeSignal(e.target.value)}>
            <MenuItem value="buy">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ArrowUpward color="primary" fontSize="small" />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Buy
                </Typography>
              </Box>
            </MenuItem>
            <MenuItem value="sell">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ArrowDownward color="error" fontSize="small" />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Sell
                </Typography>
              </Box>
            </MenuItem>
          </Select>
        </FormControl>


        
      <TextField
          id="candle-pattern"
          select
          label="1 Hour Candle Pattern"
          fullWidth
          variant="outlined"
          value={candlePattern}
          onChange={(event) => setCandlePattern(event.target.value)}
          margin="normal"
        >
          {['Engulfing', 'Small Body', 'Pinbar'].map((pattern) => (
            <MenuItem key={pattern} value={pattern}>
              {pattern.charAt(0).toUpperCase() + pattern.slice(1) + ' Candle'}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="fibonacci-level"
          select
          label="Fibonacci Level"
          fullWidth
          variant="outlined"
          value={fibonacciLevel}
          onChange={(event) => setFibonacciLevel(event.target.value)}
          margin="normal"
        >
          {['38.2%', '50%', '61.8%', '78.6%'].map((level) => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          ))}
        </TextField>

        {/* Trading Session Selector */}
        <TextField
          id="session"
          select
          label="Trading Session"
          fullWidth
          variant="outlined"
          value={session}
          onChange={(event) => setSession(event.target.value)}
          margin="normal"
        >
          {['London', 'Newyork'].map((session) => (
            <MenuItem key={session} value={session}>
              {session.charAt(0).toUpperCase() + session.slice(1)} Session
            </MenuItem>
          ))}
        </TextField>

        {/* 5 Min Order Block */}
        <FormControlLabel
          control={
            <Checkbox
              checked={fiveMinOrderBlock}
              onChange={(e) => setFiveMinOrderBlock(e.target.checked)}
            />
          }
          label="5 Min Order Block"
          sx={{ mb: 2 }}
        />

        {/* Flip 4-Hour Candle */}
        <FormControlLabel
          control={
            <Checkbox
              checked={flipFourHourCandle}
              onChange={(e) => setFlipFourHourCandle(e.target.checked)}
            />
          }
          label="Flip 4-Hour Candle"
          sx={{ mb: 2 }}
        />

        {/* 4-Hour Break of Structure */}
        <FormControlLabel
          control={
            <Checkbox
              checked={fourHourBreakOfStructure}
              onChange={(e) => setFourHourBreakOfStructure(e.target.checked)}
            />
          }
          label="4-Hour Break of Structure"
          sx={{ mb: 2 }}
        />

        {/* 5 Min Break of Structure */}
        <FormControlLabel
          control={
            <Checkbox
              checked={fiveMinBreakOfStructure}
              onChange={(e) => setFiveMinBreakOfStructure(e.target.checked)}
            />
          }
          label="5 Min Break of Structure"
          sx={{ mb: 2 }}
        />

        {/* Change Color UT Alert */}
        <FormControlLabel
          control={
            <Checkbox
              checked={changeColorUTAlert}
              onChange={(e) => setChangeColorUTAlert(e.target.checked)}
            />
          }
          label="Change Color UT Alert"
          sx={{ mb: 2 }}
        />

         {/* Is Active */}
         <FormControlLabel
          control={
            <Checkbox
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          }
          label="Active"
          sx={{ mb: 2 }}
        />

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit MGI Strategy
        </Button>
      </Box>
    </Box>
          {submittedData.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">Submitted Data</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <StyledTableHead>
                    <TableRow>
                      <TableCell>Trade Signal</TableCell>
                      <TableCell>Active</TableCell>
                      <TableCell>Candle Pattern</TableCell>
                      <TableCell>Fibonacci Level</TableCell>
                      <TableCell>Session</TableCell>
                      <TableCell>Currency Pair</TableCell>
                      <TableCell>5 Min Order Block</TableCell>
                      <TableCell>Flip 4-Hour Candle</TableCell>
                      <TableCell>4-Hour Break of Structure</TableCell>
                      <TableCell>5 Min Break of Structure</TableCell>
                      <TableCell>Change Color UT Alert</TableCell>
                      <TableCell>Signal Candle</TableCell>
                      <TableCell>Hour Candle</TableCell>
                      <TableCell>Two Hour Candle</TableCell>
                      <TableCell>Entry Candle</TableCell>
                      <TableCell>Breakeven Candle</TableCell>
                      <TableCell>Take Profit Candle</TableCell>
                    </TableRow>
                  </StyledTableHead>
                  <TableBody>
                    {submittedData.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell>{data.tradeSignal}</TableCell>
                        <TableCell>{data.isActive ? 'Yes' : 'No'}</TableCell>
                        <TableCell>{data.candlePattern}</TableCell>
                        <TableCell>{data.fibonacciLevel}</TableCell>
                        <TableCell>{data.session}</TableCell>
                        <TableCell>{data.currencyPair}</TableCell>
                        <TableCell>{data.fiveMinOrderBlock ? 'Yes' : 'No'}</TableCell>
                        <TableCell>{data.flipFourHourCandle ? 'Yes' : 'No'}</TableCell>
                        <TableCell>{data.fourHourBreakOfStructure ? 'Yes' : 'No'}</TableCell>
                        <TableCell>{data.fiveMinBreakOfStructure ? 'Yes' : 'No'}</TableCell>
                        <TableCell>{data.changeColorUTAlert ? 'Yes' : 'No'}</TableCell>
                        <TableCell>
                        {data.signalCandleUrl ? (
                          <img src={data.signalCandleUrl} alt="Signal Candle" style={{ width: '100px', height: 'auto' }} />
                        ) : (
                          'No Image'
                        )}
                      </TableCell>
                      <TableCell>
                        {data.hourCandleUrl ? (
                          <img src={data.hourCandleUrl} alt="Hour Candle" style={{ width: '100px', height: 'auto' }} />
                        ) : (
                          'No Image'
                        )}
                      </TableCell>
                      <TableCell>
                        {data.two_hour_candle ? (
                          <img src={data.two_hour_candle} alt="Two Hour Candle" style={{ width: '100px', height: 'auto' }} />
                        ) : (
                          'No Image'
                        )}
                      </TableCell>
                      <TableCell>
                        {data.entry_candle ? (
                          <img src={data.entry_candle} alt="Entry Candle" style={{ width: '100px', height: 'auto' }} />
                        ) : (
                          'No Image'
                        )}
                      </TableCell>
                      <TableCell>
                        {data.breakeven_candle ? (
                          <img src={data.breakeven_candle} alt="Breakeven Candle" style={{ width: '100px', height: 'auto' }} />
                        ) : (
                          'No Image'
                        )}
                      </TableCell>
                      <TableCell>
                        {data.take_profit_candle ? (
                          <img src={data.take_profit_candle} alt="Take Profit Candle" style={{ width: '100px', height: 'auto' }} />
                        ) : (
                          'No Image'
                        )}
                      </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </FormWrapper>
      </Card>
    </MainCard>
  );
};

export default MgiStrategy;
