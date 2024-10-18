// Project Smart Obit for Malayala Manorama Co LTD
// Developed By Donis Abraham | Billan Jacob John | Afueth Thomas
// Start Date : 2024-10-07

import {forwardRef, useImperativeHandle, useState, useEffect} from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Axios from 'axios';
import {API_BASE_URL} from "../../configs/config.jsx";
import {toast} from 'react-toastify';


const modalStyle = {
    position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    backgroundColor: 'white', padding: '20px', borderRadius: '8px', maxWidth: '80%',
    maxHeight: '80%', overflowY: 'auto',
};

const DeleteUnitModal = forwardRef(({show, onHide, rowData}, ref) => {
    useImperativeHandle(ref, () => ({
        focus: () => {
        }
    }));

    const [unit, setUnit] = useState("");
    const username = localStorage.getItem("user");
    useEffect(() => {
        if (rowData) {
            setUnit(rowData[1]);
        }
    }, [rowData]);

    const handleConfirm = (e) => {
        e.preventDefault();
        const userData = {unit: rowData[1], username: username};
        Axios.post(API_BASE_URL + "/api/delete_unit", userData)
            .then(response => {
                toast(response.data.message)
                onHide();
                setTimeout(() => {
                    window.location.reload()
                }, 1500);
            })
            .catch(error => {
                toast('Error deleting unit:', error);
            });
    };


    const handleCancel = () => {
        onHide();
    };

    return (
        <Modal
            open={show}
            onClose={onHide}
            aria-labelledby="delete-unit-modal"
            aria-describedby="delete-unit-modal-description"
        >
            <div style={modalStyle}>
                <p>Are you sure you want to delete {unit} unit?</p>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button variant="contained" color="primary" onClick={handleConfirm}>
                        Confirm
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleCancel}
                        style={{marginRight: "10px"}}
                    >
                        Close
                    </Button>
                </div>

            </div>
        </Modal>
    );
});

export default DeleteUnitModal;
