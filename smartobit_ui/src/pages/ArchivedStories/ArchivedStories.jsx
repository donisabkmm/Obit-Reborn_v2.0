import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewStoryModal from "./ViewStoryModal";
import { API_BASE_URL } from "../../configs/config"; // Importing base URL for API

const ArchivedStories = (props) => {
  const [data, setData] = useState([]); // Initialize as an empty array
  const [showViewStoryModal, setShowViewStoryModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  // Fetch data from API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/list_archivedStories`, {
          method: 'POST',  // POST request to FastAPI
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: page,
            rowsPerPage: rowsPerPage,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (result && result.fdata) {
          setData(result.fdata);  // Assuming the API returns 'fdata'
        } else {
          console.error("No data found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page, rowsPerPage]); // Dependencies to refetch on page/rowsPerPage changes

  const columns = [
    {
      name: 'archive_id',
      label: 'Archive ID',
      options: {
        setCellHeaderProps: () => ({
          style: { paddingLeft: '0em', textAlign: 'left', fontWeight: 'bold' }
        })
      }
    },
    {
      name: 'thumbnail',
      label: 'PHOTO',
      options: {
        setCellHeaderProps: () => ({
          style: { paddingLeft: '0em', textAlign: 'left', fontWeight: 'bold' }
        }),
        customBodyRender: (value) => (
          value && <img src={`data:image/jpeg;base64,${value}`} alt="Thumbnail" style={{ maxWidth: '4em', maxHeight: '4em' }} />
        ),
      }
    },
    {
      name: 'name',
      label: 'NAME',
      options: {
        setCellHeaderProps: () => ({
          style: { paddingLeft: '0em', textAlign: 'left', fontWeight: 'bold' }
        })
      }
    },
    {
      name: 'place',
      label: 'PLACE',
      options: {
        setCellHeaderProps: () => ({
          style: { paddingLeft: '0em', textAlign: 'left', fontWeight: 'bold' }
        })
      }
    },
    {
      name: 'date',
      label: 'DATE',
      options: {
        setCellHeaderProps: () => ({
          style: { paddingLeft: '0em', textAlign: 'left', fontWeight: 'bold' }
        })
      }
    },
    {
      name: 'unit',
      label: 'UNIT',
      options: {
        setCellHeaderProps: () => ({
          style: { paddingLeft: '0em', textAlign: 'left', fontWeight: 'bold' }
        })
      }
    },
    {
      name: 'bureau',
      label: 'BUREAU',
      options: {
        setCellHeaderProps: () => ({
          style: { paddingLeft: '0em', textAlign: 'left', fontWeight: 'bold' }
        })
      }
    },
    {
      name: 'actions',
      label: 'Actions',
      options: {
        setCellHeaderProps: () => ({
          style: { paddingLeft: '0em', textAlign: 'left', fontWeight: 'bold' }
        }),
        customBodyRender: (value, tableMeta) => (
          <VisibilityIcon
            style={{ color: '#0946b0', cursor: 'pointer', scale: '70%' }}
            onClick={() => handleViewButtonClick(tableMeta.rowData)}
          />
        ),
      },
    },
  ];

  const options = {
    selectableRows: 'none',
    responsive: 'standard',
    print: false,
    download: true,
    search: true,
    viewColumns: true,
    pagination: true,
    page: page,
    rowsPerPage: rowsPerPage,
    rowsPerPageOptions: [8],
    onChangePage: (currentPage) => setPage(currentPage),
  };

  const handleViewButtonClick = (rowData) => {
    console.log("Selected Row Data:", rowData);  // Debugging to inspect the row data
    setSelectedRowData(rowData);
    setShowViewStoryModal(true);
  };
  

  return (
    <div style={{ maxWidth: '100%', padding: '20px', maxHeight: '800px', overflowY: 'auto' }}>
      {showViewStoryModal && (
        <ViewStoryModal
          show={showViewStoryModal}
          onHide={() => setShowViewStoryModal(false)}
          rowData={selectedRowData}
        />
      )}

      {!showViewStoryModal && (
        <MUIDataTable
          data={data}
          columns={columns}
          options={options}
        />
      )}
    </div>
  );
};

export default ArchivedStories;
