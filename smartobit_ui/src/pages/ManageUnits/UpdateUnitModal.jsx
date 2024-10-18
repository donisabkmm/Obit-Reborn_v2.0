// Project Smart Obit for Malayala Manorama Co LTD
// Developed By Donis Abraham | Billan Jacob John | Afueth Thomas
// Start Date : 2024-10-07

import {forwardRef, useState, useEffect} from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Axios from "axios";
import {FormControl, InputLabel} from '@mui/material';
import Switch from "@mui/material/Switch";
import {API_BASE_URL} from "../../configs/config.jsx";
import {toast} from "react-toastify";


const modalStyle = {
    position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    backgroundColor: 'white', padding: '20px', borderRadius: '8px', maxWidth: '80%',
    maxHeight: '80%', overflowY: 'auto',
};

const UpdateUnitModal = forwardRef(({show, onHide, rowData}, ref) => {
    const [unitName, setUnitName] = useState("");
    const [unitId, setUnitId] = useState("");
    const [unit_id, setUnit_id] = useState("");
    const [Editions, setEditions] = useState("");
    const [unitEmail, setEmailId] = useState("");
    const [district, setDistrict] = useState("");
    const [checked, setChecked] = useState(false);
    const username = localStorage.getItem("user")

    const handleClose = () => {
        onHide();
        setUnitName("")
        setUnitId("")
        setEmailId("")
        setDistrict("")
        setChecked(false)
        setTimeout(() => {
            window.location.reload()
        }, 1500);
    };

    useEffect(() => {
        if (rowData) {
            Axios.post(API_BASE_URL + "/api/fetch_units", {
                unit_id: rowData[0]
            })
                .then(response => {
                    if (response.data.fdata) {
                        setUnit_id(response.data.fdata.unit_id)
                        setUnitName(response.data.fdata.unit_name);
                        setUnitId(response.data.fdata.unit_code);
                        setEmailId(response.data.fdata.unit_email);
                        setDistrict(response.data.fdata.unit_district);
                        setEditions(response.data.fdata.editions)
                        setChecked(response.data.fdata.status === 1 ? true : false)
                    }
                    if (response.data.message) {
                        toast(response.data.message)
                    }
                })


        }
    }, [rowData]);

    const handleCheckChange = (event) => {
        setChecked(event.target.checked);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (unitName === "" || unitCode === "" || unitEmail === "") {
            window.alert('Please fill in all required fields.');
        } else {
            Axios.post(API_BASE_URL + "/api/update_unit",
                {
                    unit_id: unit_id,
                    unit_name: unitName,
                    unit_code: unitId,
                    unit_email: unitEmail,
                    unit_district: district,
                    edition: Editions,
                    status: checked,
                    username: username
                }
            )
                .then(response => {
                    toast(response.data.message)
                    handleClose();
                })
                .catch(error => {
                    toast('Error updating unit:', error);
                });
        }
    };

    return (
        <Modal
            open={show}
            onClose={onHide}
            aria-labelledby="create-user-modal"
            aria-describedby="create-user-modal-description"
        >
            <div style={modalStyle}>
                <h4>Update Unit <span style={{color: 'blue'}}>{unitName}</span></h4>
                <form onSubmit={handleSubmit}>
                    <div style={{marginTop: "10px", marginBottom: "10px", display: "flex"}}>
                        <TextField id="unitName" label="Unit Name"
                                   value={unitName}
                                   onChange={(e) => setUnitName(e.target.value)}
                                   fullWidth
                                   style={{marginRight: "10px"}}
                        />
                        <TextField id="unitCode" label="Unit Code"
                                   value={unitId} onChange={(e) => setUnitId(e.target.value)} fullWidth
                        />
                    </div>
                    <TextField id="unitEmail" label="Unit E-mail" value={unitEmail}
                               onChange={(e) => setEmailId(e.target.value)} fullWidth style={{marginBottom: "10px"}}
                    />
                    <TextField id="unitEdition" label="Total Editions" value={Editions}
                               onChange={(e) => setEditions(e.target.value)} fullWidth style={{marginBottom: "10px"}}
                    />

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Primary District</InputLabel>
                        <Select labelId="district" id="district" value={district}
                                label="Primary District" onChange={(e) => setDistrict(e.target.value)}
                        >
                            <MenuItem value={"Alappuzha"}>Alappuzha</MenuItem>
                            <MenuItem value={"Ernakulam"}>Ernakulam</MenuItem>
                            <MenuItem value={"Idukki"}>Idukki</MenuItem>
                            <MenuItem value={"Kannur"}>Kannur</MenuItem>
                            <MenuItem value={"Kasargod"}>Kasargod</MenuItem>
                            <MenuItem value={"Kollam"}>Kollam</MenuItem>
                            <MenuItem value={"Kottayam"}>Kottayam</MenuItem>
                            <MenuItem value={"Kozhikode"}>Kozhikode</MenuItem>
                            <MenuItem value={"Malappuram"}>Malappuram</MenuItem>
                            <MenuItem value={"Palakkad"}>Palakkad</MenuItem>
                            <MenuItem value={"Pathanamthitta"}>Pathanamthitta</MenuItem>
                            <MenuItem value={"Thrissur"}>Thrissur</MenuItem>
                            <MenuItem value={"Thirvanathapuram"}>Thiruvanathapuram</MenuItem>
                            <MenuItem value={"Wayanad"}>Wayanad</MenuItem>
                            <MenuItem value={"Chennai"}>Chennai</MenuItem>
                            <MenuItem value={"Banglore"}>Banglore</MenuItem>
                            <MenuItem value={"Delhi"}>Delhi</MenuItem>
                            <MenuItem value={"Mumbai"}>Mumbai</MenuItem>
                        </Select>
                    </FormControl>

                    <div style={{marginTop: "1em"}}>
                        <label htmlFor="enableBureau">Activate Unit</label>
                        <Switch checked={checked} onChange={handleCheckChange} inputProps={{'aria-label': 'controlled'}}
                        />
                    </div>

                    <div style={{marginTop: "20px", textAlign: "right", gridColumn: "span 2"}}>
                        <Button variant="outlined" color="secondary" onClick={handleClose}
                                style={{marginRight: "10px"}}>
                            Close
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Update
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
});

export default UpdateUnitModal;
