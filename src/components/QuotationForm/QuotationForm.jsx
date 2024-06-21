import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { addQuotation, updateQuotation } from "./QuotationForm.operations";
import { getProducts } from "../ProductForm/ProductForm.operations";
import { getSuppliers } from "../SupplierForm/SupplierForm.operations";

const QuotationForm = ({ selectedQuotation, setSelectedQuotation }) => {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: selectedQuotation || {},
  });

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await getProducts();
      setProducts(productsData);
      const suppliersData = await getSuppliers();
      setSuppliers(suppliersData);
    };
    fetchData();
  }, []);

  const selectedProduct = watch("productId");

  useEffect(() => {
    if (selectedProduct) {
      const product = products.find((p) => p.id === selectedProduct);
      if (product) {
        const relatedSuppliers = suppliers.filter((supplier) =>
          product.suppliers?.includes(supplier.id)
        );
        setFilteredSuppliers(relatedSuppliers);
      }
    } else {
      setFilteredSuppliers([]);
    }
  }, [selectedProduct, products, suppliers]);

  const onSubmit = async (data) => {
    if (selectedQuotation) {
      await updateQuotation(selectedQuotation.id, data);
    } else {
      await addQuotation(data);
    }
    setSelectedQuotation(null);
    reset();
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 2,
          textAlign: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          {selectedQuotation ? "Editar Cotação" : "Cadastrar Cotação"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={3}>
            <FormControl
              fullWidth
              variant="outlined"
              error={!!errors.productId}
            >
              <InputLabel id="product-select-label">Produto</InputLabel>
              <Controller
                name="productId"
                control={control}
                rules={{ required: "Produto é obrigatório" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="product-select-label"
                    label="Produto"
                  >
                    {products.map((product) => (
                      <MenuItem key={product.id} value={product.id}>
                        {product.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
                defaultValue=""
              />
              {errors.productId && (
                <Typography color="error">
                  {errors.productId.message}
                </Typography>
              )}
            </FormControl>
          </Box>
          <Box mb={3}>
            <FormControl
              fullWidth
              variant="outlined"
              error={!!errors.supplierId}
            >
              <InputLabel id="supplier-select-label">Fornecedor</InputLabel>
              <Controller
                name="supplierId"
                control={control}
                rules={{ required: "Fornecedor é obrigatório" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="supplier-select-label"
                    label="Fornecedor"
                  >
                    {filteredSuppliers.length === 0 ? (
                      <MenuItem disabled>Nenhum fornecedor disponível</MenuItem>
                    ) : (
                      filteredSuppliers.map((supplier) => (
                        <MenuItem key={supplier.id} value={supplier.id}>
                          {supplier.name}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                )}
                defaultValue=""
              />
              {errors.supplierId && (
                <Typography color="error">
                  {errors.supplierId.message}
                </Typography>
              )}
            </FormControl>
          </Box>
          <Box mb={3}>
            <TextField
              label="Data da Cotação"
              type="date"
              fullWidth
              variant="outlined"
              {...register("quotationDate", {
                required: "Data da cotação é obrigatória",
              })}
              InputLabelProps={{
                shrink: true,
              }}
              error={!!errors.quotationDate}
              helperText={errors.quotationDate?.message}
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="Preço"
              type="number"
              fullWidth
              variant="outlined"
              {...register("price", {
                required: "Preço é obrigatório e deve ser positivo",
                min: {
                  value: 0.01,
                  message: "Preço deve ser positivo",
                },
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="Meio de Comunicação"
              fullWidth
              variant="outlined"
              {...register("communicationMethod", {
                required: "Meio de comunicação é obrigatório",
                minLength: {
                  value: 3,
                  message:
                    "Meio de comunicação deve ter entre 3 e 50 caracteres",
                },
                maxLength: {
                  value: 50,
                  message:
                    "Meio de comunicação deve ter entre 3 e 50 caracteres",
                },
              })}
              error={!!errors.communicationMethod}
              helperText={errors.communicationMethod?.message}
            />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ borderRadius: 3 }}
            >
              {selectedQuotation ? "Atualizar" : "Salvar"}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => reset()}
              sx={{ borderRadius: 3 }}
            >
              Limpar
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default QuotationForm;