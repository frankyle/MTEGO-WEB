import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material';
import { Link } from 'react-router-dom';
import { AddCircleOutline, Edit, Delete , ArrowUpward, ArrowDownward } from '@mui/icons-material';
import useAxios from '../../../../routes/useAxios';
import MgiStrategyEditForm from './MgiStrategyEditForm';

const MgiStrategyList = () => {
  const api = useAxios();
  const [candles, setCandles] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCandle, setSelectedCandle] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [candleToDelete, setCandleToDelete] = useState(null);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // Changed to handle a single image
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const fetchCandles = async () => {
    try {
      const response = await api.get('/mgi/mgicandles/');
      setCandles(response.data);
    } catch (error) {
      console.error('Error fetching MGI candles:', error);
    }
  };

  useEffect(() => {
    fetchCandles();
  }, []);

  const handleDelete = (id) => {
    setCandleToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/mgi/mgicandles/${candleToDelete}/`);
      setCandles(candles.filter(candle => candle.id !== candleToDelete));
      setDeleteDialogOpen(false);
      setCandleToDelete(null);
    } catch (error) {
      console.error('Error deleting candle:', error);
    }
  };

  const handleEdit = (candle) => {
    setSelectedCandle(candle);
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCandle(null);
    setEditModalOpen(false);
  };

  // Handle opening the modal with the selected image
  const handleOpenImageModal = (image) => {
    setSelectedImage(image);
    setOpenImageModal(true);
  };

  const handleCloseImageModal = () => {
    setOpenImageModal(false);
    setSelectedImage(null);
  };


  // Sorting function
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedCandles = [...candles].sort((a, b) => {
    if (sortConfig.key) {
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];
      if (valueA < valueB) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    }
    return candles;
  });
  

  return (
    <Box sx={{ m: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>MGI Candles</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutline />}
        component={Link}
        to="/mtego/mgistrategy"
      >
        Create New Candle
      </Button>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>
                Currency Pair
                <IconButton onClick={() => handleSort('currency_pair')}>
                  {sortConfig.key === 'currency_pair' ? (
                    sortConfig.direction === 'asc' ? <ArrowUpward /> : <ArrowDownward />
                  ) : (
                    <ArrowDownward />
                  )}
                </IconButton>
              </TableCell>
              <TableCell>Trade Signal</TableCell>
              <TableCell>
                Status
                <IconButton onClick={() => handleSort('is_active')}>
                  {sortConfig.key === 'is_active' && sortConfig.direction === 'asc' ? <ArrowUpward /> : <ArrowDownward />}
                </IconButton>
              </TableCell>
              <TableCell>Candle Pattern</TableCell>
              <TableCell>Fibonacci Level</TableCell>
              <TableCell>Session</TableCell>
              <TableCell>4hr Flip Candle</TableCell>
              <TableCell>4hr Break of Structure</TableCell>
              <TableCell>5Min Break of Structure</TableCell>
              <TableCell>5Min Order Block</TableCell>
              <TableCell>UT Alert (Change Color)</TableCell>
              <TableCell>Idea Candle</TableCell>
              <TableCell>Line Graph Candle</TableCell>
              <TableCell>Signal Candle</TableCell>
              <TableCell>2hr Hour Candle</TableCell>      
              <TableCell>1hr Candle</TableCell>
              <TableCell>Entry Candle</TableCell>         
              <TableCell>Breakeven Candle</TableCell>     
              <TableCell>Take Profit Candle</TableCell>   
              <TableCell>MONDAY</TableCell>
              <TableCell>TUESDAY</TableCell>
              <TableCell>WEDNESDAY</TableCell>
              <TableCell>THURSDAY</TableCell>
              <TableCell>FRIDAY</TableCell>
              <TableCell>SATURDAY</TableCell>
              <TableCell>SUNDAY</TableCell>
              <TableCell>Pips Gained</TableCell>
              <TableCell>Pips Risked</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candles.map((candle, index) => (
              <TableRow key={candle.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{candle.currency_pair}</TableCell>
                <TableCell>{candle.trade_signal}</TableCell>
                <TableCell>
                  <span style={{ color: candle.is_active ? 'green' : 'red' }}>
                    {candle.is_active ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell>{candle.candle_pattern}</TableCell>
                <TableCell>{candle.fibonacci_level}</TableCell>
                <TableCell>{candle.session}</TableCell>
                <TableCell>
                  <span style={{ color: candle.flip_four_hour_candle ? 'blue' : 'red' }}>
                    {candle.flip_four_hour_candle ? 'Yes' : 'No'}
                  </span>
                </TableCell>
                <TableCell>
                  <span style={{ color: candle.four_hour_break_of_structure ? 'blue' : 'red' }}>
                    {candle.four_hour_break_of_structure ? 'Yes' : 'No'}
                  </span>
                </TableCell>
                <TableCell>
                  <span style={{ color: candle.five_min_break_of_structure ? 'blue' : 'red' }}>
                    {candle.five_min_break_of_structure ? 'Yes' : 'No'}
                  </span>
                </TableCell>
                <TableCell>
                  <span style={{ color: candle.five_min_order_block ? 'blue' : 'red' }}>
                    {candle.five_min_order_block ? 'Yes' : 'No'}
                  </span>
                </TableCell>
                <TableCell>
                  <span style={{ color: candle.change_color_ut_alert ? 'blue' : 'red' }}>
                    {candle.change_color_ut_alert ? 'Yes' : 'No'}
                  </span>
                </TableCell>
 
                <TableCell onClick={() => handleOpenImageModal(candle.idea_candle)}>
                  {candle.idea_candle && (
                    <img
                      src={candle.idea_candle}
                      alt="Idea Candle"
                      style={{ cursor: 'pointer', width: '150px', height: '100px' }}
                    />
                  )}
                </TableCell>

                <TableCell onClick={() => handleOpenImageModal(candle.line_graph_candle)}>
                  {candle.line_graph_candle && (
                    <img
                      src={candle.line_graph_candle}
                      alt="Line Graph Candle"
                      style={{ cursor: 'pointer', width: '150px', height: '100px' }}
                    />
                  )}
                </TableCell>

                <TableCell onClick={() => handleOpenImageModal(candle.signal_candle)}>
                  {candle.signal_candle && (
                    <img
                      src={candle.signal_candle}
                      alt="Signal Candle"
                      style={{ cursor: 'pointer', width: '150px', height: '100px' }}
                    />
                  )}
                </TableCell>
                
                

                <TableCell onClick={() => handleOpenImageModal(candle.two_hour_candle)}>
                  {candle.two_hour_candle && (
                    <img
                      src={candle.two_hour_candle}
                      alt="Two Hour Candle"
                      style={{ cursor: 'pointer', width: '150px', height: '100px' }}
                    />
                  )}
                </TableCell>
                
                <TableCell onClick={() => handleOpenImageModal(candle.hour_candle)}>
                  {candle.hour_candle && (
                    <img
                      src={candle.hour_candle}
                      alt="Hour Candle"
                      style={{ cursor: 'pointer', width: '150px', height: '100px' }}
                    />
                  )}
                </TableCell>
                
                
                <TableCell onClick={() => handleOpenImageModal(candle.entry_candle)}>
                  {candle.entry_candle && (
                    <img
                      src={candle.entry_candle}
                      alt="Entry Candle"
                      style={{ cursor: 'pointer', width: '150px', height: '100px' }}
                    />
                  )}
                </TableCell>
                <TableCell onClick={() => handleOpenImageModal(candle.breakeven_candle)}>
                  {candle.breakeven_candle && (
                    <img
                      src={candle.breakeven_candle}
                      alt="Breakeven Candle"
                      style={{ cursor: 'pointer', width: '150px', height: '100px' }}
                    />
                  )}
                </TableCell>
                <TableCell onClick={() => handleOpenImageModal(candle.take_profit_candle)}>
                  {candle.take_profit_candle && (
                    <img
                      src={candle.take_profit_candle}
                      alt="Take Profit Candle"
                      style={{ cursor: 'pointer', width: '150px', height: '100px' }}
                    />
                  )}
                </TableCell>

                <TableCell onClick={() => handleOpenImageModal(candle.monday_candle)}>
                  {candle.monday_candle && (
                    <img
                      src={candle.monday_candle}
                      alt="Monday Candle"
                      style={{ cursor: 'pointer', width: '150px', height: '100px' }}
                    />
                  )}
                </TableCell><TableCell onClick={() => handleOpenImageModal(candle.tuesday_candle)}>
                  {candle.tuesday_candle && (
                    <img
                      src={candle.tuesday_candle}
                      alt="Tuesday Candle"
                      style={{ cursor: 'pointer', width: '150px', height: '100px' }}
                    />
                  )}
                </TableCell><TableCell onClick={() => handleOpenImageModal(candle.wednesday_candle)}>
                  {candle.wednesday_candle && (
                    <img
                      src={candle.wednesday_candle}
                      alt="Wednesday Candle"
                      style={{ cursor: 'pointer', width: '150px', height: '100px' }}
                    />
                  )}
                </TableCell><TableCell onClick={() => handleOpenImageModal(candle.thursday_candle)}>
                  {candle.thursday_candle && (
                    <img
                      src={candle.thursday_candle}
                      alt="Thursday Candle"
                      style={{ cursor: 'pointer', width: '150px', height: '100px' }}
                    />
                  )}
                </TableCell><TableCell onClick={() => handleOpenImageModal(candle.friday_candle)}>
                  {candle.friday_candle && (
                    <img
                      src={candle.friday_candle}
                      alt="Friday Candle"
                      style={{ cursor: 'pointer', width: '150px', height: '100px' }}
                    />
                  )}
                </TableCell><TableCell onClick={() => handleOpenImageModal(candle.saturday_candle)}>
                  {candle.saturday_candle && (
                    <img
                      src={candle.saturday_candle}
                      alt="Saturday Candle"
                      style={{ cursor: 'pointer', width: '150px', height: '100px' }}
                    />
                  )}
                </TableCell><TableCell onClick={() => handleOpenImageModal(candle.sunday_candle)}>
                  {candle.sunday_candle && (
                    <img
                      src={candle.sunday_candle}
                      alt="Sunday Candle"
                      style={{ cursor: 'pointer', width: '150px', height: '100px' }}
                    />
                  )}
                </TableCell>
                <TableCell>{candle.pips_gained}</TableCell>
                <TableCell>{candle.pips_lost}</TableCell>
                
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(candle)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(candle.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Single Image Modal */}
      <Dialog open={openImageModal} onClose={handleCloseImageModal}>
        <DialogTitle>Candle Image</DialogTitle>
        <DialogContent>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected Candle"
              style={{ width: '100%', height: 'auto' }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseImageModal}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Candle Modal */}
      <MgiStrategyEditForm
        open={editModalOpen}
        onClose={handleCloseModal}
        candleToEdit={selectedCandle}
        fetchCandles={fetchCandles}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this candle?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MgiStrategyList;
