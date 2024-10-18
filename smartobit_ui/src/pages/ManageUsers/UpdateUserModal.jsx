// Project Smart Obit for Malayala Manorama Co LTD
// Developed By Donis Abraham | Billan Jacob John | Afueth Thomas
// Start Date : 2024-10-07

import {useState, forwardRef, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import Axios from 'axios';
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Switch from "@mui/material/Switch";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {API_BASE_URL} from "../../configs/config.jsx";
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

const UpdateUserModal = forwardRef(({show, onHide, rowData}, ref) => {
    const username = localStorage.getItem("user")
    const navigate = useNavigate();
    const [uid, setUid] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [loginUserName, setLoginUserName] = useState("");
    const [role, setRole] = useState("");
    const [roles, setRoles] = useState([]);
    const [unit, setUnit] = useState("");
    const [units, setUnits] = useState([]);
    const [bureau, setBureau] = useState("");
    const [bureaus, setBureaus] = useState([]);
    const [checked, setChecked] = useState();
    const [resetPasswordModal, setResetPasswordModal] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const fetchData = () => {
        Axios.post(API_BASE_URL + '/api/fetch_all_units')
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
        Axios.post(API_BASE_URL + '/api/fetch_role')
            .then(response => {
                if (response.data.fdata) {
                    setRoles(response.data.fdata)
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

    useEffect(() => {

        if (rowData) {
            setUid(rowData.id)
            setFirstName(rowData.firstname);
            setLastName(rowData.lastname);
            setEmployeeId(rowData.employeeId);
            setLoginUserName(rowData.username);
            setRole(rowData.role);
            setUnit(rowData.unit);
            setBureau(rowData.bureau);
            setChecked(rowData.status === "Active" ? true : false);
            fetchBureau(rowData.unit);
        }
    }, [rowData]);
    const handleClose = () => {
        onHide();
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
        await Axios.post(API_BASE_URL + '/api/fetch_bureaus_based_on_units_code', unit_code)
            .then(response => {
                if (response.data.fdata) {
                    setBureaus(response.data.fdata)
                }
                if (response.data.message) {
                    toast(response.data.message)
                }
            })
    };


    const upsertData = (hashedPassword) => {
        Axios.post(API_BASE_URL + "/api/update_password", {
                uid: rowData.id,
                password: hashedPassword,
                updated_by: username
            }
        )
            .then(response => {
                toast(response.data.message)
                handleResetPasswordClose()
            })
            .catch(error => {
                toast('Error updating group', error)
            });
    }

    function logout() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        toast("Logging Out! Sign in again....")
        setTimeout(() => {
            localStorage.removeItem('dakToken');
            localStorage.removeItem('AdminLTE:IFrame:Options')
            localStorage.removeItem('firstname')
            localStorage.removeItem('secondname')
            localStorage.removeItem('user')
            localStorage.removeItem('permissions')
            navigate("/")
        }, 2000);
    }

    const passwordSubmit = () => {
        if (newPassword === confirmPassword) {
            if (newPassword === "" && confirmPassword === "") {
                window.alert('Please fill in all required fields.');
            } else {
                const salt = '$2a$10$D5QdrG2WDMjYXtUHURwXWO';
                const hashedPassword = bcrypt.hashSync(newPassword, salt);
                if (loginUserName === username) {
                    upsertData(hashedPassword)
                    logout()
                } else {
                    upsertData(hashedPassword)
                }
            }
        } else {
            toast("Password not matching")
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault();

        if (firstName === "" || lastName === "" || loginUserName === "" || employeeId === "" ||
            role === "" || unit === "" || bureau === "") {
            window.alert('Please fill in all required fields.');
        } else {

            const userData = {

                uid: uid,
                firstname: firstName,
                lastname: lastName,
                employeeId: employeeId,
                username: loginUserName,
                unit: unit,
                bureau: bureau,
                role: role,
                updated_by: username,
                status: checked ? 1 : 0
            }
            Axios.post(API_BASE_URL + '/api/update_user', userData)
                .then(response => {
                    toast(response.data.message);
                    handleClose();
                })
                .catch(error => {
                    toast('Error updating user:', error);
                });
        }
    };

    const handleResetPassword = () => {
        setResetPasswordModal(true);
    };

    const handleResetPasswordClose = () => {
        setResetPasswordModal(false);
    };

    const handleResetPasswordSubmit = () => {
        if (newPassword !== confirmPassword) {
            window.alert('Passwords do not match.');
        } else {
            setResetPasswordModal(false);
            console.log('Reset password:', newPassword);
        }
    };

    return (
        <>
            <Modal open={show} onClose={onHide} aria-labelledby="update-user-modal"
                   aria-describedby="update-user-modal-description">
                <div style={modalStyle}>
                    <h4 style={{paddingLeft: '3.5em'}}><b>Update User</b></h4>
                    <form onSubmit={handleSubmit} style={{paddingTop: '1em'}}>
                        <div style={{marginBottom: "10px", display: "flex"}}>
                            <TextField id="firstname" label="First Name" value={firstName}
                                       onChange={(e) => setFirstName(e.target.value)}
                                       fullWidth style={{marginRight: "10px"}}
                            />
                            <TextField id="lastname" label="Last Name" value={lastName}
                                       onChange={(e) => setLastName(e.target.value)}
                                       fullWidth style={{marginBottom: "10px", marginLeft: "10px"}}
                            />
                        </div>
                        <TextField id="employeeId" label="Employee ID" type="number" value={employeeId}
                                   onChange={(e) => setEmployeeId(e.target.value)}
                                   fullWidth style={{marginBottom: "10px"}}
                        />
                        <TextField id="username" label="User Name" value={loginUserName}
                                   onChange={(e) => setLoginUserName(e.target.value)}
                                   fullWidth style={{marginBottom: "10px"}}
                        />

                        <div style={{
                            marginTop: '16px',
                            marginBottom: "10px",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            columnGap: '1.5em'
                        }}>
                            <FormControl fullWidth style={{width: '6em'}}>
                                <InputLabel htmlFor="units-label" style={{marginTop: '-10px'}}>Unit</InputLabel>
                                <Select labelId="units-label" id="unit" value={unit} onChange={handleUnitChange}
                                        fullWidth>
                                    {(
                                        units.map((item) => (
                                            <MenuItem key={item.id} value={item.unit_code}>
                                                {item.unit_code}
                                            </MenuItem>
                                        ))
                                    )}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth style={{width: '8em'}}>
                                <InputLabel htmlFor="role-label" style={{marginTop: '-10px',}}>Role</InputLabel>
                                <Select labelId="role-label" id="role" value={role}
                                        onChange={(e) => setRole(e.target.value)} fullWidth>
                                    {roles.map((item) => (
                                        <MenuItem key={item.id} value={item.g_name}>
                                            {item.g_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth style={{width: '12em'}}>
                                <InputLabel htmlFor="bureaus-label" style={{marginTop: '-10px',}}>Bureau</InputLabel>
                                <Select labelId="bureaus-label" id="bureaus" value={bureau}
                                        onChange={(e) => setBureau(e.target.value)} fullWidth>
                                    {Array.isArray(bureaus) && bureaus.length > 0 ? (
                                        bureaus.map((item) => (
                                            <MenuItem key={item.id} value={item.b_name}>
                                                {item.b_name}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>No bureaus available</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </div>

                        <div style={{marginTop: "1em"}}>
                            <label htmlFor="enableBureau">Activate Unit</label>
                            <Switch checked={checked} onChange={handleCheckChange}
                                    inputProps={{'aria-label': 'controlled'}}
                            />
                        </div>

                        <div style={{marginTop: "20px", textAlign: "right", gridColumn: "span 2"}}>
                            <Button variant="outlined" color="secondary" onClick={onHide} style={{marginRight: "10px"}}>
                                Close
                            </Button>
                            <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                                Update
                            </Button>
                            <Button variant="outlined" color="primary" onClick={handleResetPassword}
                                    style={{marginLeft: "10px"}}>
                                Reset Password
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>

            <Modal open={resetPasswordModal} onClose={handleResetPasswordClose} aria-labelledby="reset-password-modal"
                   aria-describedby="reset-password-modal-description">
                <div style={{...modalStyle, width: '40%'}}>
                    <h4 style={{paddingLeft: '3.5em'}}><b>Reset Password</b></h4>
                    <form onSubmit={handleResetPasswordSubmit} style={{paddingTop: '1em'}}>
                        <TextField id="new-password" label="New Password" type="password" value={newPassword}
                                   onChange={(e) => setNewPassword(e.target.value)}
                                   fullWidth style={{marginBottom: "10px"}}
                        />
                        <TextField id="confirm-password" label="Confirm Password" type="password"
                                   value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                   fullWidth style={{marginBottom: "10px"}}
                        />

                        <div style={{marginTop: "20px", textAlign: "right", gridColumn: "span 2"}}>
                            <Button variant="outlined" color="secondary" onClick={handleResetPasswordClose}
                                    style={{marginRight: "10px"}}>
                                Close
                            </Button>
                            <Button type="submit" variant="contained" color="primary" onClick={passwordSubmit}>
                                Reset
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
});

export default UpdateUserModal;