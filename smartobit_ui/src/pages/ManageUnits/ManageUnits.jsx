// Project Smart Obit for Malayala Manorama Co LTD
// Developed By Donis Abraham | Billan Jacob John | Afueth Thomas
// Start Date : 2024-10-07

import {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import CreateUnitModal from "./CreateUnitModal.jsx";
import UpdateUnitModal from "./UpdateUnitModal.jsx";
import DeleteUnitModal from "./DeleteUnitModal.jsx";
import ViewUnitModal from "./ViewUnitModal.jsx";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EyeIcon from '@mui/icons-material/RemoveRedEye';
import axios from "axios";
import {API_BASE_URL} from "../../configs/config.jsx";
import {toast} from 'react-toastify'


const ManageUnits = () => {
    const [data, setData] = useState();
    const [showCreateUnitModal, setShowCreateUnitModal] = useState(false);
    const [showUpdateUnitModal, setShowUpdateUnitModal] = useState(false);
    const [showDeleteUnitModal, setShowDeleteUnitModal] = useState(false);
    const [showViewUnitModal, setShowViewUnitModal] = useState(false);
    const [filteredBureauData, setfilteredBureauData] = useState([]);
    const [filteredUserData, setfilteredUserData] = useState([]);

    const [selectedRowData, setSelectedRowData] = useState(null);
    const [page, setPage] = useState(0);

    function fetchData() {
        try {
            axios.post(API_BASE_URL + "/api/list_units")
                .then(response => {
                    setData(response.data.fdata);
                })
        } catch (error) {
            toast("An Error occurred!" + error)
        }
    }

    const handleCreateModalClose = () => {
        setShowCreateUnitModal(false);

    };


    const CustomToolbar = () => (
        <CreateUnitModal show={showCreateUnitModal} onHide={handleCreateModalClose}/>
    );


    useEffect(() => {
        fetchData()
    }, []);


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
    const columns = [
        {
            name: 'unitId',
            label: 'ID',
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
        // Repeat for other columns
        {
            name: 'district',
            label: 'DISTRICT',
            options: {
                setCellHeaderProps: () => ({
                    style: {paddingLeft: '0em', textAlign: 'left', fontWeight: 'bold'}
                })
            }
        },
        {
            name: 'email',
            label: 'Email ID',
            options: {
                setCellHeaderProps: () => ({
                    style: {paddingLeft: '0em', textAlign: 'left', fontWeight: 'bold'}
                })
            }
        },
        {
            name: 'users',
            label: 'USERS',
            options: {
                setCellHeaderProps: () => ({
                    style: {paddingLeft: '0em', textAlign: 'left', fontWeight: 'bold'}
                })
            }
        },
        {
            name: 'bureaus',
            label: 'BUREAUS',
            options: {
                setCellHeaderProps: () => ({
                    style: {paddingLeft: '0em', textAlign: 'left', fontWeight: 'bold'}
                })
            }
        },
        {
            name: 'editions',
            label: 'EDITIONS',
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
                        <EyeIcon
                            className="view"
                            style={{cursor: 'pointer', color: '#00008B'}}
                            onClick={() => handleView(tableMeta.rowData)}
                        />
                        <EditIcon
                            className="edit"
                            style={{cursor: 'pointer', color: '#00008B'}}
                            onClick={() => handleEdit(tableMeta.rowData)}
                        />
                        <DeleteIcon
                            className="delete"
                            style={{cursor: 'pointer', color: '#00008B'}}
                            onClick={() => handleDelete(tableMeta.rowData)}
                        />
                    </div>
                ),
                setCellHeaderProps: () => ({
                    style: {paddingLeft: '0em', textAlign: 'left', fontWeight: 'bold'} // Ensure consistency in styling
                })
            },
        },
    ];


    const handleEdit = (rowData) => {
        setSelectedRowData(rowData);
        setShowUpdateUnitModal(true);
    };

    const handleDelete = (rowData) => {
        setSelectedRowData(rowData);
        setShowDeleteUnitModal(true);
    };
    const handleView = (rowData) => {
        setSelectedRowData(rowData);
        setShowViewUnitModal(true);
        axios.post(API_BASE_URL + "/api/fetch_bureaus_based_on_units_id", {
            unit_id: rowData[0]
        })
            .then(response => {
                if (response.data.fdata) {
                    setfilteredBureauData(response.data.fdata)
                }
                if (response.data.message) {
                    toast(response.data.message)
                }
            })
        axios.post(API_BASE_URL + "/api/fetch_users_based_on_units_id", {
            unit_id: rowData[0]
        })
            .then(response => {
                if (response.data.fdata) {
                    setfilteredUserData(response.data.fdata)
                }
                if (response.data.message) {
                    toast(response.data.message)
                }
            })
    };

    return (
        <div style={{maxWidth: '100%', padding: '20px', maxHeight: '800px', overflowY: 'auto'}}>
            <MUIDataTable data={data} columns={columns} options={options}/>
            <ViewUnitModal
                show={showViewUnitModal}
                onHide={() => setShowViewUnitModal(false)}
                rowData={selectedRowData}
                filteredBureauData={filteredBureauData}
                filteredUserData={filteredUserData}
            />
            <UpdateUnitModal
                show={showUpdateUnitModal}
                onHide={() => setShowUpdateUnitModal(false)}
                rowData={selectedRowData}
            />

            <DeleteUnitModal
                show={showDeleteUnitModal}
                onHide={() => setShowDeleteUnitModal(false)}
                rowData={selectedRowData}
            />
        </div>
    );
};

export default ManageUnits;
