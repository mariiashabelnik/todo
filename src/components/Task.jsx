import React from "react";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import "./Task.css";

function Task({ title, toggleTask, removeTask, completed, id }) {
  let className = "task";
  if (completed === true) {
    className = "task done";
  }

  return (
    <div className={className}>
      <Grid container spacing={1}>
        <Grid item xs={1}>
          <Checkbox
            checked={completed}
            onChange={() => {
              toggleTask(id, completed);
            }}
          />
        </Grid>
        <Grid item xs={10}>
          <Typography variant="h5">{title}</Typography>
        </Grid>
        <Grid item xs={1}>
          <IconButton
            onClick={() => {
              removeTask(id);
            }}
            aria-label="remove task"
            component="span"
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
}

export default Task;
