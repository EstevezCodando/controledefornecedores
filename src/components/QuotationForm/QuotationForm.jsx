import React, { useEffect, useState, } from "react";
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
import { addQuotation, editQuotation } from "./QuotationForm.operations";
import { getSuppliers } from "../SupplierForm/SupplierForm.operations";

const QuotationForm = ({
  requestId,
  selectedQuotation,
  setSelectedQuotation,
  onQuotationSaved,
  user,
}) => {
  const [suppliers, setSuppliers] = useState([]);


  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      supplierId: selectedQuotation?.supplierId || "",
      quotationDate: selectedQuotation?.quotationDate || "",
      price: selectedQuotation?.price || "",
    },
  });

  useEffect(() => {
    const fetchSuppliers = async () => {
      const suppliersData = await getSuppliers();
      setSuppliers(suppliersData);
    };
    fetchSuppliers();
  }, []);

  useEffect(() => {
    if (selectedQuotation) {
      setValue("supplierId", selectedQuotation.supplierId || "");
      setValue("quotationDate", selectedQuotation.quotationDate || "");
      setValue("price", selectedQuotation.price || "");
    }
  }, [selectedQuotation, setValue]);

  const onSubmit = async (data) => {
    try {
      const selectedSupplier = suppliers.find(
        (supplier) => supplier.id === data.supplierId
      );

      const quotationData = {
        ...data,
        supplierName: selectedSupplier ? selectedSupplier.name : "",
      };

      if (selectedQuotation) {
        await editQuotation(selectedQuotation.id, quotationData, requestId);
      } else {
        await addQuotation(requestId, quotationData, user);
      }
      onQuotationSaved();
      reset();
      setSelectedQuotation(null);
    } catch (error) {
      console.error("Erro ao salvar cotação:", error);
    }
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
          {selectedQuotation ? "Editar Cotação" : "Cadastrar Nova Cotação"}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
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
                    value={field.value || ""} // Garantindo que sempre tenha um valor controlado
                  >
                    {suppliers.length === 0 ? (
                      <MenuItem disabled>Nenhum fornecedor disponível</MenuItem>
                    ) : (
                      suppliers.map((supplier) => (
                        <MenuItem key={supplier.id} value={supplier.id}>
                          {supplier.name}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                )}
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
              InputLabelProps={{ shrink: true }}
              error={!!errors.quotationDate}
              helperText={errors.quotationDate?.message}
              value={watch("quotationDate") || ""} // Garantindo que sempre tenha um valor controlado
            />
          </Box>

          <Box mb={3}>
            <Controller
              name="price"
              control={control}
              rules={{
                required: "Preço é obrigatório",
                min: {
                  value: 0.01,
                  message: "O preço deve ser maior que zero",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Preço"
                  fullWidth
                  variant="outlined"
                  error={!!errors.price}
                  helperText={errors.price?.message}
                  value={field.value || ""} // Garantindo que sempre tenha um valor controlado
                />
              )}
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
