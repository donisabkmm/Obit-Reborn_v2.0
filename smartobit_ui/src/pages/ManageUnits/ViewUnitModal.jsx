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
    width: '70%', // Adjust width to fit three columns
    height: '650px',
    overflowY: 'auto',
    display: 'flex', // Use flexbox to align columns side by side
    justifyContent: 'space-between', // Space columns evenly
};

const columnStyle = {
    width: '30%', // Set width for each column
    height: '610px',
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

const scrollbarWidth = '10px'; // Adjust width of the scrollbar

const ViewUnitModal = forwardRef(({show, onHide, rowData, filteredBureauData, filteredUserData}, ref) => {


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
                    <div style={{background: alternateBackground(0)}}>Unit: {rowData[2]}</div>
                    <div style={{background: alternateBackground(1)}}>Code: {rowData[1]}</div>
                    <div style={{background: alternateBackground(2)}}>Email: {rowData[3]}</div>
                    <div style={{background: alternateBackground(3)}}>Bureaus: {rowData[5]}</div>
                    <div style={{background: alternateBackground(4)}}>Editions: {rowData[6]}</div>
                    <div style={{background: alternateBackground(5)}}>Users: {rowData[4]}</div>
                </div>
                <div style={{...columnStyle, paddingRight: scrollbarWidth}}>
                    <h6 style={stickyHeadingStyle}><strong>BUREAUS</strong></h6>
                    {filteredBureauData.map((item, index) => {
                        return <div key={item.id} style={{background: alternateBackground(index)}}><span
                            style={{color: 'blue'}}>Name:</span> {item.b_name} <span style={{color: 'green'}}>| Bureau Code:</span> {item.b_code}
                        </div>;
                    })}
                </div>
                <div style={{...columnStyle, paddingRight: scrollbarWidth}}>
                    <h6 style={stickyHeadingStyle}><strong>USERS</strong></h6>
                    {filteredUserData.map((item, index) => {
                        return <div key={item.id} style={{background: alternateBackground(index)}}><span
                            style={{color: 'blue'}}>Name:</span> {item.name} <span style={{color: 'green'}}>| Employee ID:</span> {item.u_emp_id}
                        </div>;
                    })}
                </div>
            </div>
        </Modal>
    );
});

export default ViewUnitModal;
