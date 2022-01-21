import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Spin from "../../Spin";
import { useRequest } from "../../useRequest";
import plug from "../../images/fon-futbol.jpg";
import "./style.css";
export const CompetitionList = () => {
  const { data, loading } = useRequest(
    `https://api.football-data.org/v2/competitions/?plan=TIER_ONE`
  );
  const [value, setValue] = useState("");
  const queryParams = window.location.href;
  const filterParams = decodeURIComponent(queryParams).slice(
    30,
    queryParams.length
  );

  useEffect(() => {
    setValue(filterParams);
  }, [filterParams]);

  const handleChange = (e) => {
    setValue(e.target.value);
    window.history.pushState("Object", "Title", `?filter=${e.target.value}`);
  };

  const filter = data.competitions?.filter((team) => {
    const names = team.area.name + team.name;
    return (
      names.includes(filterParams) +
      names.toLowerCase().includes(filterParams) +
      +names.toUpperCase().includes(filterParams)
    );
  });

  return (
    <>
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
          onChange={handleChange}
        />
      </Box>
      <div className="card-wrapper">
        {loading ? (
          <Spin />
        ) : (
          filter?.map((team) => {
            const { id, name, area, emblemUrl } = team;
            return (
              <div key={id} className="card">
                <div className="card-images">
                  <img src={emblemUrl || area.ensignUrl || plug} alt="" />
                </div>
                <div className="card-title">
                  <p className="country-name">{area.name}</p>
                  <p className="champ-name">{name}</p>
                </div>
                <div className="card-btn-wrapper">
                  <Link
                    to={`teams/${id}`}
                    style={{ textDecoration: "none", marginBottom: "10px" }}
                  >
                    <Button
                      size="small"
                      variant="contained"
                      style={{ width: "100%" }}
                    >
                      Teams
                    </Button>
                  </Link>
                  <Link
                    to={`calendar/${id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      size="small"
                      color="error"
                      variant="contained"
                      style={{ width: "100%" }}
                    >
                      Calendar
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};
