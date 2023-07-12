import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import FileCopyRoundedIcon from "@mui/icons-material/FileCopyRounded";
// import InfoIcon from "@material-ui/icons/Info";
// import MailIcon from "@material-ui/icons/Mail";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#29c9ff",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: theme.spacing(2),
  },
  drawer: {
    width: 200,
    height: "100%",
    backgroundColor: "#29c9ff",
    color: "#fff",
    padding: "10px",
  },
  listItemIcon: {
    minWidth: theme.spacing(5),
    color: "#fff",
  },
  listItemText: {
    fontSize: "1rem",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsOpen(open);
  };

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, link: "/" },
    { text: "Job Entry Data", icon: <FileCopyRoundedIcon />, link: "/job-Entry-Data" },

    // ============ Under Development =================
    
    // {text: "Case On Hold", icon: <FileCopyRoundedIcon />, link: "/case-on-hold" },
    // { text: "Sale Order", icon: <FileCopyRoundedIcon />, link: "/sale-order" },
    // { text: "About", icon: <InfoIcon /> },
    // { text: "Contact Us", icon: <MailIcon /> },
  ];

  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.menuButton}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Hi admin, You have logged into Illusion Dental Laboratory (FY
            2023-24)
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
        <div
          className={classes.drawer}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {menuItems.map(({ text, icon, link }, index) => (
              <ListItem
                button
                key={text}
                component={RouterLink}
                to={link}
                disableRipple
                style={{ borderRadius: "12px" }}
              >
                <ListItemIcon className={classes.listItemIcon}>
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  classes={{ primary: classes.listItemText }}
                />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;
