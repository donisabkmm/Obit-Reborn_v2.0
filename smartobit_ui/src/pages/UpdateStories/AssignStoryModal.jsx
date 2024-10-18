import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import './CSS/AssignStoryModal.css';
import PositionSelectionModal from './PositionSelectionModal.js';
import axios from 'axios';
import { API_BASE_URL } from '../../Config/config.js'
import { toast } from 'react-toastify'

const AssignStoryModal = ({ open, onClose, onAssignStory, EnableSubmit }) => {
  const [isPositionSelectionModalOpen, setPositionSelectionModalOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedEdition, setSelectedEdition] = useState(null);
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [assignmentOptions, setAssignmentsOptions] = useState([]);
  useEffect(() => {
    axios.post(API_BASE_URL + "/api/fetch_data_for_assignments")
      .then((response) => {
        setAssignmentsOptions(response.data.fdata);
      })
  }, []);
  useEffect(() => {
  
  }, [selectedData]);
  const handleUnitButtonClick = (value) => {
    if (selectedData.some(item => item.unit === value)) {
      setSelectedData(selectedData.filter(item => item.unit !== value))
    } else {
      setSelectedData([...selectedData, { unit: value }]);
    }
  };

  const handleOpenPositionSelectionModal = (unit, edition, position) => {
    setSelectedUnit(unit);
    setSelectedEdition(edition);
    setSelectedPosition(position);
    setPositionSelectionModalOpen(true);
  };

  const handleClosePositionSelectionModal = () => {
    setSelectedPosition(null);
    setPositionSelectionModalOpen(false);
  };

  const handlePositionSelect = (position) => {
    const updatedSelectedPositions = [...selectedPositions];
    const existingIndex = updatedSelectedPositions.findIndex(
      entry => entry.unit === selectedUnit && entry.edition === selectedEdition
    );

    if (position === "" && existingIndex !== -1) {
      updatedSelectedPositions.splice(existingIndex, 1);
    } else {
      if (existingIndex !== -1) {
        updatedSelectedPositions[existingIndex].position = position;
      } else {
        updatedSelectedPositions.push({ unit: selectedUnit, edition: selectedEdition, position: position });
      }
    }

    setSelectedPositions(updatedSelectedPositions);
    setPositionSelectionModalOpen(false);
  };

  const handleSelectAllUnits = () => {
    if (selectAll) {
      setSelectedData([]);
    } else {
      const allUnits = assignmentOptions.map(option => option.value);
      setSelectedData(allUnits.map(unit => ({ unit })));
    }
    setSelectAll(!selectAll);
  };

  const renderEditionButtons = (value, editions) => {
    return Array.from({ length: editions }, (_, index) => {
      const positionObj = selectedData.find(item => item.unit === value && item.edition === parseInt(index + 1));
      const position = positionObj ? positionObj.position : null;

      return (
        <Button
        key={`${value}_${index + 1}`}
        variant="contained"
        onClick={() => handleEditionButtonClick(value, index + 1, position)}
        className={`edition-button ${selectedData.some(item => item.unit === value) ? '' : 'disabled'} ${position ? 'selected' : ''}`}
        disabled={!selectedData.some(item => item.unit === value)}
      >
        Ed: {index + 1} Pos: {position}
      </Button>
      
      );
    });
  };

  const handleEditionButtonClick = (unit, edition, position) => {
    handleOpenPositionSelectionModal(unit, edition, position);
  };

  const onConfirm = () => {
    const filteredData = selectedData.filter(item => 'position' in item);
    axios.post(API_BASE_URL + "/api/story_cache",{story_id:localStorage.getItem('story_id'), assignments:filteredData})
      .then((response) => {
        toast(response.data.message);
      })
    onClose();
    onAssignStory(filteredData);
    EnableSubmit(false);
  };

  const onClear = () => {
    setSelectedData([]);
    setSelectedUnit(null);
    setSelectedPosition(null);
    setSelectedEdition(null);
    setSelectedPositions([]);
    setSelectAll(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle>Assign Story</DialogTitle>
      <DialogContent>
        <div className="unit-container">
        <div className="unit-container">
          <Button
            variant="contained"
            className={`unit-button ${selectAll ? 'selected' : ''}`}
            onClick={handleSelectAllUnits}
            style={{ width: '100%', maxWidth: '200px' }} // Adjust the width here
          >
            {selectAll ? 'Unselect All Units' : 'Select All Units'}
          </Button>
        </div>
        </div>
        {assignmentOptions.map(({ value, label, editions }) => (
          <div key={value} className="unit-container">
            <Button
              variant="contained"
              className={`unit-button ${selectedData.some(item => item.unit === value) ? 'selected' : ''}`}
              onClick={() => handleUnitButtonClick(value)}
            >
              {label}
            </Button>
            <div className="edition-buttons">
              {renderEditionButtons(value, editions)}
            </div>
          </div>
        ))}
        <PositionSelectionModal
          open={isPositionSelectionModalOpen}
          onClose={handleClosePositionSelectionModal}
          onPositionSelect={handlePositionSelect}
          unit={selectedUnit}
          edition={selectedEdition}
          prev_position={selectedPosition}
          selectedData={selectedData}
          setSelectedData={setSelectedData}
        />
      </DialogContent>
      <DialogActions>
      <Button onClick={onClose} color="primary">Close</Button>
        <Button onClick={onClear} color="error">Clear</Button>
        <Button onClick={onConfirm} color="success">Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignStoryModal;
