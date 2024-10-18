import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';

const ViewStoryModal = ({ show, onHide, rowData }) => {
  const [mappedData, setMappedData] = useState({}); // To store the mapped row data
  const [anniversary, setAnniversary] = useState(null);

  // Map rowData (array) to object fields
  useEffect(() => {
    if (rowData && Array.isArray(rowData)) {
      setMappedData({
        archive_id: rowData[0],
        thumbnail: rowData[1],
        name: rowData[2],
        place: rowData[3],
        date: rowData[4],
        unit: rowData[5],
        bureau: rowData[6]
      });
    }

    if (rowData && rowData[4]) {
      const currentDate = new Date();
      const storyDate = new Date(rowData[4]);
      const yearDifference = currentDate.getFullYear() - storyDate.getFullYear();
      const suffix = yearDifference === 1 ? "st" : yearDifference === 2 ? "nd" : yearDifference === 3 ? "rd" : "th";
      const anniversaryLabel = `${yearDifference}${suffix} Anniversary`;

      setAnniversary(anniversaryLabel);
    }
  }, [rowData]);

  if (!mappedData || Object.keys(mappedData).length === 0) {
    return null; // If no data, don't render the modal
  }

  return (
    <Dialog open={show} onClose={onHide} maxWidth="md">
      <DialogContent style={{ textAlign: 'center' }}>
        {mappedData.thumbnail ? (
          <img src={`data:image/jpeg;base64,${mappedData.thumbnail}`} alt="User" style={{ maxWidth: '100%', height: 'auto', marginBottom: '1em' }} />
        ) : (
          <div>No Image Available</div>
        )}

        <div>
          <strong style={{ display: 'block' }}>NAME:</strong> {mappedData.name || "N/A"}
        </div>
        <div>
          <strong style={{ display: 'block' }}>PLACE:</strong> {mappedData.place || "N/A"}
        </div>
        <div>
          <strong style={{ display: 'block' }}>DATE:</strong> {mappedData.date || "N/A"}
        </div>
        <div>
          <strong style={{ display: 'block' }}>UNIT:</strong> {mappedData.unit || "N/A"}
        </div>
        <div>
          <strong style={{ display: 'block' }}>BUREAU:</strong> {mappedData.bureau || "N/A"}
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
