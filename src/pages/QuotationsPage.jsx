import React, { useState, useEffect, useCallback } from "react";
import {
  getQuotations,
  deleteQuotation,
} from "../components/QuotationForm/QuotationForm.operations";
import QuotationForm from "../components/QuotationForm/QuotationForm";
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  TextField,
} from "@mui/material";

const QuotationsPage = () => {
  const [quotations, setQuotations] = useState([]);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [filter, setFilter] = useState({ search: "" });

  const fetchQuotations = useCallback(async () => {
    const quotationsData = await getQuotations(filter);

    // Filtragem adicional baseada na pesquisa por texto
    const filteredQuotations = quotationsData.filter((quotation) => {
      const searchLower = filter.search.toLowerCase();
      return (
        (quotation.productName &&
          quotation.productName.toLowerCase().includes(searchLower)) ||
        (quotation.supplierName &&
          quotation.supplierName.toLowerCase().includes(searchLower)) ||
        (quotation.quotationDate &&
          quotation.quotationDate.toLowerCase().includes(searchLower)) ||
        (quotation.price && quotation.price.toString().includes(searchLower)) ||
        (quotation.communicationMethod &&
          quotation.communicationMethod.toLowerCase().includes(searchLower))
      );
    });

    setQuotations(filteredQuotations);
  }, [filter]);

  useEffect(() => {
    fetchQuotations();
  }, [fetchQuotations]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
    fetchQuotations();
  };

  const handleSearch = () => {
    fetchQuotations();
  };

  const handleEdit = (quotation) => {
    setSelectedQuotation(quotation);
  };

  const handleDelete = async (quotationId) => {
    if (window.confirm("Tem certeza de que deseja excluir esta cotação?")) {
      await deleteQuotation(quotationId);
      fetchQuotations();
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Cadastro de Cotações
      </Typography>
      <QuotationForm
        selectedQuotation={selectedQuotation}
        setSelectedQuotation={setSelectedQuotation}
      />
      <Box mt={4} mb={2}>
        <Typography variant="h6" component="h2">
          Buscar Cotações
        </Typography>
        <TextField
          label="Pesquisar"
          name="search"
          value={filter.search}
          onChange={handleFilterChange}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Box display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{ marginRight: 2 }}
          >
            Buscar
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setFilter({ search: "" });
              fetchQuotations();
            }}
          >
            Limpar
          </Button>
        </Box>
      </Box>
      <Box mt={4}>
        <Typography variant="h5" component="h2" gutterBottom>
          Lista de Cotações
        </Typography>
        {quotations.map((quotation) => (
          <Paper key={quotation.id} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h6">{quotation.productName}</Typography>
            <Typography>Fornecedor: {quotation.supplierName}</Typography>
            <Typography>Data da Cotação: {quotation.quotationDate}</Typography>
            <Typography>Preço: {quotation.price}</Typography>
            <Typography>
              Meio de Comunicação: {quotation.communicationMethod}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleEdit(quotation)}
              sx={{ marginTop: 2 }}
            >
              Editar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleDelete(quotation.id)}
              sx={{ marginTop: 2 }}
            >
              Excluir
            </Button>
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default QuotationsPage;
