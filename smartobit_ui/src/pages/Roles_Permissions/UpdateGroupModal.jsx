// Project Smart Obit for Malayala Manorama Co LTD
// Developed By Donis Abraham | Billan Jacob John | Afueth Thomas
// Start Date : 2024-10-07

import {useState, useEffect} from 'react';
import Modal from 'react-modal';
import TextField from '@mui/material/TextField';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import Button from '@mui/material/Button';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import UpdateIcon from '@mui/icons-material/Update';
import permissions from '../../configs/Permissions.jsx';
import Axios from 'axios';
import {API_BASE_URL} from '../../configs/config.jsx';
import {toast} from 'react-toastify';


Modal.setAppElement('#root');

const GenericModal = ({isOpen, onHide, onSubmit, rowData}) => {
    const username = localStorage.getItem("user")
    const [groupName, setGroupName] = useState();
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [permissionsList, setPermissionsList] = useState(permissions);

    useEffect(() => {
        if (rowData) {
            setGroupName(rowData.group_name)
            setSelectedPermissions(rowData.permissions || []);
        } else {
            setSelectedPermissions([]);
        }
    }, [rowData]);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (groupName === "") {
            window.alert('Please fill in all required fields.');
        } else {

            const permissionsStr = selectedPermissions.join(', ');
            Axios.post(API_BASE_URL + "/api/update_group", {

                groupName: groupName,
                permissions: permissionsStr,
                username: username
            })
                .then(response => {
                    toast(response.data.message)
                    handleClose();
                })
                .catch(error => {
                    toast('Error updating group', error)
                });
        }
    };

    const handleClose = () => {
        onHide();
        setGroupName("")
        setSelectedPermissions([])
        setTimeout(() => {
            window.location.reload()

        }, 1500);
    };

    const togglePermission = (permission) => {
        setSelectedPermissions((prevPermissions) => {
            if (prevPermissions.includes(permission)) {
                return prevPermissions.filter((p) => p !== permission);
            } else {
                return [...prevPermissions, permission];
            }
        });
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onHide} contentLabel="Generic Modal" style={{
            overlay: {backgroundColor: 'rgba(0, 0, 0, 0.5)',}, content: {
                display: 'flex', flexDirection: 'row', width: '800px', margin: 'auto',
                padding: '20px', marginTop: '50px', borderRadius: '8px',
            },
        }}
        >
            <div style={{flex: 1, marginRight: '20px', borderRight: '1px solid #ccc', padding: '20px'}}>
                <h5>
                    <UpdateIcon/>
                    <b> Update Group</b>
                </h5>
                <TextField label="Group Name" variant="outlined" fullWidth value={groupName}
                           onChange={(e) => setGroupName(e.target.value)}
                           style={{marginTop: '1em', marginBottom: '1em'}}/>

                <h5><SettingsSuggestIcon/><b> Selected Permissions</b></h5>
                {selectedPermissions.length === 0 ? (
                    <p>No permissions selected</p>
                ) : (
                    <ul>
                        {selectedPermissions.map((permissionId) => {
                            const permission = permissionsList.find(permission => permission.id === permissionId);
                            return (
                                <li key={permissionId}>{permission ? permission.name : 'No Permissions assigned'}</li>
                            );
                        })}
                    </ul>
                )}
            </div>

            <div style={{flex: 1}}>
                <h5>
                    <SettingsApplicationsIcon/>
                    <b> Permissions</b>
                </h5>
                <div>
                    {permissionsList.map((permission) => (
                        <div
                            key={permission.id} // Assuming permission has an `id` property for unique key
                            style={{
                                border: `2px solid ${selectedPermissions.includes(permission.id) ? 'blue' : 'black'}`,
                                borderRadius: '10px',
                                padding: '8px',
                                margin: '4px',
                                cursor: 'pointer',
                                display: 'inline-block',
                                backgroundColor: selectedPermissions.includes(permission.id) ? 'lightblue' : 'white',
                                transition: 'background-color 0.3s',
                            }}
                            onClick={() => togglePermission(permission.id)} // Assuming permission has an `id` property
                        >
                            {permission.name} {/* Assuming `name` is the property to display */}
                        </div>
                    ))}
                </div>
            </div>

            <div style={{alignSelf: 'flex-end', marginTop: 'auto', marginBottom: '20px'}}>
                <Button variant="contained" color="primary" style={{marginRight: '10px'}} onClick={handleSubmit}>
                    Submit
                </Button>
                <Button variant="contained" onClick={onHide} style={{backgroundColor: 'purple', color: 'white'}}>
                    Close
                </Button>
            </div>
        </Modal>
    );
};

export default GenericModal;
