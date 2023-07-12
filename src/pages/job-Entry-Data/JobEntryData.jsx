import React, { useEffect, useState } from "react";
import "./jobEntryData.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Pagination, TextField, Typography } from "@mui/material";
import axios from "axios";
import CloseModel from "../../components/models/CloseModel/CloseModal";
import { Loading } from "../../components/Loader/Loader";
import { API_URL } from "../../assets/API_URL/API_URL";
import { ServerVariableService } from "../../utils/ServerVariables";

const JobEntryData = () => {
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCustomer();
  }, []);

  const fetchCustomer = async () => {
    setLoading(true);
    try {
      const result = await axios.get(
        API_URL+ServerVariableService.jobEntryData
      );
      const jsonData = result.data.data.List;

      // Dynamically generate columns based on the first row of data
      const firstRow = jsonData[0];
      const dynamicColumns = Object.keys(firstRow).map((key) => ({
        field: key,
        headerName: key,
        width: 200,
      }));
      setColumns(dynamicColumns);

      setTableData(jsonData.map((row, index) => ({ id: index, ...row })));
      setTotalPages(Math.ceil(jsonData.length / 10));
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handlePageChange = (event, value) => {
    setPage(value - 1);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(0);
  };

  // Save and retrieve the applied filter from localStorage
  useEffect(() => {
    const savedFilter = localStorage.getItem("customerDataFilter");
    if (savedFilter) {
      setSearch(savedFilter);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("customerDataFilter", search);
  }, [search]);

  const rowsPerPage = 10;
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const filteredData = tableData
    .filter((row) =>
      Object.values(row).some(
        (value) =>
          value && value.toString().toLowerCase().includes(search.toLowerCase())
      )
    )
    .slice(startIndex, endIndex);

  return (
    <div style={{ height: 540, width: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <TextField
          label="Search"
          value={search}
          onChange={handleSearchChange}
          variant="outlined"
          style={{
            marginBottom: 10,
            marginTop: 10,
            width: "12rem",
            fontSize: "6px",
          }}
        />
        <CloseModel />
      </div>

      {loading && <Loading />}
      {error ? (
        <Typography variant="h4" color="error">
          {error}
        </Typography>
      ) : (
        <>
          <DataGrid
            rows={filteredData}
            columns={columns}
            pageSize={10}
            pagination
            page={page}
            onPageChange={handlePageChange}
            rowCount={tableData.length}
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
        </>
      )}
    </div>
  );
};

export default JobEntryData;
