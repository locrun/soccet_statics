import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { MaterialTable } from "../../MaterialUI/MaterialTable";
import { MaterialDateFilter } from "../../MaterialUI/MaterialDateFilter";
import { useRequest } from "../../useRequest";
import Dayjs from "dayjs";
import Spin from "../../Spin";

export const CalendarLeague = () => {
  const params = useParams();
  let location = useLocation();
  let navigate = useNavigate();
  const teamId = params.id;
  const { data, loading, errorMessage } = useRequest(
    `https://api.football-data.org/v2/competitions/${teamId}/matches`
  );

  const dateFrom = new URLSearchParams(location.search).get("dateFrom");
  const dateTo = new URLSearchParams(location.search).get("dateTo");

  const [selectDateFrom, setDateFrom] = useState(
    +Dayjs(dateFrom).valueOf() || null
  );
  const [selectDateTo, setDateTo] = useState(+Dayjs(dateTo).valueOf() || null);

  const handleChangeDateFrom = (date) => {
    navigate(`?dateFrom=${Dayjs(date).format("MM-DD-YYYY")}&dateTo=${dateTo}`);
    setDateFrom(date);
  };

  const handleChangeDateTo = (date) => {
    navigate(
      `?dateTo=${Dayjs(date).format("MM-DD-YYYY")}&dateFrom=${dateFrom}`
    );
    setDateTo(date);
  };

  const matchDate = data?.matches?.filter((match) => {
    return (
      +Dayjs(match.utcDate).valueOf() >= selectDateFrom &&
      +Dayjs(match.utcDate).valueOf() <= selectDateTo
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
