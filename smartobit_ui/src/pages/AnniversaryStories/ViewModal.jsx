import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const ViewStoryModal = ({ show, onHide, rowData }) => {
  const [anniversary, setAnniversary] = useState(null);

  useEffect(() => {
    if (rowData && rowData.date) {
      const currentDate = new Date();
      const storyDate = new Date(rowData.date);
      const yearDifference = currentDate.getFullYear() - storyDate.getFullYear();
      
      // Determine the appropriate suffix for the year (1st, 2nd, 3rd, etc.)
      const suffix = yearDifference === 1 ? "st" : yearDifference === 2 ? "nd" : yearDifference === 3 ? "rd" : "th";
      
      // Create the anniversary label
      const anniversaryLabel = `${yearDifference}${suffix} Anniversary`;

      setAnniversary(anniversaryLabel);
    }
  }, [rowData]);

  if (!rowData) {
    return null;
  }

  return (
    <Dialog open={show} onClose={onHide} maxWidth="md">
      <DialogTitle style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', padding: '16px' }}>{anniversary}</DialogTitle>
      <DialogContent style={{ textAlign: 'center' }}>
        <img src={rowData.photo} alt="User" style={{ maxWidth: '100%', height: 'auto', marginBottom: '1em' }} />
        <div>
          <strong style={{ display: 'block' }}>NAME:</strong> {rowData.name}
        </div>
        <div>
          <strong style={{ display: 'block' }}>PLACE:</strong> {rowData.place}
        </div>
        <div>
          <strong style={{ display: 'block' }}>DATE:</strong> {rowData.date}
        </div>
        <div>
          <strong style={{ display: 'block' }}>UNIT:</strong> {rowData.unit}
        </div>
        <div>
          <strong style={{ display: 'block' }}>BUREAU:</strong> {rowData.bureau}
        </div>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center' }}>
        <Button onClick={onHide} color="primary" variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewStoryModal;
