import React from "react";
import { Link, useSearchParams, useParams } from "react-router-dom";
import { MaterialInputSearch } from "../../MaterialUI/MaterialInputSearch";
import Button from "@mui/material/Button";
import Spin from "../../Spin";
import { useRequest } from "../../useRequest";
import plug from "../../images/soccer.svg";
import "./style.css";

export const TeamList = () => {
  const params = useParams();
  const teamId = params.id;
  const { data, loading, errorMessage } = useRequest(
    `https://api.football-data.org/v2/competitions/${teamId}/teams`
  );
  const [searchParams, setSearchParams] = useSearchParams("");
  const filterData = searchParams.get("filter") || "";

  const filter = data.teams?.filter((team) => {
    const regExp = new RegExp(filterData, "i");
    return regExp.test(team.name);
  });

  return (
    <>
      <MaterialInputSearch
        value={filterData}
        setSearchParams={setSearchParams}
      />
      <div className="card-wrapper">
        {errorMessage}
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
