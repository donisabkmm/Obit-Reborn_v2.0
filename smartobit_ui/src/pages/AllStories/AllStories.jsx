import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { API_BASE_URL } from "../../configs/config"; // Assuming you have this for the base API URL

const AllStories = () => {
  const [data, setData] = useState([]); // Initialize as an empty array
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/list_allStories`, {
          method: "POST", // POST request to FastAPI
          headers: {
            "Content-Type": "application/json",
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
          setData(result.fdata); // Assuming the API returns 'fdata'
        } else {
          console.error("No data found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page, rowsPerPage]); // Refetch the data when page or rowsPerPage change

  const columns = [
    {
      name: "story_id",
      label: "Story ID",
      options: {
        setCellHeaderProps: () => ({
          style: { paddingLeft: "0em", textAlign: "left", fontWeight: "bold" },
        }),
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        setCellHeaderProps: () => ({
          style: { paddingLeft: "0em", textAlign: "left", fontWeight: "bold" },
        }),
      },
    },
    {
      name: "place",
      label: "Place",
      options: {
        setCellHeaderProps: () => ({
          style: { paddingLeft: "0em", textAlign: "left", fontWeight: "bold" },
        }),
      },
    },
    {
      name: "unit",
      label: "Unit",
      options: {
        setCellHeaderProps: () => ({
          style: { paddingLeft: "0em", textAlign: "left", fontWeight: "bold" },
        }),
      },
    },
    {
      name: "bureau",
      label: "Bureau",
      options: {
        setCellHeaderProps: () => ({
          style: { paddingLeft: "0em", textAlign: "left", fontWeight: "bold" },
        }),
      },
    },
    {
      name: "photo_url",
      label: "Photo",
      options: {
        setCellHeaderProps: () => ({
          style: { paddingLeft: "0em", textAlign: "left", fontWeight: "bold" },
        }),
        customBodyRender: (value) => (
          value && <img src={`${API_BASE_URL}${value}`} alt="Story Photo" style={{ maxWidth: "100px", maxHeight: "100px" }} />
        ),
      },
    },
  ];

  const options = {
    selectableRows: "none",
    responsive: "standard",
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

  return (
    <div style={{ maxWidth: "100%", padding: "20px", maxHeight: "800px", overflowY: "auto" }}>
      <MUIDataTable data={data} columns={columns} options={options} />
    </div>
  );
};

export default AllStories;
