import React, { useState, useEffect, useCallback } from "react";
import {
  getProducts,
  deleteProduct,
} from "../components/ProductForm/ProductForm.operations";
import ProductForm from "../components/ProductForm/ProductForm";
import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
} from "@mui/material";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filter, setFilter] = useState({ name: "", category: "" });

  const fetchProducts = useCallback(async () => {
    const productsData = await getProducts(filter);
    setProducts(productsData);
  }, [filter]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    fetchProducts();
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Tem certeza de que deseja excluir este produto?")) {
      await deleteProduct(productId);
      fetchProducts();
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Cadastro de Produtos
      </Typography>
      <ProductForm
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
      <Box mt={4} mb={2}>
        <Typography variant="h6" component="h2">
          Buscar Produtos
        </Typography>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <TextField
            label="Nome"
            name="name"
            value={filter.name}
            onChange={handleFilterChange}
            variant="outlined"
            sx={{ marginRight: 2 }}
          />
          <TextField
            label="Categoria"
            name="category"
            value={filter.category}
            onChange={handleFilterChange}
            variant="outlined"
            sx={{ marginRight: 2 }}
          />
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
              setFilter({ name: "", category: "" });
              fetchProducts();
            }}
          >
            Limpar
          </Button>
        </Box>
      </Box>
      <Box mt={4}>
        <Typography variant="h5" component="h2" gutterBottom>
          Lista de Produtos
        </Typography>
        {products.map((product) => (
          <Paper key={product.id} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h6">{product.name}</Typography>
            <Typography>Descrição: {product.description}</Typography>
            <Typography>Categoria: {product.category}</Typography>
            <Typography>
              Especificações Técnicas: {product.technicalSpecifications}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleEdit(product)}
              sx={{ marginTop: 2 }}
            >
              Editar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleDelete(product.id)}
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

export default ProductsPage;
