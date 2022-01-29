import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { MaterialTable } from "../../MaterialUI/MaterialTable";
import { MaterialDateFilter } from "../../MaterialUI/MaterialDateFilter";
import { useRequest } from "../../useRequest";
import Spin from "../../Spin";

export const CalendarLeague = () => {
  const params = useParams();
  const teamId = params.id;
  const { data, loading, errorMessage } = useRequest(
    `https://api.football-data.org/v2/competitions/${teamId}/matches`
  );

  const dateFrom = new URLSearchParams(window.location.search).get("dateFrom");
  const dateTo = new URLSearchParams(window.location.search).get("dateTo");

  const [selectDateFrom, setDateFrom] = useState(parseInt(dateFrom) || null);
  const [selectDateTo, setDateTo] = useState(parseInt(dateTo) || null);

  const handleChangeDateFrom = (date) => {
    window.history.pushState(
      "Object",
      "Title",
      `?dateFrom=${date && date.getTime()}&dateTo=${dateTo}`
    );
    setDateFrom(date);
  };

  const handleChangeDateTo = (date) => {
    window.history.pushState(
      "Object",
      "Title",
      `?dateTo=${date && date.getTime()}&dateFrom=${dateFrom}`
    );
    setDateTo(date);
  };

  const matchDate = data?.matches?.filter((match) => {
    return (
      Date.parse(match.utcDate) >= dateFrom &&
      Date.parse(match.utcDate) <= dateTo
    );
  });

  return (
    <>
      <MaterialDateFilter
        dateFrom={selectDateFrom}
        handleChangeDateFrom={handleChangeDateFrom}
        dateTo={selectDateTo}
        handleChangeDateTo={handleChangeDateTo}
      />
      {errorMessage}
      {loading ? <Spin /> : <MaterialTable matches={matchDate} />}
    </>
  );
};
