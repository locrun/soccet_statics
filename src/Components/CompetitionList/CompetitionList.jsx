import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { InputSearch } from "../../UIComponents/InputSearch";
import Button from "@mui/material/Button";
import Spin from "../../Spin";
import { useRequest } from "../../useRequest";
import plug from "../../images/fon-futbol.jpg";
import "./style.css";
export const CompetitionList = () => {
  const { data, loading, errorMessage } = useRequest(
    `https://api.football-data.org/v2/competitions/?plan=TIER_ONE`
  );

  const [searchParams, setSearchParams] = useSearchParams("");
  const filterData = searchParams.get("filter") || "";

  const filter = data.competitions?.filter((team) => {
    const names = team.area.name + team.name;
    const regExp = new RegExp(filterData, "i");
    return regExp.test(names);
  });

  return (
    <>
      <InputSearch value={filterData} setSearchParams={setSearchParams} />
      <div className="card-wrapper">
        {errorMessage}
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
