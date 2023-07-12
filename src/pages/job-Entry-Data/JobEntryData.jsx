import React, { useEffect, useState } from "react";
import "./jobEntryData.css";
import JsonData from "../../assets/Json/JobEntry_Data.json";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Pagination, TextField, Typography } from "@mui/material";
// import axios from "axios";
import CloseModel from "../../components/models/CloseModel/CloseModal";
import { Loading } from "../../components/Loader/Loader";
// import { API_URL } from "../../assets/API_URL/API_URL";
// import { ServerVariableService } from "../../utils/ServerVariables";
import { useStyles } from "../../components/useStyles";

const JobEntryData = () => {
  const classes = useStyles(); // Custom CSS
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0); // For pagination
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState(""); // for filtering data/Search

  useEffect(() => {
    fetchCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCustomer = async () => {
    setLoading(true);
    try {
      // const result = await axios.get(
      //   API_URL + ServerVariableService.jobEntryData
      // );
      const jsonData = JsonData.List;

      // Dynamically generate columns based on the first row of data
      const firstRow = jsonData[0];
      const dynamicColumns = Object.keys(firstRow).map((key) => ({
        field: key,
        headerName: key,
        width: 200,
        headerClassName: classes.tableHeader,
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

  const rowsPerPage = 100;
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // ========= for filtering data from table ==========
  const filteredData = tableData.filter((row) =>
    Object.values(row).some(
      (value) =>
        value && value.toString().toLowerCase().includes(search.toLowerCase())
    )
  ).slice(startIndex, endIndex);

  return (
    <>
      {/*  ======= Header ================== */}
      <div className={classes.header}>
        <div className={classes.heading}>
          <Typography
            variant="h"
            style={{
              color: "#29c9ff",
              fontSize: "21px",
              fontWeight: "bolder",
              textShadow: "2px 4px 5px var(--shadow)",
            }}
          >
            Job Entry Data
          </Typography>
        </div>
        <div className={classes.filter}>
          <TextField
            label="Search"
            value={search}
            onChange={handleSearchChange}
            variant="outlined"
            style={{
              width: "12rem",
              fontSize: "6px",
            }}
          />
          <CloseModel />
        </div>
      </div>

      {/*  ======= Table ================== */}
      <div style={{ height: 540, width: "100%" }}>
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
              headerClassName={classes.tableHeader}
              style={{padding : "0px 15px 0px 15px"}}
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
    </>
  );
};

export default JobEntryData;
