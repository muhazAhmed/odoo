import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    
    modal: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    padding: "100px 150px",
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(3),
},
title: {
    textAlign: 'center',
},
buttons: {
    display: 'flex',
    alignItems : 'center',
    gap: "2rem",
},
btn : {
    padding: "10px 50px"
}
}));

const CloseModel = () => {
    const classes = useStyles();
    const [openModel, setOpenModel] = useState(false); // to open the main close confirmation model
    
    // For Closing the main close confirmation model (X)
    const handleClose = () => {
        setOpenModel(true);
    };
    
    // For Closing the main close confirmation model (X)
    const handleConfirmYes = () => {
        setOpenModel(false);
    };
    
    // For Closing the main close confirmation model (X)
    const handleConfirmNo = () => {
        setOpenModel(false);
    };
    
    return (
        <>
      <div className={classes.close}>
        <IconButton onClick={handleClose} title="Close">
          <CloseIcon />
        </IconButton>
        {/* onclick of this, closing confirmation model will open */}
      </div>

      {/* Close Modal */}
      <Dialog open={openModel} onClose={handleConfirmNo}>
        <DialogTitle className={classes.title}>
          Are you sure?<br />
          You want to exit this screen.
        </DialogTitle>
        <DialogContent className={classes.modal}>
          <div className={classes.buttons}>
            <Link to="/">
              <Button className={classes.btn}
                onClick={handleConfirmYes}
                variant="contained"
                style={{backgroundColor : "#29c9ff", color: "#fff"}}
              >
                Yes
              </Button>
            </Link>

            <Button className={classes.btn}
              onClick={handleConfirmNo}
              variant="outlined"
              color="secondary"
            >
              No
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CloseModel;
