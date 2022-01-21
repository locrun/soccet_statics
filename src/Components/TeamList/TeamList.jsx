import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Spin from "../../Spin";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRequest } from "../../useRequest";
import plug from "../../images/soccer.svg";
import "./style.css";

export const TeamList = () => {
  const location = useLocation();
  const TeamId = location.pathname.slice(7, 12);
  const { data, loading } = useRequest(
    `https://api.football-data.org/v2/competitions/${TeamId}/teams`
  );

  const [value, setValue] = useState("");

  const queryParams = window.location.href;
  const filterParams = decodeURIComponent(queryParams).slice(
    40,
    queryParams.length
  );

  useEffect(() => {
    setValue(filterParams);
  }, [filterParams]);

  const handleChange = (e) => {
    setValue(e.target.value);
    window.history.pushState("Object", "Title", `?filter=${e.target.value}`);
  };

  const filter = data.teams?.filter((team) => {
    const name = team.name;
    return (
      name.includes(filterParams) +
      name.toLowerCase().includes(filterParams) +
      +name.toUpperCase().includes(filterParams)
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
          onChange={handleChange}
          value={value}
        />
      </Box>

      <div className="card-wrapper">
        {loading ? (
          <Spin />
        ) : (
          filter?.map((team) => {
            const { id, crestUrl, name } = team;
            return (
              <div key={id} className="team-card">
                <div className="team-icon">
                  <img src={crestUrl || plug} alt="emblem" />
                </div>
                <p className="team-name">{name}</p>
                <div className="card-btn-wrapper">
                  <Link
                    to={`/team/${id}/calendar`}
                    className="btn"
                    style={{ textDecoration: "none", marginBottom: "10px" }}
                  >
                    <Button
                      size="small"
                      color="error"
                      variant="contained"
                      style={{ width: "130px" }}
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
