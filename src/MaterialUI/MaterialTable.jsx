import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const MaterialTable = ({ matches }) => {
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
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">MatchDay</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Home Team</StyledTableCell>
            <StyledTableCell align="center">Away Team</StyledTableCell>
            <StyledTableCell align="center">Score</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {matches?.map((team) => (
            <StyledTableRow key={team.id}>
              <StyledTableCell align="center">{team.matchday}</StyledTableCell>
              <StyledTableCell align="center">{team.utcDate}</StyledTableCell>
              <StyledTableCell align="center">{team.status}</StyledTableCell>
              <StyledTableCell align="center">
                {team.homeTeam.name || "...."}
              </StyledTableCell>
              <StyledTableCell align="center">
                {team.awayTeam.name || "...."}
              </StyledTableCell>

              <StyledTableCell align="center">
                {team.score.fullTime.homeTeam || "-"}:
                {team.score.fullTime.awayTeam || "-"}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
