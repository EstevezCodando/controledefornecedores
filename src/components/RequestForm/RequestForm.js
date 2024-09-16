import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Box,
  Container,
  Typography,
  Paper,
} from "@mui/material";
import {
  createRequest,
  updateRequest,
  getProducts,
} from "./RequestForm.operations";
import { useForm } from "react-hook-form";

const RequestForm = ({
  onRequisitionSubmitted,
  selectedRequest,
  userEmail,
}) => {
  const [products, setProducts] = useState([]);
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      product: "",
      quantity: "",
      observations: "",
    },
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Erro ao obter produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedRequest) {
      setValue("product", selectedRequest.product);
      setValue("quantity", selectedRequest.quantity);
      setValue("observations", selectedRequest.observations);
    }
  }, [selectedRequest, setValue]);

  const onSubmit = async (data) => {
    try {
      if (selectedRequest) {
        await updateRequest(selectedRequest.id, data);
      } else {
        await createRequest({ ...data, userEmail });
      }
      reset();
      if (onRequisitionSubmitted) onRequisitionSubmitted();
    } catch (error) {
      console.error("Erro ao salvar requisição:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          {selectedRequest ? "Editar Requisição" : "Criar Nova Requisição"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={3}>
            <Select
              fullWidth
              {...register("product", { required: true })}
              defaultValue=""
              displayEmpty
            >
              <MenuItem value="" disabled>
                Selecione o Produto
              </MenuItem>
              {products.map((product) => (
                <MenuItem key={product.id} value={product.name}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box mb={3}>
            <TextField
              label="Quantidade"
              type="number"
              fullWidth
              {...register("quantity", { required: true })}
              InputProps={{ inputProps: { min: 1 } }}
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="Observações"
              multiline
              rows={4}
              fullWidth
              {...register("observations")}
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {selectedRequest ? "Atualizar Requisição" : "Criar Requisição"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default RequestForm;
