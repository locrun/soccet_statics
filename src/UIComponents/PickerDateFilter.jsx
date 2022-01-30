import React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import "./style.css";
export const PickerDateFilter = ({
  dateFrom,
  dateTo,
  handleChangeDateFrom,
  handleChangeDateTo,
}) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="wrapper">
          <DatePicker
            label="Basic example"
            orientation="landscape"
            value={dateFrom}
            onChange={(date) => handleChangeDateFrom(date)}
            renderInput={(params) => (
              <TextField
                {...params}
                id="standard-basic"
                label="Date picker from"
                variant="standard"
              />
            )}
          />
          <DatePicker
            label="Basic example"
            value={dateTo}
            onChange={(date) => handleChangeDateTo(date)}
            renderInput={(params) => (
              <TextField
                {...params}
                id="standard-basic"
                label="Date picker to"
                variant="standard"
              />
            )}
          />
        </div>
      </LocalizationProvider>
    </>
  );
};

export default PickerDateFilter;
