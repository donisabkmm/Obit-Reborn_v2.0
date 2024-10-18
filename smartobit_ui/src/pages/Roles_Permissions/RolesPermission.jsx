// Project Smart Obit for Malayala Manorama Co LTD
// Developed By Donis Abraham | Billan Jacob John | Afueth Thomas
// Start Date : 2024-10-07

import {useState, useEffect} from "react";
import MUIDataTable from "mui-datatables";
import {Button} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import CreateGroupModal from "./CreateGroupModal.jsx";
import UpdateGroupModal from "./UpdateGroupModal.jsx";
import DeleteGroupModal from "./DeleteGroupModal.jsx";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {toast} from 'react-toastify'
import axios from "axios";
import permissions from "../../configs/Permissions.jsx";
import {API_BASE_URL} from "../../configs/config.jsx";

const RolesPermissions = () => {

    const [permissionsData, setPermissionsData] = useState();

    function fetchRoles() {
        try {
            axios.post(API_BASE_URL + "/api/list_roles")
                .then(response => {
                    setRoles(response.data.fdata);
                })
        } catch (error) {
            toast("An Error occurred!" + error)
        }
    }

    function fetchPermissions() {
        try {
            axios.post(API_BASE_URL + "/api/list_allpermissions")
                .then(response => {
                    setPermissionsData(response.data.fdata);
                })
        } catch (error) {
            toast("An Error occurred!" + error)
        }
    }

    useEffect(() => {
        fetchRoles();
        fetchPermissions();
    }, []);


    const [data, setRoles] = useState();
    const [showUpdateGroupModal, setShowUpdateGroupModal] = useState(false);
    const [showDeleteGroupModal, setShowDeleteGroupModal] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [page, setPage] = useState(0);


    const handleEditButtonClick = (rowData) => {
        setSelectedRowData(rowData);
        setShowUpdateGroupModal(true);
    };
    const handleDeleteButtonClick = (rowData) => {
        setSelectedRowData(rowData);
        setShowDeleteGroupModal(true);
    };

    const columns = [
        {
            name: 'id',
            label: 'ID',
            options: {
                setCellHeaderProps: () => ({
                    style: {paddingLeft: '0em', textAlign: 'left', fontWeight: 'bold'}
                })
            }
        },
        {
            name: 'group_name',
            label: 'ROLE',
            options: {
                setCellHeaderProps: () => ({
                    style: {paddingLeft: '0em', textAlign: 'left', fontWeight: 'bold'}
                })
            }
        },
        ...permissions.map(permission => ({
            name: permission.id, // Use the permission ID as the column name
            label: permission.name.toUpperCase(),
            options: {
                customBodyRender: (value, tableMeta) => {
                    const rowData = data[tableMeta.rowIndex];
                    const hasPermission = rowData.permissions.includes(permission.id);
                    return hasPermission ? <CheckIcon color="success"/> : <CloseIcon color="error"/>;
                },
                setCellHeaderProps: () => ({
                    style: {paddingLeft: '0em', textAlign: 'left', fontWeight: 'bold'}
                })
            }
        })),
        {
            name: "actions",
            label: "ACTIONS",
            options: {
                customBodyRender: (value, tableMeta) => (
                    <div style={{display: "flex", justifyContent: "space-between", width: 90}}>
                        <FontAwesomeIcon
                            icon={faEdit}
                            title="Edit"
                            style={{cursor: "pointer", color: "#00008B"}}
                            onClick={() => handleEditButtonClick(data[tableMeta.rowIndex])}
                        />
                        <FontAwesomeIcon
                            icon={faTrash}
                            title="Delete"
                            style={{cursor: "pointer", color: "#00008B"}}
                            onClick={() => handleDeleteButtonClick(data[tableMeta.rowIndex])}
                        />
                    </div>
                ),
            },
        },
    ];

    const CustomToolbar = () => (
        <Button
            variant="outline-primary"
            style={{borderColor: "#00008B", color: "#00008B"}}
            onClick={() => setIsModalOpen(true)}
        >
            + Create Group
        </Button>
    );

    const options = {
        selectableRows: 'none',
        responsive: 'standard',
        print: false,
        download: false,
        filter: false,
        search: true,
        viewColumns: false,
        pagination: true,
        page: page,
        rowsPerPage: 10,
        rowsPerPageOptions: [10],
        onChangePage: (currentPage) => setPage(currentPage),
        customToolbar: CustomToolbar,
    };
    return (
        <div style={{maxWidth: '100%', padding: '20px', maxHeight: '800px', overflowY: 'auto'}}>
            <CreateGroupModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}/>
            <UpdateGroupModal isOpen={showUpdateGroupModal} onHide={() => setShowUpdateGroupModal(false)}
                              rowData={selectedRowData}/>
            <DeleteGroupModal show={showDeleteGroupModal} onHide={() => setShowDeleteGroupModal(false)}
                              rowData={selectedRowData}/>
            <MUIDataTable data={data} columns={columns} options={options}/>

        </div>
    );
};

export default RolesPermissions;
