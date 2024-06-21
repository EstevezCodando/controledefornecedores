import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { addSupplier } from "./SupplierForm.operations";
import { validateEmail, validatePhone, validateCNPJ } from "../../utils/regex";

const SupplierForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await addSupplier(data);
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
          Cadastrar Fornecedor
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={3}>
            <TextField
              label="Nome"
              fullWidth
              variant="outlined"
              {...register("name", {
                required: true,
                minLength: 5,
                maxLength: 50,
              })}
              error={!!errors.name}
              helperText={
                errors.name
                  ? "Nome é obrigatório e deve ter entre 5 e 50 caracteres"
                  : ""
              }
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="CNPJ"
              fullWidth
              variant="outlined"
              {...register("cnpj", {
                required: true,
                validate: validateCNPJ,
              })}
              error={!!errors.cnpj}
              helperText={
                errors.cnpj ? "CNPJ é obrigatório e deve ser válido" : ""
              }
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="Endereço"
              fullWidth
              variant="outlined"
              {...register("address", {
                required: true,
                minLength: 10,
                maxLength: 100,
              })}
              error={!!errors.address}
              helperText={
                errors.address
                  ? "Endereço é obrigatório e deve ter entre 10 e 100 caracteres"
                  : ""
              }
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              {...register("email", {
                required: true,
                validate: validateEmail,
                minLength: 5,
                maxLength: 30,
              })}
              error={!!errors.email}
              helperText={
                errors.email ? "Email é obrigatório e deve ser válido" : ""
              }
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="Telefone"
              fullWidth
              variant="outlined"
              {...register("phone", {
                required: true,
                validate: validatePhone,
                minLength: 8,
                maxLength: 12,
              })}
              error={!!errors.phone}
              helperText={
                errors.phone ? "Telefone é obrigatório e deve ser válido" : ""
              }
            />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ borderRadius: 3 }}
            >
              Salvar
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

export default SupplierForm;
