import React, { useEffect, useState } from "react";
import { Button, InputBase, Typography } from "@material-ui/core";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import { ServerVariableService } from "../../utils/ServerVariables";
import { Enum_SSCID } from "../../utils/enums/Enum_Common.enum";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Pagination } from "@mui/material";
import { Loading } from "../../components/Loader/Loader";
import { usePostAPI } from "../../utils/util.services";
import { useStyles } from "../../components/useStyles";

const CaseOnHold = () => {
  const classes = useStyles();

  const columns = [
    { field: "CustomerCode", headerName: "Customer Code", width: 200 },
    { field: "CustomerName", headerName: "Customer Name", width: 300 },
    { field: "CaseNo", headerName: "Case No", width: 200 },
    { field: "PatientName", headerName: "Patient Name", width: 200 },
    { field: "QueryDate", headerName: "Query Date", width: 200 },
    { field: "Ageing", headerName: "Ageing", width: 200 },
  ];

  const { data, error, loading, postData } = usePostAPI(); // custom hook
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");

  // ========= for fatching grid data (postAPI) ==========
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputs = new FormData();

    const payload = {
      // inputs or payload for sending to server
      SSCID: Enum_SSCID.CASE_ON_HOLD,
      ActionTypeID: 2,
      LoginUserID: 1,
      TicketRegisterNo: 0,
      SituationID: 0,
      OUID: 0,
    };

    inputs.append("ListJson", JSON.stringify(payload));
    postData(ServerVariableService.CaseOnHold, inputs);
  };

  useEffect(() => {
    if (data && data.CaseOnHold && data.CaseOnHold.length > 0) {
      const dataArray = data.CaseOnHold;
      setTableData(dataArray.map((row, index) => ({ id: index, ...row })));
      setTotalPages(Math.ceil(dataArray.length / 10));
    }
  }, [data]);

  const handlePageChange = (event, value) => {
    setPage(value - 1);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(0); // Reset the page when search query changes
  };

  // ========= for filtering data from table ==========
  const filteredData = tableData.filter((row) =>
    Object.values(row).some(
      (value) =>
        value && value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <>
      {/*  ======= Header ================== */}
      <div className={classes.header}>
        <div>
          <Typography variant="h1" className={classes.heading}>
            Case On Hold
          </Typography>
        </div>
        <div className={classes.filter}>
          <div className={classes.icon}>
            <Button title="Filter">
              <FilterAltRoundedIcon className={classes.FilterAltRoundedIcon} />
            </Button>
          </div>
          <div className={classes.filterInput}>
            <InputBase
              placeholder="Type To Filter"
              value={search}
              onChange={handleSearchChange}
              className={classes.input}
            />
          </div>
          <div className={classes.btnGo}>
            <Button
              variant="contained"
              color="primary"
              title="Search"
              onClick={handleSubmit}
              className={classes.goButton}
            >
              Go
            </Button>
          </div>
          {/* <CloseModel/> */}
        </div>
      </div>

      {/*  ======= Table ================== */}
      {loading && <Loading />}
      {error && (
        <Typography variant="h4" color="error">
          {error}
        </Typography>
      )}
      <div style={{ height: 550, width: "100%" }}>
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
    </>
  );
};
export default CaseOnHold;
