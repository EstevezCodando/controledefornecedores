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
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import { addProduct, updateProduct } from "./ProductForm.operations";
import { getSuppliers } from "../SupplierForm/SupplierForm.operations";

const ProductForm = ({ selectedProduct, setSelectedProduct }) => {
  const [suppliers, setSuppliers] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: selectedProduct || {},
  });

  useEffect(() => {
    const fetchSuppliers = async () => {
      const suppliersData = await getSuppliers();
      setSuppliers(suppliersData);
    };
    fetchSuppliers();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setValue("name", selectedProduct.name);
      setValue("description", selectedProduct.description);
      setValue("category", selectedProduct.category);
      setValue(
        "technicalSpecifications",
        selectedProduct.technicalSpecifications
      );
      setValue("suppliers", selectedProduct.suppliers || []);
    }
  }, [selectedProduct, setValue]);

  const onSubmit = async (data) => {
    if (selectedProduct) {
      await updateProduct(selectedProduct.id, data);
    } else {
      await addProduct(data);
    }
    setSelectedProduct(null);
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
          {selectedProduct ? "Editar Produto" : "Cadastrar Produto"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={3}>
            <TextField
              label="Nome"
              fullWidth
              variant="outlined"
              {...register("name", {
                required: true,
                minLength: 3,
                maxLength: 50,
              })}
              error={!!errors.name}
              helperText={
                errors.name
                  ? "Nome é obrigatório e deve ter entre 3 e 50 caracteres"
                  : ""
              }
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="Descrição"
              fullWidth
              variant="outlined"
              {...register("description", {
                required: true,
                minLength: 10,
                maxLength: 200,
              })}
              error={!!errors.description}
              helperText={
                errors.description
                  ? "Descrição é obrigatória e deve ter entre 10 e 200 caracteres"
                  : ""
              }
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="Categoria"
              fullWidth
              variant="outlined"
              {...register("category", {
                required: true,
                minLength: 3,
                maxLength: 50,
              })}
              error={!!errors.category}
              helperText={
                errors.category
                  ? "Categoria é obrigatória e deve ter entre 3 e 50 caracteres"
                  : ""
              }
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="Especificações Técnicas"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              {...register("technicalSpecifications", {
                required: true,
                minLength: 10,
                maxLength: 500,
              })}
              error={!!errors.technicalSpecifications}
              helperText={
                errors.technicalSpecifications
                  ? "Especificações técnicas são obrigatórias e devem ter entre 10 e 500 caracteres"
                  : ""
              }
            />
          </Box>
          <Box mb={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="supplier-select-label">Fornecedores</InputLabel>
              <Controller
                name="suppliers"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="supplier-select-label"
                    multiple
                    input={<OutlinedInput label="Fornecedores" />}
                    renderValue={(selected) =>
                      selected
                        .map(
                          (value) => suppliers.find((s) => s.id === value).name
                        )
                        .join(", ")
                    }
                  >
                    {suppliers.map((supplier) => (
                      <MenuItem key={supplier.id} value={supplier.id}>
                        <Checkbox checked={field.value.includes(supplier.id)} />
                        <ListItemText primary={supplier.name} />
                      </MenuItem>
                    ))}
                  </Select>
                )}
                defaultValue={selectedProduct ? selectedProduct.suppliers : []}
              />
            </FormControl>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ borderRadius: 3 }}
            >
              {selectedProduct ? "Atualizar" : "Salvar"}
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

export default ProductForm;
