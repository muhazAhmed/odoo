import { makeStyles } from "@material-ui/core/styles";

// ============== Custom CSS =============
export const useStyles = makeStyles((theme) => ({
  header: {
    padding: "8px",
    backgroundColor: "#ececec",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    color: "#29c9ff",
    fontSize: "21px",
    fontWeight: "bolder",
    textShadow: "2px 4px 5px var(--shadow)",
  },
  filter: {
    display: "flex",
    gap: "0.5rem",
    alignItems: "center",
  },
  FilterAltRoundedIcon: {
    color: theme.palette.secondary.main,
    fontSize: "25px",
    cursor: "pointer",
  },
  input: {
    border: "none",
    borderBottom: "1px solid gray",
    backgroundColor: "transparent",
    fontSize: "medium",
    height: "4vh",
    padding: "5px",
    "&:focus": {
      outline: "none",
      border: "none",
      borderBottom: "1px solid gray",
    },
  },
  goButton: {
    backgroundColor: "#29c9ff",
    border: "none",
    color: theme.palette.common.white,
    fontSize: "medium",
    fontWeight: 500,
    borderRadius: "5px",
    padding: "5px 5px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.error.main,
      transition: "0.3s",
    },
  },
  tableHeader: {
    fontSize: "16px",
    fontWeight: "900",
    color: "#fff",
    backgroundColor: "#29c9ff",
  },
}));
