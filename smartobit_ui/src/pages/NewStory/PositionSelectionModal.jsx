import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Backdrop } from '@mui/material';

const PositionSelectionModal = ({ open, onClose, onPositionSelect, unit, edition, prev_position, selectedData, setSelectedData }) => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  // const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    setSelectedPosition(prev_position)
  }, [prev_position, selectedData]);

  const handlePositionSelect = (pos) => {
    if (pos === selectedPosition) {
      setSelectedPosition("")
    }
    if (pos !== selectedPosition) {
      setSelectedPosition(pos)
    };
  }

  const handleConfirm = () => {
    // Check if there is already an object with the same unit and edition
    const indexToReplace = selectedData.findIndex(item => item.unit === unit && item.edition === edition);

    // deselecting a position, so remove it from selected data
    if (selectedPosition === "") {
      // window.alert('Please select a position');
      const newSelectedData = selectedData.filter((item, index) => index !== indexToReplace);
      setSelectedData(newSelectedData);
    }

    else if (selectedPosition !== null) {
      const selectedPositionAndEdition = {
        unit: unit,
        edition: edition,
        position: selectedPosition,
      };

      if (indexToReplace !== -1) {
        // If found, replace the object at that index with the new object
        const newSelectedData = [...selectedData];
        newSelectedData[indexToReplace] = selectedPositionAndEdition;
        setSelectedData(newSelectedData)
      } else {
        // If not found, simply add the new object to the array
        setSelectedData(prevSelectedData => [...prevSelectedData, selectedPositionAndEdition]);
      }

    }
    onPositionSelect(selectedPosition);
    onClose();
    setSelectedPosition("");// so that next time an edition in same row is opened the previous edition's pos is not marked in curret one
  };

  const closeModal = () => {
    setSelectedPosition(null);   // when canceling the selected position should be reset
    onClose();
  }

  const generateCalendarGrid = () => {
    return Array.from({ length: 20 }, (_, index) => index + 1);
  };

  const calendarGrid = generateCalendarGrid(); // Always generate 100 positions

  return (
    <Dialog
      open={open}
      onClose={closeModal}
      BackdropComponent={Backdrop}
      BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0)' } }}
      PaperProps={{
        style: {
          backgroundColor: 'white', boxShadow: 'none', overflow: 'hidden', border: '2px solid #ccc', borderRadius: '8px',
        },
      }}
    >
      <DialogTitle>
        Select {unit} Position
        <Button variant="outlined" color="primary" style={{ marginLeft: '10px' }}
          className={`udp ${(selectedPosition === "UD") ? 'selected' : ''}`} onClick={() => handlePositionSelect("UD")}>
          UDP
        </Button>
      </DialogTitle>

      <DialogContent>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(10, 1fr)`, gap: '8px' }}>
          {calendarGrid.map((pos) => (
            <div
              key={pos}
              onClick={() => handlePositionSelect(pos)}
              style={{
                cursor: 'pointer', padding: '8px', border: '1px solid #ccc',
                borderRadius: '4px', marginBottom: '8px',
                backgroundColor: selectedData.includes(pos) || selectedPosition === pos ? 'lightblue' : 'white'
              }}
            >
              {pos}
            </div>
          ))}
        </div>
      </DialogContent>



      <DialogActions>
        <Button onClick={closeModal}>Cancel</Button>
        <Button onClick={handleConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PositionSelectionModal;
