// Project Smart Obit for Malayala Manorama Co LTD
// Developed By Donis Abraham | Billan Jacob John | Afueth Thomas
// Start Date : 2024-10-07

import {useState, useRef, forwardRef, useImperativeHandle} from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Axios from "axios";
import {FormControl, InputLabel} from '@mui/material';
import Switch from "@mui/material/Switch";
import {API_BASE_URL} from "../../configs/config.jsx";
import {toast} from "react-toastify";


const modalStyle = {
    position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white',
    padding: '20px', borderRadius: '8px', maxWidth: '90%', maxHeight: '100%', overflowY: 'auto',
};


const CreateUserModal = forwardRef(({show, onHide, onSubmit}, ref) => {
    const dak = localStorage.getItem("user")
    const [unitName, setUnitName] = useState("");
    const [unitId, setUnitId] = useState("");
    const [unitEmail, setEmailId] = useState("");
    const [unitEdition, setEdition] = useState("");
    const [district, setDistrict] = useState("");
    const [checked, setChecked] = useState(false);

    const handleCheckChange = (event) => {
        setChecked(event.target.checked);
    };

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

    useImperativeHandle(ref, () => ({
        focus: () => {
        }
    }));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (unitName === "" || unitId === "" || unitEmail === "" || district === "") {
            window.alert('Please fill in all required fields.');
        } else {
            const unitdata = {
                "unit_name": unitName,
                "unit_code": unitId,
                "unit_location": district,
                "unit_email": unitEmail,
                "status": checked ? 1 : 0,
                "editions": unitEdition,
                "created_by": dak
            }
            Axios.post(API_BASE_URL + '/api/create_unit', unitdata)
                .then(response => {
                    if (response.data) {
                        toast(response.data.message);
                        handleClose();
                    } else {
                        toast("An unknown Error occurred, Contact your administrator!")
                    }
                })
                .catch(error => {
                    toast('Error creating unit:', error);
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
                <h4 style={{paddingLeft: '3.5em'}}><b>Create Unit</b></h4>
                <form onSubmit={handleSubmit}>
                    <div style={{marginTop: "10px", marginBottom: "10px", display: "flex"}}>
                        <TextField
                            id="unitName"
                            label="Unit Name"
                            value={unitName}
                            onChange={(e) => setUnitName(e.target.value)}
                            fullWidth
                            style={{marginRight: "10px"}}
                        />
                        <TextField
                            id="unitCode"
                            label="Unit Code"
                            value={unitId}
                            onChange={(e) => setUnitId(e.target.value)}
                            fullWidth
                        />
                    </div>
                    <TextField
                        id="unitEmail"
                        label="Unit E-mail"
                        value={unitEmail}
                        onChange={(e) => setEmailId(e.target.value)}
                        fullWidth
                        style={{marginBottom: "10px"}}
                    />
                    <TextField
                        id="unitEdition"
                        label="No of Editions"
                        value={unitEdition}
                        onChange={(e) => setEdition(e.target.value)}
                        fullWidth
                        style={{marginBottom: "10px"}}
                    />

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Primary District</InputLabel>
                        <Select
                            labelId="district"
                            id="district"
                            defaultValue={district}  // Use unitName or another appropriate value from your state
                            label="Primary District"
                            onChange={(e) => setDistrict(e.target.value)}  // Update the appropriate state value
                        >
                            <MenuItem value={""}>---Select Primary District---</MenuItem>
                            <MenuItem value={"Alappuzha"}>Alappuzha(Kerala)</MenuItem>
                            <MenuItem value={"Ernakulam"}>Ernakulam(Kerala)</MenuItem>
                            <MenuItem value={"Idukki"}>Idukki(Kerala)</MenuItem>
                            <MenuItem value={"Kannur"}>Kannur(Kerala)</MenuItem>
                            <MenuItem value={"Kasargod"}>Kasargod(Kerala)</MenuItem>
                            <MenuItem value={"Kollam"}>Kollam(Kerala)</MenuItem>
                            <MenuItem value={"Kottayam"}>Kottayam(Kerala)</MenuItem>
                            <MenuItem value={"Kozhikode"}>Kozhikode(Kerala)</MenuItem>
                            <MenuItem value={"Malappuram"}>Malappuram(Kerala)</MenuItem>
                            <MenuItem value={"Palakkad"}>Palakkad(Kerala)</MenuItem>
                            <MenuItem value={"Pathanamthitta"}>Pathanamthitta(Kerala)</MenuItem>
                            <MenuItem value={"Thrissur"}>Thrissur(Kerala)</MenuItem>
                            <MenuItem value={"Thirvanathapuram"}>Thiruvanathapuram(Kerala)</MenuItem>
                            <MenuItem value={"Wayanad"}>Wayanad(Kerala)</MenuItem>
                            <MenuItem value={"Chennai"}>Chennai(Tamil Nadu)</MenuItem>
                            <MenuItem value={"Banglore"}>Banglore(Banglore)</MenuItem>
                            <MenuItem value={"Delhi"}>Delhi(Delhi)</MenuItem>
                            <MenuItem value={"Mumbai"}>Mumbai(Maharastra)</MenuItem>
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
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
});

const App = () => {
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);
    const createUserModalRef = useRef(null);

    const handlePlusButtonClick = () => {
        setShowCreateUserModal(true);
    };

    const handleCloseCreateUserModal = () => {
        setShowCreateUserModal(false);
    };

    return (
        <div style={{display: 'inline-block'}}>
            <Button
                variant="outline-primary"
                style={{borderColor: '#00008B', color: '#00008B'}}
                onClick={handlePlusButtonClick}
            >
                + Create Unit
            </Button>
            <CreateUserModal
                ref={createUserModalRef}
                show={showCreateUserModal}
                onHide={handleCloseCreateUserModal}
            />
        </div>


    );
};

export default App;
