// Project Smart Obit for Malayala Manorama Co LTD
// Developed By Donis Abraham | Billan Jacob John | Afueth Thomas
// Start Date : 2024-10-07

import {useState, useRef, forwardRef, useEffect} from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {FormControl, InputLabel, Switch} from "@mui/material";
import axios from "axios";
import {API_BASE_URL} from "../../configs/config.jsx";
import 'react-toastify/dist/ReactToastify.css'
import {toast} from 'react-toastify';


const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '80%',
    maxHeight: '100%',
    overflowY: 'auto',
};

const CreateBureauModal = forwardRef(({show, onHide}, ref) => {
    const [bureauName, setBureauName] = useState("");
    const [bureauCode, setBureauCode] = useState("");
    const [bureauEmail, setBureauEmail] = useState("");
    const [unit, setUnit] = useState("");
    const [checked, setChecked] = useState(false);
    const [Allunit, setAllUnit] = useState([]);
    const username = localStorage.getItem("user");


    useEffect(() => {
        axios.post(API_BASE_URL + '/api/fetch_all_units')
            .then(response => {
                if (response.data.fdata) {
                    setAllUnit(response.data.fdata)
                }
                if (response.data.message) {
                    toast(response.data.message)
                }
            })

    }, []);

    const handleCheckChange = () => {
        setChecked(!checked);
    };

    const handleUnitChange = (e) => {
        setUnit(e.target.value);
    };

    const handleClose = () => {
        onHide();
        setBureauName("");
        setBureauCode("");
        setBureauEmail("");
        setUnit("");
        setChecked(false);
        setTimeout(() => {
            window.location.reload()

        }, 1500);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (bureauName === "" || bureauCode === "" || bureauEmail === "" || unit === "") {
            window.alert('Please fill in all required fields.');
        } else {
            const bureauData = {
                Bureau_name: bureauName,
                Bureau_code: bureauCode,
                bureau_email: bureauEmail,
                unit_code: unit,
                status: checked ? 1 : 0,
                username: username,

            };

            axios.post(API_BASE_URL + '/api/create_bureau', bureauData)
                .then(response => {
                    if (response.data.message) {
                        toast(response.data.message);
                        handleClose();
                    } else {
                        toast(response.data.error);

                    }

                })

        }
    };

    return (
        <Modal
            open={show}
            onClose={handleClose}
            aria-labelledby="create-bureau-modal"
            aria-describedby="create-bureau-modal-description"
        >
            <div style={modalStyle}>
                <h2>Create Bureau</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{marginBottom: "10px", display: "flex", marginTop: "1em"}}>
                        <TextField
                            id="bureauName"
                            label="Bureau Name"
                            value={bureauName}
                            onChange={(e) => setBureauName(e.target.value)}
                            fullWidth
                            style={{marginRight: "10px"}}
                        />
                        <TextField
                            id="bureauCode"
                            label="Bureau Code"
                            value={bureauCode}
                            onChange={(e) => setBureauCode(e.target.value)}
                            fullWidth
                        />
                    </div>
                    <TextField
                        id="bureauEmail"
                        label="Bureau E-mail"
                        value={bureauEmail}
                        onChange={(e) => setBureauEmail(e.target.value)}
                        fullWidth
                        style={{marginBottom: "10px"}}
                    />
                    <FormControl fullWidth style={{width: '16em', marginTop: '1em'}}>
                        <InputLabel htmlFor="units-label" style={{marginTop: '-10px'}}>Unit</InputLabel>
                        <Select labelId="units-label" id="unit" onChange={handleUnitChange} fullWidth>
                            {(
                                Allunit.map((item) => (
                                    <MenuItem key={item.id} value={item.unit_code}>
                                        {item.unit_code}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                    </FormControl>
                    <div style={{marginBottom: "10px"}}>
                        <label htmlFor="enableBureau">Activate Bureau</label>
                        <Switch
                            checked={checked}
                            onChange={handleCheckChange}
                            inputProps={{'aria-label': 'controlled'}}
                        />
                    </div>
                    <div style={{marginTop: "20px", textAlign: "right"}}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleClose}
                            style={{marginRight: "10px"}}
                        >
                            Close
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
});

const App = () => {
    const [showCreateBureauModal, setShowCreateBureauModal] = useState(false);
    const createBureauModalRef = useRef(null);

    const handlePlusButtonClick = () => {
        setShowCreateBureauModal(true);
    };

    const handleCloseCreateBureauModal = () => {
        setShowCreateBureauModal(false);
    };

    return (
        <div style={{display: 'inline-block'}}>
            <Button
                variant="outline-primary"
                style={{borderColor: '#00008B', color: '#00008B'}}
                onClick={handlePlusButtonClick}
            >
                + Create Bureau
            </Button>
            <CreateBureauModal
                ref={createBureauModalRef}
                show={showCreateBureauModal}
                onHide={handleCloseCreateBureauModal}
            />
        </div>
    );
};

export default App;
