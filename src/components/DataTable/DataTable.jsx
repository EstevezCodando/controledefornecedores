import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Paper, Button } from "@mui/material";
import styled from "styled-components";

const TableContainer = styled(Paper)`
  height: 400px;
  width: 100%;
  margin-top: 20px;
`;

const DataTableComponent = ({ data, onEdit, onDelete }) => {
  const columns = [
    { field: "name", headerName: "Nome", flex: 1 },
    { field: "phone", headerName: "Telefone", flex: 1 },
    {
      field: "actions",
      headerName: "Ações",
      flex: 1,
      renderCell: (params) => (
        <div>
          <Button onClick={() => onEdit(params.row)}>Editar</Button>
          <Button onClick={() => onDelete(params.row)}>Excluir</Button>
        </div>
      ),
    },
  ];

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
