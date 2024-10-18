// Project Smart Obit for Malayala Manorama Co LTD
// Developed By Donis Abraham | Billan Jacob John | Afueth Thomas
// Start Date : 2024-10-07

import {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import CreateBureauModal from "./CreateBureauModal.jsx";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEye';
import UpdateBureauModal from "./UpdateBureauModal.jsx";
import DeleteBureauModal from "./DeleteBureauModal.jsx";
import ViewBureauModal from "./ViewBureauModal.jsx";
import axios from "axios";
import {API_BASE_URL} from "../../configs/config.jsx";

const DataTable = () => {
    const [showCreateBureauModal, setShowCreateBureauModal] = useState(false);
    const [showUpdateBureauModal, setShowUpdateBureauModal] = useState(false);
    const [showViewBureauModal, setShowViewBureauModal] = useState(false);

    const [selectedRowData, setSelectedRowData] = useState(null);
    const [showDeleteBureauModal, setShowDeleteBureauModal] = useState(false);
    const [data, setData] = useState();

    const fetchData = () => {
        axios.post(API_BASE_URL + '/api/list_bureau')
            .then(response => {
                if (response.data.fdata) {
                    setData(response.data.fdata)
                }
                if (response.data.message) {
                    toast(response.data.message)
                }
            })
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleEditButtonClick = (rowData) => {
        setSelectedRowData(rowData);
        setShowUpdateBureauModal(true);
    };
    const handleviewButtonClick = (rowData) => {
        setSelectedRowData(rowData);
        setShowViewBureauModal(true);
    };

    const handleDeleteButtonClick = (rowData) => {
        setSelectedRowData(rowData);
        setShowDeleteBureauModal(true);
    };
    const columns = [
        {
            name: 'b_id',
            label: 'ID',
            options: {
                setCellHeaderProps: () => ({
                    style: {paddingLeft: '0em', textAlign: 'left', fontWeight: 'bold'}
                })
            }
        },
        {
            name: 'b_name',
            label: 'Name',
            options: {
                setCellHeaderProps: () => ({
                    style: {paddingLeft: '0em', textAlign: 'left', fontWeight: 'bold'}
                })
            }
        },
        {
            name: 'b_code',
            label: 'Bureau Code',
            options: {
                setCellHeaderProps: () => ({
                    style: {paddingLeft: '0em', textAlign: 'left', fontWeight: 'bold'}
                })
            }
        },
        {
            name: 'b_email',
            label: 'Email ID',
            options: {
                setCellHeaderProps: () => ({
                    style: {paddingLeft: '0em', textAlign: 'left', fontWeight: 'bold'}
                })
            }
        },
        {
            name: 'unit',
            label: 'Unit',
            options: {
                setCellHeaderProps: () => ({
                    style: {paddingLeft: '0em', textAlign: 'left', fontWeight: 'bold'}
                })
            }
        },
        {
            name: 'user_count',
            label: 'No of Users',
            options: {
                setCellHeaderProps: () => ({
                    style: {paddingLeft: '0em', textAlign: 'left', fontWeight: 'bold'}
                })
            }
        },
        {
            name: 'status',
            label: 'Status',
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
            label: 'Actions',
            options: {
                setCellHeaderProps: () => ({
                    style: {paddingLeft: '0em', textAlign: 'left', fontWeight: 'bold'}
                }),
                customBodyRender: (value, tableMeta, updateValue) => (
                    <div style={{display: 'flex', justifyContent: 'space-between', width: 90}}>
                        <EyeIcon
                            style={{cursor: 'pointer', color: '#00008B'}}
                            onClick={() => handleviewButtonClick(tableMeta.rowData)}
                        />
                        <EditIcon
                            style={{cursor: 'pointer', color: '#00008B'}}
                            onClick={() => handleEditButtonClick(tableMeta.rowData)}
                        />
                        <DeleteIcon
                            style={{cursor: 'pointer', color: '#00008B'}}
                            onClick={() => handleDeleteButtonClick(tableMeta.rowData)}
                        />
                    </div>
                ),
            },
        },
    ];

    const CustomToolbar = () => (
        <CreateBureauModal show={showCreateBureauModal} onHide={setShowCreateBureauModal}/>
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
        rowsPerPage: 8,
        rowsPerPageOptions: [8],
        customToolbar: CustomToolbar,
    };

    return (
        <div style={{maxWidth: '100%', padding: '20px', maxHeight: '800px', overflowY: 'auto'}}>
            <MUIDataTable
                data={data}
                columns={columns}
                options={options}
            />
            <ViewBureauModal
                show={showViewBureauModal}
                onHide={() => setShowViewBureauModal(false)}
                rowData={selectedRowData}
            />

            <UpdateBureauModal
                show={showUpdateBureauModal}
                onHide={() => setShowUpdateBureauModal(false)}
                rowData={selectedRowData}
            />

            <DeleteBureauModal
                show={showDeleteBureauModal}
                onHide={() => setShowDeleteBureauModal(false)}
                rowData={selectedRowData}
            />

        </div>
    );
};

export default DataTable;
