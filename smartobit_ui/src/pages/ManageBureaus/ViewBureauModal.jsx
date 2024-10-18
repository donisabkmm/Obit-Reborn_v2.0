// Project Smart Obit for Malayala Manorama Co LTD
// Developed By Donis Abraham | Billan Jacob John | Afueth Thomas
// Start Date : 2024-10-07

import {forwardRef, useImperativeHandle} from "react";
import Modal from "@mui/material/Modal";


const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '30%', // Adjust width to fit three columns
    maxHeight: '100%',
    overflowY: 'auto',
    display: 'flex', // Use flexbox to align columns side by side
    justifyContent: 'space-between', // Space columns evenly
};

const columnStyle = {
    width: '50%', // Set width for each column
    maxHeight: '40%',
    overflowY: 'auto',
    position: 'relative', // Add relative positioning to set width for scrollbar
};

const stickyHeadingStyle = {
    position: 'sticky',
    width: '100%',
    top: '0',
    backgroundColor: 'white', // Adjust background color as needed
    zIndex: '1', // Ensure headings stay above scrolling content
    borderBottom: '1px solid #ccc', // Add a horizontal line below the heading
    padding: '8px 0', // Adjust padding for spacing
};


const ViewBureauModal = forwardRef(({show, onHide, rowData}, ref) => {

    useImperativeHandle(ref, () => ({
        focus: () => {
        }
    }));

    if (!rowData) {
        return null;
    }

    const alternateBackground = (index) => {
        return index % 2 === 0 ? '#f5f5f5' : 'transparent'; // Apply alternating background colors
    };

    return (
        <Modal
            open={show}
            onClose={onHide}
            aria-labelledby="view-unit-modal"
            aria-describedby="view-unit-modal-description"
        >
            <div style={modalStyle}>
                <div style={columnStyle}>
                    <h6 style={{...stickyHeadingStyle, borderBottom: '1px solid #ccc'}}><strong>DETAILS</strong></h6>
                    <div style={{background: alternateBackground(0)}}>Bureau Name: <span
                        style={{color: "blue"}}>{rowData[1]}</span></div>
                    <div style={{background: alternateBackground(1)}}>Bureau Code: <span
                        style={{color: "blue"}}>{rowData[2]}</span></div>
                    <div style={{background: alternateBackground(2)}}>Email: <span
                        style={{color: "blue"}}>{rowData[3]}</span></div>
                    <div style={{background: alternateBackground(3)}}>Unit Name: <span
                        style={{color: "blue"}}>{rowData[4]}</span></div>
                    <div style={{background: alternateBackground(4)}}>Bureau Status: <span
                        style={{color: "blue"}}>{rowData[6]}</span></div>
                    <div style={{background: alternateBackground(5)}}>No of Users: <span
                        style={{color: "blue"}}>{rowData[5]}</span></div>
                </div>
            </div>
        </Modal>
    );
});

export default ViewBureauModal;
