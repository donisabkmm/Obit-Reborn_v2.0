// Project Smart Obit for Malayala Manorama Co LTD
// Developed By Donis Abraham | Billan Jacob John | Afueth Thomas
// Start Date : 2024-10-07

import {useState, forwardRef, useEffect} from "react";
import MUIDataTable from "mui-datatables";
import {Edit as EditIcon, Delete as DeleteIcon} from '@mui/icons-material';
import CreateUserModal from "./CreateUserModal";
import UpdateUserModal from "./UpdateUserModal.jsx";
import DeleteUserModal from "./DeleteUserModal.jsx";
import axios from "axios";
import {API_BASE_URL} from "../../configs/config.jsx";

const ManageUsers = forwardRef(() => {
    const [data, setData] = useState([]);
    const [listData, setListData] = useState([]);
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);
    const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [page, setPage] = useState(0);


    const fetchData = () => {
        axios.post(API_BASE_URL + "/api/list_users")
            .then(response => {
                setData(response.data.fdata)
                list_preproccesor(response.data.fdata)
            })
    }
    const list_preproccesor = (data) => {
        const modifiedList = data.map(item => ({
            ...item,
            name: `${item.u_firstname} ${item.u_lastname}`
        }));
        setListData(modifiedList);
    }
    useEffect(() => {
        fetchData()
    }, []);
    const handleEditButtonClick = (rowData) => {
        setSelectedRowData(rowData);
        setShowUpdateUserModal(true);
    };

    const handleDeleteButtonClick = (rowData) => {
        setSelectedRowData(rowData);
        setShowDeleteUserModal(true);
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
            name: 'firstname',
            label: 'Firstname',
            options: {
                setCellHeaderProps: () => ({
                    style: {paddingLeft: '0em', textAlign: 'left', fontWeight: 'bold'}
                }),
                display: 'false'

            }

        },
        {
            name: 'lastname',
            label: 'Lastname',
            options: {
                setCellHeaderProps: () => ({
                    style: {paddingLeft: '0em', textAlign: 'left', fontWeight: 'bold'}
                }),
                display: 'false'

            }
        },
        {
            name: 'User',
            label: 'NAME',
            options: {
                setCellHeaderProps: () => ({
                    style: {paddingLeft: '0em', textAlign: 'left', fontWeight: 'bold'}
                })
            },
        },
        {
            name: 'employeeId',
            label: 'Emp ID',
            options: {
                setCellHeaderProps: () => ({
                    style: {paddingLeft: '0em', textAlign: 'left', fontWeight: 'bold'}
                })
            },
        },
        {
            name: 'username',
            label: 'USERNAME',
            options: {
                setCellHeaderProps: () => ({
                    style: {paddingLeft: '0em', textAlign: 'left', fontWeight: 'bold'}
                })
            }
        },
        {
            name: 'role',
            label: 'ROLE',
            options: {
                setCellHeaderProps: () => ({
                    style: {paddingLeft: '0em', textAlign: 'left', fontWeight: 'bold'}
                })
            }
        },
        {
            name: 'unit',
            label: 'UNIT',
            options: {
                setCellHeaderProps: () => ({
                    style: {paddingLeft: '0em', textAlign: 'left', fontWeight: 'bold'}
                })
            }
        },
        {
            name: 'bureau',
            label: 'BUREAU',
            options: {
                setCellHeaderProps: () => ({
                    style: {paddingLeft: '0em', textAlign: 'left', fontWeight: 'bold'}
                })
            }
        },
        {
            name: 'status',
            label: 'STATUS',
            options: {
                customBodyRender: (value) => {
                    const style = {
                        fontWeight: 'bold',
                        paddingLeft: '1em',
                        textAlign: 'left',
                        color: value === "Active" ? "green" : "red"
                    };
                    return <div style={style}>{value}</div>;
                }
            }
        },
        {
            name: 'actions',
            label: 'ACTIONS',
            options: {
                customBodyRender: (value, tableMeta) => (
                    <div style={{display: 'flex', justifyContent: 'space-between', width: 90}}>
                        <EditIcon
                            className="edit"
                            style={{cursor: 'pointer', color: '#00008B'}}
                            onClick={() => handleEditButtonClick(data[tableMeta.rowIndex])}
                        />
                        <DeleteIcon
                            className="delete"
                            style={{cursor: 'pointer', color: '#00008B'}}
                            onClick={() => handleDeleteButtonClick(data[tableMeta.rowIndex])}
                        />
                    </div>
                ),
                setCellHeaderProps: () => ({
                    style: {paddingLeft: '0px', textAlign: 'left', fontWeight: 'bold'} // Ensure consistency in styling
                })
            },
        },
    ];

    const CustomToolbar = () => (
        <CreateUserModal show={showCreateUserModal} onHide={setShowCreateUserModal}/>
    );

    const options = {
        selectableRows: 'none',
        responsive: 'standard',
        print: false,
        download: true,
        filter: true,
        search: true,
        viewColumns: false,
        pagination: true,
        page: page,
        rowsPerPage: 8,
        rowsPerPageOptions: [8],
        onChangePage: (currentPage) => setPage(currentPage),
        customToolbar: CustomToolbar,
    };

    return (
        <div style={{maxWidth: '100%', padding: '20px', maxHeight: '800px', overflowY: 'auto'}}>
            <MUIDataTable data={listData} columns={columns} options={options}/>
            <UpdateUserModal
                show={showUpdateUserModal}
                onHide={() => setShowUpdateUserModal(false)}
                rowData={selectedRowData}
            />
            <DeleteUserModal
                show={showDeleteUserModal}
                onHide={() => setShowDeleteUserModal(false)}
                rowData={selectedRowData}
            />
        </div>
    );
});

export default ManageUsers;







