import React, { useState, useEffect } from 'react';
import useAxios from '../../../../routes/useAxios';
import { 
  Box, Typography, IconButton, Button, FormControl, 
  InputLabel, Select, MenuItem, TextField, Checkbox, 
  FormControlLabel, Modal, Paper, Grid 
} from '@mui/material';
import UploadFile from '@mui/icons-material/UploadFile';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';

const MgiStrategyEditForm = ({ open, onClose, candleToEdit, fetchCandles }) => {
  const api = useAxios();
  const [candle, setCandle] = useState({
    signal_candle: null,
    hour_candle: null,
    two_hour_candle: null,
    entry_candle: null,
    breakeven_candle: null,
    take_profit_candle: null,

    idea_candle: null,
    line_graph_candle: null,
    monday_candle: null,
    tuesday_candle: null,
    wednesday_candle: null,
    thursday_candle: null,
    friday_candle: null,
    saturday_candle: null,
    sunday_candle: null,


    trade_signal: '',
    is_active: false,
    candle_pattern: '',
    fibonacci_level: '',
    five_min_order_block: false,
    flip_four_hour_candle: false,
    four_hour_break_of_structure: false,
    five_min_break_of_structure: false,
    currency_pair: '',
    session: '',
    change_color_ut_alert: false,
  });
  const [signalCandleUrl, setSignalCandleUrl] = useState(null);
  const [hourCandleUrl, setHourCandleUrl] = useState(null);
  const [twoHourCandleUrl, setTwoHourCandleUrl] = useState(null);
  const [entryCandleUrl, setEntryCandleUrl] = useState(null);
  const [breakevenCandleUrl, setBreakevenCandleUrl] = useState(null);
  const [takeProfitCandleUrl, setTakeProfitCandleUrl] = useState(null);
 

  const [ideaCandleUrl, setIdeaCandleUrl] = useState(null);
  const [lineGraphCandleUrl, setLineGraphCandleUrl] = useState(null);

  const [mondayCandleUrl, setMondayCandleUrl] = useState(null);
  const [tuesdayCandleUrl, setTuesdayCandleUrl] = useState(null);
  const [wednesdayCandleUrl, setWednesdayCandleUrl] = useState(null);
  const [thursdayCandleUrl, setThursdayCandleUrl] = useState(null);
  const [fridayCandleUrl, setFridayCandleUrl] = useState(null);
  const [saturdayCandleUrl, setSaturdayCandleUrl] = useState(null);
  const [sundayCandleUrl, setSundayCandleUrl] = useState(null);

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (candleToEdit) {
      setCandle(candleToEdit);
      setSignalCandleUrl(candleToEdit.signal_candle);
      setHourCandleUrl(candleToEdit.hour_candle);
      setTwoHourCandleUrl(candleToEdit.two_hour_candle);
      setEntryCandleUrl(candleToEdit.entry_candle);
      setBreakevenCandleUrl(candleToEdit.breakeven_candle);
      setTakeProfitCandleUrl(candleToEdit.take_profit_candle);

      // Filling the additional constants
    setIdeaCandleUrl(candleToEdit.idea_candle);
    setLineGraphCandleUrl(candleToEdit.line_graph_candle);
    
    setMondayCandleUrl(candleToEdit.monday_candle);
    setTuesdayCandleUrl(candleToEdit.tuesday_candle);
    setWednesdayCandleUrl(candleToEdit.wednesday_candle);
    setThursdayCandleUrl(candleToEdit.thursday_candle);
    setFridayCandleUrl(candleToEdit.friday_candle);
    setSaturdayCandleUrl(candleToEdit.saturday_candle);
    setSundayCandleUrl(candleToEdit.sunday_candle);
    }
  }, [candleToEdit]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCandle({
      ...candle,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setCandle({
      ...candle,
      [name]: files[0],
    });
    const url = URL.createObjectURL(files[0]);
    switch (name) {
      case 'signal_candle':
        setSignalCandleUrl(url);
        break;
      case 'hour_candle':
        setHourCandleUrl(url);
        break;
      case 'two_hour_candle':
        setTwoHourCandleUrl(url);
        break;
      case 'entry_candle':
        setEntryCandleUrl(url);
        break;
      case 'breakeven_candle':
        setBreakevenCandleUrl(url);
        break;
      case 'take_profit_candle':
        setTakeProfitCandleUrl(url);
        break;
      
      // New cases
      case 'idea_candle':
        setIdeaCandleUrl(url);
        break;
      case 'line_graph_candle':
        setLineGraphCandleUrl(url);
        break;
      
      case 'monday_candle':
        setMondayCandleUrl(url);
        break;
      case 'tuesday_candle':
        setTuesdayCandleUrl(url);
        break;
      case 'wednesday_candle':
        setWednesdayCandleUrl(url);
        break;
      case 'thursday_candle':
        setThursdayCandleUrl(url);
        break;
      case 'friday_candle':
        setFridayCandleUrl(url);
        break;
      case 'saturday_candle':
        setSaturdayCandleUrl(url);
        break;
      case 'sunday_candle':
        setSundayCandleUrl(url);
        break;
    
      default:
        break;
    }
    
  };


  const validateForm = () => {
    if (!candle.trade_signal || !candle.currency_pair) {
      setMessage('Trade Signal and Currency Pair are required fields.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();

  // Append non-file fields to formData
Object.keys(candle).forEach(key => {
  // Skip file fields when appending non-file fields
  if (![
    'signal_candle', 'hour_candle', 'two_hour_candle', 'entry_candle', 
    'breakeven_candle', 'take_profit_candle', 'idea_candle', 'line_graph_candle', 
    'monday_candle', 'tuesday_candle', 'wednesday_candle', 'thursday_candle', 
    'friday_candle', 'saturday_candle', 'sunday_candle'
  ].includes(key)) {
    formData.append(key, candle[key]);
  }
});

// Append file fields only if they are updated
const fileFields = [
  'signal_candle', 'hour_candle', 'two_hour_candle', 'entry_candle', 
  'breakeven_candle', 'take_profit_candle', 'idea_candle', 'line_graph_candle', 
  'monday_candle', 'tuesday_candle', 'wednesday_candle', 'thursday_candle', 
  'friday_candle', 'saturday_candle', 'sunday_candle'
];
fileFields.forEach(field => {
  if (candle[field] instanceof File) {
    formData.append(field, candle[field]);
  }
});


      try {
        const response = await api.put(`/mgi/mgicandles/${candle.id}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log('Response:', response);
        setMessage('MGI Strategy updated successfully!');
        fetchCandles();
        onClose();
      } catch (error) {
        console.error('Error saving MGI Strategy:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          setMessage(`Error saving MGI Strategy: ${JSON.stringify(error.response.data)}`);
        } else {
          setMessage('Error saving MGI Strategy.');
        }
      }
    };

    
  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={{ width: '80%', margin: '50px auto', padding: 2, backgroundColor: 'white', borderRadius: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Edit MGI Strategy</Typography>
          <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
        {message && <Typography color={message.includes('successfully') ? 'primary' : 'error'}>{message}</Typography>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Currency Pair</InputLabel>
                <Select name="currency_pair" value={candle.currency_pair} onChange={handleChange}>
            <MenuItem value="AUDCAD">AUDCAD</MenuItem>
            <MenuItem value="AUDUSD">AUDUSD</MenuItem>
            <MenuItem value="AUDNZD">AUDNZD</MenuItem>
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

              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Trade Signal</InputLabel>
                <Select name="trade_signal" value={candle.trade_signal} onChange={handleChange}>
                  <MenuItem value="buy">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ArrowUpward color="primary" fontSize="small" />
                      <Typography variant="body2" sx={{ ml: 1 }}>Buy</Typography>
                    </Box>
                  </MenuItem>
                  <MenuItem value="sell">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ArrowDownward color="error" fontSize="small" />
                      <Typography variant="body2" sx={{ ml: 1 }}>Sell</Typography>
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
                name="candle_pattern"
                value={candle.candle_pattern}
                onChange={handleChange}
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
                name="fibonacci_level"
                value={candle.fibonacci_level}
                onChange={handleChange}
                margin="normal"
              >
                {['38.2%', '50%', '61.8%', '78.6%'].map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                id="session"
                select
                label="Trading Session"
                fullWidth
                variant="outlined"
                name="session"
                value={candle.session}
                onChange={handleChange}
                margin="normal"
              >
                {['London', 'Newyork'].map((session) => (
                  <MenuItem key={session} value={session}>
                    {session.charAt(0).toUpperCase() + session.slice(1)} Session
                  </MenuItem>
                ))}
              </TextField>

              <FormControlLabel
                control={
                  <Checkbox
                    name="five_min_order_block"
                    checked={candle.five_min_order_block}
                    onChange={handleChange}
                  />
                }
                label="5 Min Order Block"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="flip_four_hour_candle"
                    checked={candle.flip_four_hour_candle}
                    onChange={handleChange}
                  />
                }
                label="Flip 4 Hour Candle"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="four_hour_break_of_structure"
                    checked={candle.four_hour_break_of_structure}
                    onChange={handleChange}
                  />
                }
                label="4 Hour Break of Structure"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="five_min_break_of_structure"
                    checked={candle.five_min_break_of_structure}
                    onChange={handleChange}
                  />
                }
                label="5 Min Break of Structure"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="change_color_ut_alert"
                    checked={candle.change_color_ut_alert}
                    onChange={handleChange}
                  />
                }
                label="Change Color UT Alert"
              />
               <FormControlLabel
            control={
              <Checkbox
                name="is_active"
                checked={candle.is_active}
                onChange={handleChange}
              />
            }
            label="Active"
          />
            </Grid>
            <Grid container spacing={2}>


              
            {/* Idea Candle uploads */}

            <Box sx={{ textAlign: 'center', mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="idea-candle-file"
                type="file"
                name="idea_candle"
                onChange={handleFileChange}
              />
              <label htmlFor="idea-candle-file">
                <IconButton color="primary" component="span">
                  <UploadFile />
                </IconButton>
                <Typography variant="caption">Upload Idea Candle</Typography>
              </label>
              {ideaCandleUrl && (
                <img src={ideaCandleUrl} alt="Idea Candle" width={100} style={{ marginLeft: '10px' }} />
              )}
            </Box>

            {/* Linegraph Candle uploads */}

            <Box sx={{ textAlign: 'center', mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="line-graph-candle-file"
                type="file"
                name="line_graph_candle"
                onChange={handleFileChange}
              />
              <label htmlFor="line-graph-candle-file">
                <IconButton color="primary" component="span">
                  <UploadFile />
                </IconButton>
                <Typography variant="caption">Upload Line Graph Candle</Typography>
              </label>
              {lineGraphCandleUrl && (
                <img src={lineGraphCandleUrl} alt="Line Graph Candle" width={100} style={{ marginLeft: '10px' }} />
              )}
            </Box>

            {/* Image upload fields */}
            <Box sx={{ textAlign: 'center', mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="signal-candle-file"
                type="file"
                name="signal_candle"
                onChange={handleFileChange}
              />
              <label htmlFor="signal-candle-file">
                <IconButton color="primary" component="span">
                  <UploadFile />
                </IconButton>
                <Typography variant="caption">Upload Signal Candle</Typography>
              </label>
              {signalCandleUrl && (
                <img src={signalCandleUrl} alt="Signal Candle" width={100} style={{ marginLeft: '10px' }} />
              )}
            </Box>

            <Box sx={{ textAlign: 'center', mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="two-hour-candle-file"
                type="file"
                name="two_hour_candle"
                onChange={handleFileChange}
              />
              <label htmlFor="two-hour-candle-file">
                <IconButton color="primary" component="span">
                  <UploadFile />
                </IconButton>
                <Typography variant="caption">Upload 2-Hour Candle</Typography>
              </label>
              {twoHourCandleUrl && (
                <img src={twoHourCandleUrl} alt="2-Hour Candle" width={100} style={{ marginLeft: '10px' }} />
              )}
            </Box>


            <Box sx={{ textAlign: 'center', mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="hour-candle-file"
                type="file"
                name="hour_candle"
                onChange={handleFileChange}
              />
              <label htmlFor="hour-candle-file">
                <IconButton color="primary" component="span">
                  <UploadFile />
                </IconButton>
                <Typography variant="caption">Upload Hour Candle</Typography>
              </label>
              {hourCandleUrl && (
                <img src={hourCandleUrl} alt="Hour Candle" width={100} style={{ marginLeft: '10px' }} />
              )}
            </Box>

     
            <Box sx={{ textAlign: 'center', mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="entry-candle-file"
                type="file"
                name="entry_candle"
                onChange={handleFileChange}
              />
              <label htmlFor="entry-candle-file">
                <IconButton color="primary" component="span">
                  <UploadFile />
                </IconButton>
                <Typography variant="caption">Upload Entry Candle</Typography>
              </label>
              {entryCandleUrl && (
                <img src={entryCandleUrl} alt="Entry Candle" width={100} style={{ marginLeft: '10px' }} />
              )}
            </Box>

            <Box sx={{ textAlign: 'center', mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="breakeven-candle-file"
                type="file"
                name="breakeven_candle"
                onChange={handleFileChange}
              />
              <label htmlFor="breakeven-candle-file">
                <IconButton color="primary" component="span">
                  <UploadFile />
                </IconButton>
                <Typography variant="caption">Upload Breakeven Candle</Typography>
              </label>
              {breakevenCandleUrl && (
                <img src={breakevenCandleUrl} alt="Breakeven Candle" width={100} style={{ marginLeft: '10px' }} />
              )}
            </Box>

            <Box sx={{ textAlign: 'center', mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="take-profit-candle-file"
                type="file"
                name="take_profit_candle"
                onChange={handleFileChange}
              />
              <label htmlFor="take-profit-candle-file">
                <IconButton color="primary" component="span">
                  <UploadFile />
                </IconButton>
                <Typography variant="caption">Upload Take Profit Candle</Typography>
              </label>
              {takeProfitCandleUrl && (
                <img src={takeProfitCandleUrl} alt="Take Profit Candle" width={100} style={{ marginLeft: '10px' }} />
              )}
            </Box>

  {/* Weekday Candle uploads */}
  <Box sx={{ textAlign: 'center', mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <input
      accept="image/*"
      style={{ display: 'none' }}
      id="monday-candle-file"
      type="file"
      name="monday_candle"
      onChange={handleFileChange}
    />
    <label htmlFor="monday-candle-file">
      <IconButton color="primary" component="span">
        <UploadFile />
      </IconButton>
      <Typography variant="caption">Upload Monday Candle</Typography>
    </label>
    {mondayCandleUrl && (
      <img src={mondayCandleUrl} alt="Monday Candle" width={100} style={{ marginLeft: '10px' }} />
    )}
  </Box>

  <Box sx={{ textAlign: 'center', mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <input
      accept="image/*"
      style={{ display: 'none' }}
      id="tuesday-candle-file"
      type="file"
      name="tuesday_candle"
      onChange={handleFileChange}
    />
    <label htmlFor="tuesday-candle-file">
      <IconButton color="primary" component="span">
        <UploadFile />
      </IconButton>
      <Typography variant="caption">Upload Tuesday Candle</Typography>
    </label>
    {tuesdayCandleUrl && (
      <img src={tuesdayCandleUrl} alt="Tuesday Candle" width={100} style={{ marginLeft: '10px' }} />
    )}
  </Box>

  <Box sx={{ textAlign: 'center', mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <input
      accept="image/*"
      style={{ display: 'none' }}
      id="wednesday-candle-file"
      type="file"
      name="wednesday_candle"
      onChange={handleFileChange}
    />
    <label htmlFor="wednesday-candle-file">
      <IconButton color="primary" component="span">
        <UploadFile />
      </IconButton>
      <Typography variant="caption">Upload Wednesday Candle</Typography>
    </label>
    {wednesdayCandleUrl && (
      <img src={wednesdayCandleUrl} alt="Wednesday Candle" width={100} style={{ marginLeft: '10px' }} />
    )}
  </Box>

  <Box sx={{ textAlign: 'center', mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <input
      accept="image/*"
      style={{ display: 'none' }}
      id="thursday-candle-file"
      type="file"
      name="thursday_candle"
      onChange={handleFileChange}
    />
    <label htmlFor="thursday-candle-file">
      <IconButton color="primary" component="span">
        <UploadFile />
      </IconButton>
      <Typography variant="caption">Upload Thursday Candle</Typography>
    </label>
    {thursdayCandleUrl && (
      <img src={thursdayCandleUrl} alt="Thursday Candle" width={100} style={{ marginLeft: '10px' }} />
    )}
  </Box>

  <Box sx={{ textAlign: 'center', mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <input
      accept="image/*"
      style={{ display: 'none' }}
      id="friday-candle-file"
      type="file"
      name="friday_candle"
      onChange={handleFileChange}
    />
    <label htmlFor="friday-candle-file">
      <IconButton color="primary" component="span">
        <UploadFile />
      </IconButton>
      <Typography variant="caption">Upload Friday Candle</Typography>
    </label>
    {fridayCandleUrl && (
      <img src={fridayCandleUrl} alt="Friday Candle" width={100} style={{ marginLeft: '10px' }} />
    )}
  </Box>

  <Box sx={{ textAlign: 'center', mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <input
      accept="image/*"
      style={{ display: 'none' }}
      id="saturday-candle-file"
      type="file"
      name="saturday_candle"
      onChange={handleFileChange}
    />
    <label htmlFor="saturday-candle-file">
      <IconButton color="primary" component="span">
        <UploadFile />
      </IconButton>
      <Typography variant="caption">Upload Saturday Candle</Typography>
    </label>
    {saturdayCandleUrl && (
      <img src={saturdayCandleUrl} alt="Saturday Candle" width={100} style={{ marginLeft: '10px' }} />
    )}
  </Box>

  <Box sx={{ textAlign: 'center', mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <input
      accept="image/*"
      style={{ display: 'none' }}
      id="sunday-candle-file"
      type="file"
      name="sunday_candle"
      onChange={handleFileChange}
    />
    <label htmlFor="sunday-candle-file">
      <IconButton color="primary" component="span">
        <UploadFile />
      </IconButton>
      <Typography variant="caption">Upload Sunday Candle</Typography>
    </label>
    {sundayCandleUrl && (
      <img src={sundayCandleUrl} alt="Sunday Candle" width={100} style={{ marginLeft: '10px' }} />
    )}
  </Box>


  
          </Grid>

          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
};

export default MgiStrategyEditForm;
