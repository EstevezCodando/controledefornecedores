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
  const [searchTerm, setSearchTerm] = useState({ name: "", category: "" });

  const fetchProducts = useCallback(async () => {
    const productsData = await getProducts();
    setProducts(productsData);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearchChange = (event) => {
    const { name, value } = event.target;
    setSearchTerm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.name.toLowerCase()) &&
      product.category.toLowerCase().includes(searchTerm.category.toLowerCase())
  );

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
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Cadastro de Produtos
      </Typography>
      <ProductForm
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        onSubmitSuccess={fetchProducts}
      />
      <Box mt={4} mb={2}>
        <Typography variant="h6" component="h2" gutterBottom>
          Buscar Produtos
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          gap={2}
          mb={2}
        >
          <TextField
            label="Nome"
            name="name"
            value={searchTerm.name}
            onChange={handleSearchChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Categoria"
            name="category"
            value={searchTerm.category}
            onChange={handleSearchChange}
            variant="outlined"
            fullWidth
          />
          <Box display="flex" gap={2}>
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Buscar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                setSearchTerm({ name: "", category: "" });
                fetchProducts();
              }}
            >
              Limpar
            </Button>
          </Box>
        </Box>
      </Box>
      <Box mt={4}>
        <Typography variant="h5" component="h2" gutterBottom>
          Lista de Produtos
        </Typography>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Paper key={product.id} sx={{ padding: 2, marginBottom: 2 }}>
              <Typography variant="h6">{product.name}</Typography>
              <Typography>Descrição: {product.description}</Typography>
              <Typography>Categoria: {product.category}</Typography>
              <Typography>
                Fornecedores: {product.suppliers.join(", ")}
              </Typography>
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
                sx={{ marginTop: 2 }}
              >
                Excluir
              </Button>
            </Paper>
          ))
        ) : (
          <Typography variant="body1">Nenhum produto encontrado.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default ProductsPage;
