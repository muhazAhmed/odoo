import React, { useState, useEffect } from "react";
import { Button, InputBase, Typography } from "@material-ui/core";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import { ServerVariableService } from "../../utils/ServerVariables";
import { Enum_SSCID } from "../../utils/enums/Enum_Common.enum";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Loading } from "../../components/Loader/Loader";
import { usePostAPI } from "../../utils/util.services";
import { useStyles } from "../../components/useStyles";
import CaseNoModal from "../../components/models/CaseNoModal/CaseNoModal";
import CloseModel from "../../components/models/CloseModel/CloseModal";

const CaseOnHold = () => {
  const classes = useStyles();

  const columns = [
    { field: "CustomerCode", headerName: "Customer Code", width: 200 },
    { field: "CustomerName", headerName: "Customer Name", width: 300 },
    {
      field: "CaseNo",
      headerName: "Case No",
      width: 200,
      renderCell: (params) => (
        <Button
          onClick={() =>
            openModal(params.row.CaseNo, params.row.TicketRegisterNo)
          }
          style={{ color: "blue" }}
        >
          {params.row.CaseNo}
        </Button>
      ),
    },
    { field: "PatientName", headerName: "Patient Name", width: 200 },
    { field: "QueryDate", headerName: "Query Date", width: 200 },
    { field: "Ageing", headerName: "Ageing", width: 200 },
  ];

  const { data, error, loading, postData } = usePostAPI(); // custom hook
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCaseNo, setSelectedCaseNo] = useState("");

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
    }
  }, [data]);

  // ========= for Case No. model ==========
  const fetchCaseNoData = (TicketRegisterNo) => {
    const inputs = new FormData();

    const payload = {
      SSCID: Enum_SSCID.CASE_ON_HOLD,
      ActionTypeID: 2,
      LoginUserID: 1,
      SituationID: 1,
      OUID: 0,
      TicketRegisterNo: TicketRegisterNo, // Sending ticket to the server to fetch data
    };

    inputs.append("ListJson", JSON.stringify(payload));
    postData(ServerVariableService.CaseOnHold, inputs);
  };

  const openModal = (caseNo, TicketRegisterNo) => {
    setSelectedCaseNo(caseNo);
    setIsModalOpen(true);

    // Fetch data for the selected CaseNo
    fetchCaseNoData(TicketRegisterNo);
  };

  const handlePageChange = (event, value) => {
    setPage(value - 1);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(0); // Reset the page when search query changes
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
    const savedFilter = localStorage.getItem("caseOnHoldFilter");
    if (savedFilter) {
      setSearch(savedFilter);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("caseOnHoldFilter", search);
  }, [search]);

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
          <CloseModel />
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
          aa
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

      {/* ======= Case No Model ========== */}
      {isModalOpen && (
        <CaseNoModal
          data={data.Query} // Pass the actual data value
          error={error} // Pass the actual error value
          selectedCaseNo={selectedCaseNo}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default CaseOnHold;
