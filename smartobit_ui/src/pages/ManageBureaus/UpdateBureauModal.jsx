// Project Smart Obit for Malayala Manorama Co LTD
// Developed By Donis Abraham | Billan Jacob John | Afueth Thomas
// Start Date : 2024-10-07

import {forwardRef, useState, useEffect} from "react";
import Modal from "@mui/material/Modal";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import {API_BASE_URL} from "../../configs/config.jsx";
import 'react-toastify/dist/ReactToastify.css'
import {toast} from 'react-toastify';


const modalStyle = {
    position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white',
    padding: '20px', borderRadius: '8px', maxWidth: '80%',
    maxHeight: '80%', overflowY: 'auto',
};
const UpdateBureauModal = forwardRef(({show, onHide, rowData}, ref) => {
    const [bureauName, setBureauName] = useState("");
    const [unit, setUnit] = useState("");
    const [Allunit, setAllUnit] = useState([]);
    const [bureau_code, setbureau_code] = useState("");
    const [email, setEmail] = useState("");
    const [checked, setChecked] = useState();
    const [bureauID, setBureauID] = useState();

    const username = localStorage.getItem("user")

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
        if (rowData) {
            console.log(rowData)
            setBureauID(rowData[0])
            setBureauName(rowData[1]);
            setbureau_code(rowData[2])
            setEmail(rowData[3])
            setUnit(rowData[4]);
            setChecked(rowData[6] === "Active" ? true : false);
        }
    }, [rowData]);

    const handleUnitChange = (e) => {
        setUnit(e.target.value)
    }
    const handleCheckChange = (event) => {
        setChecked(event.target.checked);
    };
    const handleClose = () => {
        onHide();
        setBureauName("")
        setUnit("")
        setChecked(false)
        setTimeout(() => {
            window.location.reload()
        }, 1500);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (bureauName === "" || unit === "") {
            window.alert('Please fill in all required fields.');
        } else {
            axios.post(API_BASE_URL + '/api/update_bureau', {
                bureau_id: bureauID,
                Bureau_name: bureauName,
                Bureau_code: bureau_code,
                unit: unit,
                bureauEmail: email,
                status: checked,
                username: username,

            })
                .then(response => {
                    toast(response.data.message);
                    handleClose();
                })
                .catch(error => {
                    toast('Error updating bureau:', response.data.error);
                });
        }
        ;
    }


    return (
        <Modal open={show} onClose={onHide}
               aria-labelledby="update-bureau-modal" aria-describedby="update-bureau-modal-description"
        >
            <div style={modalStyle}>
                <h4 style={{paddingLeft: '3.5em'}}><b>Update Bureau</b></h4>
                <form onSubmit={handleSubmit}>

                    <div style={{paddingTop: '1em', display: "flex"}}>
                        <TextField id="bureauName" label="Bureau Name" value={bureauName}
                                   onChange={(e) => setBureauName(e.target.value)} fullWidth
                                   style={{marginRight: "10px"}}
                        />

                        {/* UNIT DROP DOWN */}
                        <FormControl fullWidth style={{width: '8em'}}>
                            <InputLabel htmlFor="units-label" style={{marginTop: '-10px'}}>Unit</InputLabel>
                            <Select labelId="units-label" id="unit" onChange={handleUnitChange} value={unit} fullWidth>
                                {(
                                    Allunit.map((item) => (
                                        <MenuItem key={item.id} value={item.unit_code}>
                                            {item.unit_code}
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                        </FormControl>

                    </div>
                    <div style={{paddingTop: '1em', display: "flex"}}>
                        <TextField id="bureau_id" label="Bureau Code" value={bureau_code}
                                   onChange={(e) => setbureau_code(e.target.value)} fullWidth
                                   style={{marginRight: "10px"}}
                        />
                        <TextField id="EmailID" label="Email ID" value={email}
                                   onChange={(e) => setEmail(e.target.value)} fullWidth style={{marginRight: "10px"}}
                        />
                    </div>

                    <div style={{marginBottom: "10px"}}>

                        <label htmlFor="enableBureau">Activate Bureau</label>
                        <Switch
                            checked={checked}
                            onChange={handleCheckChange}
                            inputProps={{'aria-label': 'controlled'}}
                        />
                    </div>

                    <div style={{marginTop: "20px", textAlign: "right", gridColumn: "span 2"}}>
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

export default UpdateBureauModal;
