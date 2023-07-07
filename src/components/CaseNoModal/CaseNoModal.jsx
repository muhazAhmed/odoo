import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

const CaseNoModal = ({ selectedCaseNo, queryCheckListRemark, onClose }) => {
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Case No: {selectedCaseNo}</DialogTitle>
      <DialogContent>
        <div dangerouslySetInnerHTML={{ __html: queryCheckListRemark }} />
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
