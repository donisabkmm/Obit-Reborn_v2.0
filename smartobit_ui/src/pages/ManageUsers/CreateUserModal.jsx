// Project Smart Obit for Malayala Manorama Co LTD
// Developed By Donis Abraham | Billan Jacob John | Afueth Thomas
// Start Date : 2024-10-07

import {useState, useRef, forwardRef, useEffect} from "react";
import axios from 'axios';
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Switch from "@mui/material/Switch";
import {API_BASE_URL} from "../../configs/config.jsx";
import {toast} from "react-toastify";
import bcrypt from "bcryptjs-react";


const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '80%',
    maxHeight: '80%',
    overflowY: 'auto',
};

const CreateUserModal = forwardRef(({show, onHide}, ref) => {
    const username = localStorage.getItem("user")
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [loginUserName, setLoginUserName] = useState("");
    const [password, setPassword] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [role, setRole] = useState("");
    const [unit, setUnit] = useState("");
    const [bureau, setBureau] = useState("");
    const [bureaus, setBureaus] = useState([]);
    const [checked, setChecked] = useState(false);
    const [units, setUnits] = useState([]);
    const [userRoles, setUserRole] = useState([]);

    const fetchData = () => {
        axios.post(API_BASE_URL + '/api/fetch_all_units')
            .then(response => {
                if (response.data.fdata) {
                    setUnits(response.data.fdata)
                    console.log(response.data.fdata)
                }
                if (response.data.message) {
                    toast(response.data.message)
                }
            })
    };
    const fetchRole = () => {
        axios.post(API_BASE_URL + '/api/fetch_role')
            .then(response => {
                if (response.data.fdata) {
                    setUserRole(response.data.fdata)
                }
                if (response.data.message) {
                    toast(response.data.message)
                }
            })
    };

    useEffect(() => {
        fetchData();
        fetchRole();
    }, []);

    const handleClose = () => {
        onHide();
        setFirstName("")
        setLastName("")
        setLoginUserName("")
        setPassword("")
        setEmployeeId("")
        setRole("")
        setUnit("")
        setBureau("")
        setBureaus([])
        setTimeout(() => {
            window.location.reload()

        }, 1500);
    };

    const handleCheckChange = (event) => {
        setChecked(event.target.checked);
    };


    const handleUnitChange = (e) => {
        setUnit(e.target.value)
        fetchBureau(e.target.value);

    }
    const fetchBureau = async (data) => {
        const unit_code = {unit_code: data}
        await axios.post(API_BASE_URL + '/api/fetch_bureaus_based_on_units_code', unit_code)
            .then(response => {
                if (response.data.fdata) {
                    setBureaus(response.data.fdata)
                }
                if (response.data.message) {
                    toast(response.data.message)
                }
            })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (firstName === "" || lastName === "" || loginUserName === "" || password === "" || employeeId === "" ||
            role === "" || unit === "" || bureau === "") {
            window.alert('Please fill in all required fields.');
        } else {
            const salt = '$2a$10$D5QdrG2WDMjYXtUHURwXWO';
            const hashedPassword = bcrypt.hashSync(password, salt);
            const userData = {
                "firstname": firstName,
                "lastname": lastName,
                "employeeId": employeeId,
                "username": loginUserName,
                "password": hashedPassword,
                "unit": unit,
                "bureau": bureau,
                "role": role,
                "created_by": username,
                "status": checked ? 1 : 0
            }

            axios.post(API_BASE_URL + '/api/create_user', userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function (response) {
                    if (response.data) {
                        toast(response.data.message);
                        handleClose();
                    } else {
                        toast("An unknown Error occurred, Contact your administrator!");
                    }
                })
                .catch(function (error) {
                    console.error('Error creating user:', error);
                });
        }
    };

    return (
        <Modal open={show} onClose={onHide} aria-labelledby="create-user-modal"
               aria-describedby="create-user-modal-description">
            <div style={modalStyle}>
                <h4 style={{paddingLeft: '3.5em'}}><b>Create User</b></h4>
                <form onSubmit={handleSubmit} style={{paddingTop: '0.5em'}}>
                    <div style={{marginBottom: "10px", display: "flex"}}>
                        <TextField id="firstname" label="First Name" value={firstName}
                                   onChange={(e) => setFirstName(e.target.value)} fullWidth
                                   style={{marginRight: "10px"}}/>
                        <TextField id="lastname" label="Last Name" value={lastName}
                                   onChange={(e) => setLastName(e.target.value)} fullWidth
                                   style={{marginBottom: "10px", marginLeft: "10px"}}/>
                    </div>
                    <TextField id="employeeId" label="Employee ID" type="text" value={employeeId}
                               onChange={(e) => setEmployeeId(e.target.value)} fullWidth
                               style={{marginBottom: "10px"}}/>
                    <TextField id="username" label="User Name" value={loginUserName}
                               onChange={(e) => setLoginUserName(e.target.value)} fullWidth
                               style={{marginBottom: "10px"}}/>
                    <TextField id="password" label="Password" type="password" value={password}
                               onChange={(e) => setPassword(e.target.value)} fullWidth style={{marginBottom: "15px"}}/>

                    <div style={{
                        marginTop: '16px',
                        marginBottom: "10px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        columnGap: '1.5em'
                    }}>
                        {/* UNIT DROP DOWN */}
                        <FormControl fullWidth style={{width: '6em'}}>
                            <InputLabel htmlFor="units-label" style={{marginTop: '-10px'}}>Unit</InputLabel>
                            <Select labelId="units-label" id="unit" onChange={handleUnitChange} fullWidth>
                                {(
                                    units.map((item) => (
                                        <MenuItem key={item.id} value={item.unit_code}>
                                            {item.unit_code}
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                        </FormControl>

                        {/* ROLE DROP DOWN */}
                        <FormControl fullWidth style={{width: '8em'}}>
                            <InputLabel htmlFor="role-label" style={{marginTop: '-10px',}}>Role</InputLabel>
                            <Select labelId="role-label" id="role" value={role}
                                    onChange={(e) => setRole(e.target.value)} fullWidth>
                                {userRoles.map((item) => (
                                    <MenuItem key={item.id} value={item.g_name}>
                                        {item.g_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* BUREAU DROP DOWN */}
                        <FormControl fullWidth style={{width: '12em'}}>
                            <InputLabel htmlFor="bureaus-label" style={{marginTop: '-10px',}}>Bureau</InputLabel>
                            <Select key={bureau} labelId="bureaus-label" id="bureaus" value={bureau}
                                    onChange={(e) => setBureau(e.target.value)} fullWidth>
                                {Array.isArray(bureaus) && bureaus.length > 0 ? (
                                    bureaus.map((item) => (
                                        <MenuItem key={item.id} value={item.b_name}>
                                            {item.b_name}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>Select a unit first</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </div>

                    <div style={{marginTop: "1em"}}>
                        <label htmlFor="enableBureau">Activate User</label>
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
                + Create User
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