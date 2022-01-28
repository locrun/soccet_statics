import React from "react";
import { createSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
export const MaterialInputSearch = ({ value, setSearchParams }) => {
  return (
    <div>
      <Box
        sx={{
          maxWidth: "100%",
          marginBottom: "50px",
          padding: "0 3px",
        }}
      >
        <TextField
          fullWidth
          label="Search"
          id="fullWidth"
          value={value}
          onChange={(e) => {
            setSearchParams(createSearchParams({ filter: e.target.value }));
          }}
        />
      </Box>
    </div>
  );
};
