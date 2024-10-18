// Project Smart Obit for Malayala Manorama Co LTD
// Developed By Donis Abraham | Billan Jacob John | Afueth Thomas
// Start Date : 2024-10-07

import {forwardRef, useState, useEffect} from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import axios from "axios";
import {toast} from "react-toastify";
import {API_BASE_URL} from "../../configs/config.jsx";

const modalStyle = {
    position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    backgroundColor: 'white', padding: '20px', borderRadius: '8px', maxWidth: '80%',
    maxHeight: '80%', overflowY: 'auto',
};

const DeleteBureauModal = forwardRef(({show, onHide, rowData}, ref) => {
    const username = localStorage.getItem("user");
    const [bureau_id, setBureau_id] = useState();
    const [bureau_name, setBureau_name] = useState();

    useEffect(() => {
        if (rowData) {
            setBureau_id(rowData[0]);
            setBureau_name(rowData[1]);
        }
    }, [rowData]);
    const handleConfirm = (e) => {
        e.preventDefault();
        const userData = {bureau_id: bureau_id, username: username};
        axios.post(API_BASE_URL + "/api/delete_bureau", userData)
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
    }

    const handleClose = () => {
        onHide();
    };

    return (
        <Modal open={show} onClose={onHide}
               aria-labelledby="delete-unit-modal" aria-describedby="delete-unit-modal-description"
        >
            <div style={modalStyle}>
                <p>Are you sure you want to delete Bureau: {bureau_name} ? </p>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button variant="contained" color="primary" onClick={handleConfirm}>
                        Confirm
                    </Button>
                    <Button variant="outlined" color="secondary"
                            onClick={handleClose} style={{marginRight: "10px"}}
                    > Close
                    </Button>
                </div>
            </div>
        </Modal>
    );
});

export default DeleteBureauModal;
