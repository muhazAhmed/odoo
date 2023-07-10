import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@material-ui/core";

const CaseNoModal = ({ selectedCaseNo, data, error, onClose }) => {

  return (
    <Dialog open={true} onClose={onClose}>
      {error && (
        <Typography variant="h4" color="error">
          {error}
        </Typography>
      )}
      <DialogTitle>Case No: {selectedCaseNo}</DialogTitle>
      <DialogContent>
        {data && data.CheckListRemark ? (
          <div
            dangerouslySetInnerHTML={{
              __html: data.CheckListRemark,
            }}
          />
        ) : (
          <Typography variant="body1">No CheckListRemark available</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CaseNoModal;
