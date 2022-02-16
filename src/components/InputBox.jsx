import React from "react";
import "./InputBox.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

function InputBox({ setInputText, inputText, btnValue, createTodo }) {
  function handleChange(event) {
    const value = event.target.value;
    setInputText(value);
  }

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={9}>
          <TextField
            size="small"
            id="outlined-basic"
            label="Add task"
            onChange={handleChange}
            value={inputText}
            variant="outlined"
            className="input"
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            size="large"
            onClick={createTodo}
            variant="contained"
            className="input"
            disabled={inputText === ""}
          >
            {btnValue}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default InputBox;
