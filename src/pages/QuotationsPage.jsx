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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { getProducts } from "../components/ProductForm/ProductForm.operations";
import { getSuppliers } from "../components/SupplierForm/SupplierForm.operations";

const QuotationsPage = () => {
  const [quotations, setQuotations] = useState([]);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [filter, setFilter] = useState({ productId: "", supplierId: "" });
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const fetchQuotations = useCallback(async () => {
    const quotationsData = await getQuotations(filter);
    setQuotations(quotationsData);
  }, [filter]);

  useEffect(() => {
    fetchQuotations();
  }, [fetchQuotations]);

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await getProducts();
      setProducts(productsData);
      const suppliersData = await getSuppliers();
      setSuppliers(suppliersData);
    };
    fetchData();
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
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
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          mb={2}
        >
          <FormControl variant="outlined" sx={{ marginBottom: 2 }}>
            <InputLabel id="product-select-label">Produto</InputLabel>
            <Select
              labelId="product-select-label"
              name="productId"
              value={filter.productId}
              onChange={handleFilterChange}
              label="Produto"
            >
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" sx={{ marginBottom: 2 }}>
            <InputLabel id="supplier-select-label">Fornecedor</InputLabel>
            <Select
              labelId="supplier-select-label"
              name="supplierId"
              value={filter.supplierId}
              onChange={handleFilterChange}
              label="Fornecedor"
            >
              {suppliers.map((supplier) => (
                <MenuItem key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
                setFilter({ productId: "", supplierId: "" });
                fetchQuotations();
              }}
            >
              Limpar
            </Button>
          </Box>
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
              sx={{ marginTop: 2, marginLeft: 2 }}
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
