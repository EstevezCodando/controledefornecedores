import React, { useEffect, useState } from "react";
import { getQuotationsByRequestId } from "../components/QuotationForm/QuotationForm.operations";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const ViewQuotationsPage = ({ requestId }) => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const response = await getQuotationsByRequestId(requestId);
        setQuotations(response);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar cotações:", error);
        setLoading(false);
      }
    };

    fetchQuotations();
  }, [requestId]);

  return (
    <Container>
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Cotações da Requisição {requestId}
        </Typography>
        {loading ? (
          <Typography>Carregando...</Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Produto</TableCell>
                <TableCell>Fornecedor</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Preço</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quotations.map((quotation) => (
                <TableRow key={quotation.id}>
                  <TableCell>{quotation.id}</TableCell>
                  <TableCell>{quotation.productName}</TableCell>
                  <TableCell>{quotation.supplierName}</TableCell>
                  <TableCell>{quotation.quotationDate}</TableCell>
                  <TableCell>{quotation.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Container>
  );
};

export default ViewQuotationsPage;
