import React from "react";
import { useLocation } from "react-router-dom";
import Spin from "../../Spin";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useRequest } from "../../useRequest";

export const TeamCalendar = () => {
  const location = useLocation();
  const TeamId = parseInt(location.pathname.slice(6, 10));

  const { data, loading } = useRequest(
    `https://api.football-data.org/v2/teams/${TeamId}/matches`
  );
  const { matches } = data;

  return loading ? <Spin /> : <CustomizedTables matches={matches} />;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CustomizedTables = ({ matches }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">MatchDay</StyledTableCell>
            <StyledTableCell align="left">Date</StyledTableCell>
            <StyledTableCell align="left">Status</StyledTableCell>
            <StyledTableCell align="left">Home Team</StyledTableCell>
            <StyledTableCell align="left">Away Team</StyledTableCell>
            <StyledTableCell align="left">Score</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {matches?.map((team) => (
            <StyledTableRow key={team.id}>
              <StyledTableCell align="left">{team.matchday}</StyledTableCell>
              <StyledTableCell align="left">{team.utcDate}</StyledTableCell>
              <StyledTableCell align="left">{team.status}</StyledTableCell>
              <StyledTableCell align="left">
                {team.awayTeam.name}
              </StyledTableCell>
              <StyledTableCell align="left">
                {team.homeTeam.name}
              </StyledTableCell>
              <StyledTableCell align="left">
                {team.score.fullTime.homeTeam === null
                  ? "null"
                  : team.score.fullTime.homeTeam}
                :{team.score.fullTime.awayTeam}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
