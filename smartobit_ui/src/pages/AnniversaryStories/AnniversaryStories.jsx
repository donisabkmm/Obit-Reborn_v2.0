import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAmountDown, faSortAmountUp } from '@fortawesome/free-solid-svg-icons';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewStoryModal from "./ViewModal";
import cards from "./Data";

const AnnivesaryStories = (props) => {
  const [data, setData] = useState(cards);
  const [showViewStoryModal, setShowViewStoryModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  useEffect(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDate = today.getDate();

    const filteredItems = cards.filter((obit) => {
      const obitDate = new Date(obit.date);
      const obitYear = obitDate.getFullYear();
      const obitMonth = obitDate.getMonth() + 1;
      const obitDay = obitDate.getDate();

      // Check if the month and day match today's date, and the year is not the current year
      return (
        obitYear !== currentYear &&
        obitMonth === currentMonth &&
        obitDay === currentDate
      );
    });

    setData(filteredItems);
  }, []);

  const requestSort = (key) => {
    setSelectedColumn(key);
    setSortConfig({ key, direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' });
  };

  const handleViewButtonClick = (rowData) => {
    setSelectedRowData(rowData);
    setShowViewStoryModal(true);
  };

  const columns = [
    {
      name: 'obitID',
      label: 'ID',
      options: {
        setCellHeaderProps: () => ({
          style: { paddingLeft: '0em', textAlign: 'left', fontWeight: 'bold' } 
        })
      }
    },
    {
      name: 'photo',
      label: 'Photo',
      options: {
        customBodyRender: (value) => (
          value && <img src={value} alt="User" style={{ maxWidth: '4em', maxHeight: '4em' }} />
        ),
        setCellHeaderProps: () => ({
          style: { paddingLeft: '0em', textAlign: 'left', fontWeight: 'bold' } 
        })
      },
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
        customBodyRender: (value, tableMeta) => (
          <VisibilityIcon
            style={{ color: '#0946b0', cursor: 'pointer', scale: '70%' }}
            onClick={() => handleViewButtonClick(tableMeta.rowData)}
          />
        ),
        setCellHeaderProps: () => ({
          style: { paddingLeft: '0em', textAlign: 'left', fontWeight: 'bold' } 
        })
      },
    },
  ];

  const options = {
    selectableRows: 'none',
    responsive: 'standard',
    print: false,
    download: true,
    filter: true,
    search: true,
    viewColumns: true,
    pagination: true,
    rowsPerPage: rowsPerPage,
    rowsPerPageOptions: [8, 12, 16, 20],
    page: page,
    onChangePage: (currentPage) => setPage(currentPage),
    onChangeRowsPerPage: (numberOfRows) => setRowsPerPage(numberOfRows),
  };

  return (
    <div>
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

export default AnnivesaryStories;
