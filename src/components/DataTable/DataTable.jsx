import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Paper } from "@mui/material";
import styled from "styled-components";

const columns = [
  { field: "name", headerName: "Nome", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "phone", headerName: "Telefone", flex: 1 },
];

const TableContainer = styled(Paper)`
  height: 400px;
  width: 100%;
  margin-top: 20px;
`;

const DataTableComponent = ({ data }) => {
  return (
    <Container>
      <TableContainer>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          autoHeight
        />
      </TableContainer>
    </Container>
  );
};

export default DataTableComponent;
