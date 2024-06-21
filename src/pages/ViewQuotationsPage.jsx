import React, { useEffect, useState } from "react";
import { getQuotations } from "../components/QuotationForm/QuotationForm.operations";
import { getProducts } from "../components/ProductForm/ProductForm.operations";
import {
  Box,
  Container,
  Typography,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";

const ViewQuotationsPage = () => {
  const [products, setProducts] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [filters, setFilters] = useState({ date: "", price: "", supplier: "" });

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await getProducts();
      setProducts(productsData);
    };
    fetchData();
  }, []);

  const handleProductChange = async (event) => {
    const productId = event.target.value;
    setSelectedProduct(productId);
    const quotationsData = await getQuotations({ productId });
    setQuotations(quotationsData);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredQuotations = quotations.filter((quotation) => {
    return (
      (filters.date ? quotation.quotationDate.includes(filters.date) : true) &&
      (filters.price
        ? quotation.price.toString().includes(filters.price)
        : true) &&
      (filters.supplier
        ? quotation.supplierName.includes(filters.supplier)
        : true)
    );
  });

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Consulta de Cotações por Produto
      </Typography>
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="product-select-label">Selecionar Produto</InputLabel>
        <Select
          labelId="product-select-label"
          value={selectedProduct}
          onChange={handleProductChange}
          label="Selecionar Produto"
        >
          {products.map((product) => (
            <MenuItem key={product.id} value={product.id}>
              {product.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box display="flex" justifyContent="space-between" mt={3} mb={3}>
        <TextField
          label="Filtrar por Data"
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          sx={{ marginRight: 2 }}
        />
        <TextField
          label="Filtrar por Preço"
          type="number"
          name="price"
          value={filters.price}
          onChange={handleFilterChange}
          variant="outlined"
          sx={{ marginRight: 2 }}
        />
        <TextField
          label="Filtrar por Fornecedor"
          name="supplier"
          value={filters.supplier}
          onChange={handleFilterChange}
          variant="outlined"
        />
      </Box>
      {filteredQuotations.map((quotation) => (
        <Paper key={quotation.id} sx={{ padding: 2, marginBottom: 2 }}>
          <Typography variant="h6">{quotation.productName}</Typography>
          <Typography>Fornecedor: {quotation.supplierName}</Typography>
          <Typography>Data: {quotation.quotationDate}</Typography>
          <Typography>Preço: {quotation.price}</Typography>
          <Typography>
            Meio de Comunicação: {quotation.communicationMethod}
          </Typography>
        </Paper>
      ))}
    </Container>
  );
};

export default ViewQuotationsPage;
