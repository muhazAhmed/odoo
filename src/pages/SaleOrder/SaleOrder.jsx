import React, { useEffect, useState } from "react";
import { Button, InputBase, Typography } from "@material-ui/core";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import { ServerVariableService } from "../../utils/ServerVariables";
import { Enum_SSCID } from "../../utils/enums/Enum_Common.enum";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Loading } from "../../components/Loader/Loader";
import { usePostAPI } from "../../utils/util.services";
import { useStyles } from "../../components/useStyles";
import CloseModel from "../../components/models/CloseModel/CloseModal";

const SaleOrder = () => {
  const classes = useStyles();

  const columns = [
    { field: "OrganizationUnit", headerName: "Organization Unit", width: 250 },
    { field: "TransactionNumber", headerName: "Transaction Number", width: 200 },
    { field: "TransactionDate", headerName: "Transaction Date", width: 300 },
    { field: "Status", headerName: "Status", width: 150 },
    { field: "Customer", headerName: "Customer", width: 200 },
    { field: "Amount", headerName: "Amount", width: 150 },
    { field: "CreatedBy", headerName: "Created By", width: 150 },
    { field: "CreationDate", headerName: "Creation Date", width: 250 },
  ];

  const { data, error, loading, postData } = usePostAPI(); // custom hook
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  // ========= for fatching grid data (postAPI) ==========
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputs = new FormData();

    const payload = {
      // inputs or payload for sending to server
      SSCID: Enum_SSCID.SALE_ORDER,
      ActionTypeID: 2,
      LoginUserID: 1,
      LoginCompanyID: 0,
      SituationID: 0,
      OUID: 0,
      LoginReferenceID: 864,
      CustomerID: 0,
    };

    inputs.append("ListJson", JSON.stringify(payload));

    postData(ServerVariableService.SaleOrder, inputs);
  };

  useEffect(() => {
    if (data && data.SaleOrder && data.SaleOrder.length > 0) {
      const dataArray = data.SaleOrder;
      setTableData(dataArray.map((row, index) => ({ id: index, ...row })));
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

  // Save and retrieve the applied filter from localStorage
  useEffect(() => {
    const savedFilter = localStorage.getItem("saleOrderFilter");
    if (savedFilter) {
      setSearch(savedFilter);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("saleOrderFilter", search);
  }, [search]);

  return (
    <>
      {/*  ======= Header ================== */}
      <div className={classes.header}>
        <div>
          <Typography variant="h1" className={classes.heading}>
            Sale Order
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
          <CloseModel/>
        </div>
      </div>

      {/*  ======= Table ================== */}
      {loading && <Loading />}
      {error && (
        <Typography variant="h4" color="error">
          {error}
        </Typography>
      )}
      <div style={{ height: 585, width: "100%" }}>
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
          style={{padding : "0px 15px 0px 15px"}}
        />
      </div>
    </>
  );
};
export default SaleOrder;
