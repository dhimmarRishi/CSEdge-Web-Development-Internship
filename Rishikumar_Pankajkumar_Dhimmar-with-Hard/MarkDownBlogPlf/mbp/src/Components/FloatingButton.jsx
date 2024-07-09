import React from 'react';
import { Fab, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

const FloatingButton = () => {
  return (
    <Tooltip title="Create New Blog" aria-label="create">
      <Fab
        component={Link}
        to="/blogs/create"
        color="primary"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>
    </Tooltip>
  );
};

export default FloatingButton;
