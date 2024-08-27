import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../ProductForm/ProductForm.operations";
import {
  createRequest,
  updateRequest,
  deleteRequest,
} from "./RequestForm.operations";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Container,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import useStyles from "./RequestForm.styles";

const RequestForm = ({ selectedRequest, setSelectedRequest, user }) => {
  const [products, setProducts] = useState([]);
  const { register, handleSubmit, control, reset, setValue } = useForm({
    defaultValues: selectedRequest || {},
  });
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await getProducts();
      setProducts(productsData);
    };
    fetchData();
  }, [user.email]);

  useEffect(() => {
    if (selectedRequest) {
      setValue("productId", selectedRequest.productId);
      setValue("quantity", selectedRequest.quantity);
      setValue("observation", selectedRequest.observation);
    }
  }, [selectedRequest, setValue]);

  const onSubmit = async (data) => {
    const requestData = {
      ...data,
      userEmail: user.email,
      status: "Aberta",
      requestDate: new Date().toISOString(),
    };
    if (selectedRequest) {
      await updateRequest(selectedRequest.id, requestData);
    } else {
      await createRequest(requestData);
    }
    setSelectedRequest(null);
    reset();
    navigate("/requests");
  };

  const handleDelete = async () => {
    if (selectedRequest) {
      await deleteRequest(selectedRequest.id);
      setSelectedRequest(null);
      reset();
      navigate("/requests");
    }
    
  };
  
  

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h5">
          {selectedRequest ? "Editar Requisição" : "Nova Requisição"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={3}>
            <FormControl
              fullWidth
              variant="outlined"
              className={classes.formControl}
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
            </FormControl>
          </Box>
          <Box mb={3}>
            <TextField
              label="Quantidade"
              type="number"
              fullWidth
              variant="outlined"
              {...register("quantity", {
                required: "Quantidade é obrigatória",
              })}
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="Observação"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              {...register("observation")}
            />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.submitButton}
            >
              {selectedRequest ? "Atualizar Requisição" : "Criar Requisição"}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => reset()}
              className={classes.resetButton}
            >
              Limpar
            </Button>
            
            <Button onClick={handleDelete} variant="outlined" color="secondary">
              Delete
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default RequestForm;
