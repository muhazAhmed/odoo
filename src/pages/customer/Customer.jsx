import React, { useEffect, useState } from 'react';
import "./customer.css";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Pagination, TextField } from '@mui/material';
import jsonData from '../../assets/Json/Verify Job Card.json';

const Customer = () => {
  const columns = [
    { field: "JobEntryID", headerName: "Job Entry ID", with:300 },
    { field: "ImpressionNo", headerName: "Impression Number", width: 200 },
    { field: "Patient", headerName: "Patient", width: 300 },
    { field: "CustomerName", headerName: "Customer Name", width: 300 },
    { field: "DoctorName", headerName: "Doctor Name", width: 200 },
    { field: "Location", headerName: "Location", width: 200 },
    { field: "City", headerName: "City", width: 100 },
  ];

  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setTableData(jsonData.map((row, index) => ({ id: index, ...row })));
    setTotalPages(Math.ceil(jsonData.length / 10));
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value - 1);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(0); // Reset the page when search query changes
  };

  const filteredData = tableData.filter((row) =>
    Object.values(row).some((value) =>
      value && value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div style={{ height: 600, width: "100%" }}>
      <TextField
        label="Search"
        value={search}
        onChange={handleSearchChange}
        variant="outlined"
        style={{ marginBottom: 10 }}
      />
      <DataGrid
        rows={filteredData}
        columns={columns}
        pageSize={10}
        pagination
        page={page}
        onPageChange={handlePageChange}
        rowCount={filteredData.length}
        pageSizeOptions={[10, 25, 50, 100]}
        slots={{ toolbar: GridToolbar }}
      />
      <Pagination
        count={totalPages}
        page={page + 1}
        onChange={handlePageChange}
        showFirstButton
        showLastButton
        siblingCount={5}
      />
    </div>
  );
};

export default Customer;
