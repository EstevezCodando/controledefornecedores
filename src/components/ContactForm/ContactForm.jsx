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
import { addContact } from "./ContactForm.operations";
import { validateEmail, validatePhone } from "../../utils/regex";

const ContactForm = ({ suppliers, selectedSupplier, onContactAdded }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      supplierId: selectedSupplier ? selectedSupplier.id : "",
    },
  });

  const onSubmit = async (data) => {
    data.supplierId = selectedSupplier ? selectedSupplier.id : "";
    console.log("Submitting contact data: ", data); // Debug log
    await addContact(data);
    reset();
    onContactAdded();
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
          Cadastrar Contato
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
              label="Fornecedor"
              fullWidth
              variant="outlined"
              value={selectedSupplier ? selectedSupplier.name : ""}
              InputProps={{
                readOnly: true,
              }}
              {...register("supplierId")}
              error={!!errors.supplierId}
              helperText={errors.supplierId ? "Fornecedor é obrigatório" : ""}
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

export default ContactForm;
