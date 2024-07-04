import React, { useEffect, useState, useCallback } from "react";
import {
  getQuotations,
  deleteQuotation,
  addQuotation,
} from "../../components/QuotationForm/QuotationForm.operations";
import QuotationForm from "../../components/QuotationForm/QuotationForm";
import { Avatar } from "../../components";
import avatarImage from "../../assets/img/avatar.jpg";
import {
  Container,
  Box,
  Grid,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  TimeScale,
} from "chart.js";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import Fab from "../../components/Fab";
import { getProducts } from "../../components/ProductForm/ProductForm.operations";
import { getSuppliers } from "../../components/SupplierForm/SupplierForm.operations";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  TimeScale
);

const Home = () => {
  const [quotations, setQuotations] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ name: "" });
  const [selectedProduct, setSelectedProduct] = useState("");

  const fetchQuotations = useCallback(async () => {
    const [quotationsData, productsData, suppliersData] = await Promise.all([
      getQuotations(),
      getProducts(filter),
      getSuppliers(),
    ]);

    const quotationsWithNames = quotationsData.map((quotation) => {
      const product = productsData.find((p) => p.id === quotation.productId);
      const supplier = suppliersData.find((s) => s.id === quotation.supplierId);
      return {
        ...quotation,
        productName: product ? product.name : "",
        supplierName: supplier ? supplier.name : "",
      };
    });

    setQuotations(quotationsWithNames);
    setProducts(productsData);
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    fetchQuotations();
  }, [fetchQuotations]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
    fetchQuotations(); // Adicionar busca instantânea ao digitar
  };

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  const handleEdit = (quotation) => {
    setSelectedQuotation(quotation);
  };

  const handleDelete = async (quotationId) => {
    if (window.confirm("Tem certeza de que deseja excluir esta cotação?")) {
      await deleteQuotation(quotationId);
      setQuotations(quotations.filter((q) => q.id !== quotationId));
    }
  };

  const handleAddQuotation = async () => {
    const newQuotation = {
      productId: "",
      supplierId: "",
      quotationDate: new Date().toISOString().split("T")[0],
      price: 0,
      communicationMethod: "",
    };
    await addQuotation(newQuotation);
    setQuotations([...quotations, newQuotation]);
  };

  const columns = [
    { field: "productName", headerName: "Produto", flex: 1 },
    { field: "supplierName", headerName: "Fornecedor", flex: 1 },
    { field: "quotationDate", headerName: "Data da Cotação", flex: 1 },
    { field: "price", headerName: "Preço", flex: 1 },
    {
      field: "edit",
      headerName: "Editar",
      flex: 0.5,
      renderCell: (params) => (
        <IconButton size="small" onClick={() => handleEdit(params.row)}>
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Deletar",
      flex: 0.5,
      renderCell: (params) => (
        <IconButton size="small" onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredQuotations = quotations.filter((q) =>
    q.productName.toLowerCase().includes(filter.name.toLowerCase())
  );

  const groupedByProduct = filteredQuotations.reduce((acc, cur) => {
    if (!acc[cur.productId]) {
      acc[cur.productId] = [];
    }
    acc[cur.productId].push(cur);
    return acc;
  }, {});

  const colors = [
    "rgba(75, 192, 192, 1)",
    "rgba(192, 75, 192, 1)",
    "rgba(192, 192, 75, 1)",
    "rgba(75, 75, 192, 1)",
    "rgba(192, 75, 75, 1)",
    "rgba(75, 192, 75, 1)",
  ];

  const lineData = {
    labels: Array.from(new Set(filteredQuotations.map((q) => q.quotationDate))),
    datasets: selectedProduct
      ? [
          {
            label: products.find((p) => p.id === selectedProduct)?.name,
            data: groupedByProduct[selectedProduct]?.map((q) => q.price) || [],
            borderColor: colors[0],
            backgroundColor: colors[0].replace("1)", "0.2)"),
          },
        ]
      : Object.keys(groupedByProduct).map((productId, index) => ({
          label: products.find((p) => p.id === productId)?.name,
          data: groupedByProduct[productId].map((q) => q.price),
          borderColor: colors[index % colors.length],
          backgroundColor: colors[index % colors.length].replace("1)", "0.2)"),
        })),
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Lista de Cotações
      </Typography>
      <QuotationForm
        selectedQuotation={selectedQuotation}
        setSelectedQuotation={setSelectedQuotation}
      />
      <Box mt={4} mb={2}>
        <Typography variant="h6" component="h2" align="center">
          Buscar Produtos
        </Typography>
        <Box display="flex" justifyContent="center" mb={2}>
          <TextField
            label="Nome"
            name="name"
            value={filter.name}
            onChange={handleFilterChange}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box display="flex" justifyContent="center" mb={2}>
          <FormControl variant="outlined" sx={{ minWidth: 200 }}>
            <InputLabel>Produto</InputLabel>
            <Select
              value={selectedProduct}
              onChange={handleProductChange}
              label="Produto"
            >
              <MenuItem value="">
                <em>Todos</em>
              </MenuItem>
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box
        sx={{
          height: 400,
          width: "100%",
          mt: 4,
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <DataGrid
          rows={filteredQuotations}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          sx={{
            "& .MuiDataGrid-cell": {
              padding: "10px",
              backgroundColor: "rgba(245, 243, 243)",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f5f5",
              borderBottom: "1px solid rgba(224, 224, 224, 1)",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#f5f5f5",
              borderTop: "1px solid rgba(224, 224, 224, 1)",
            },
            "& .MuiDataGrid-cell, & .MuiDataGrid-cellContent": {
              color: "#333",
              fontWeight: 500,
            },
            "& .MuiIconButton-root": {
              padding: "4px",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              },
            },
          }}
        />
      </Box>
      <Box mt={4} mb={4}>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <TextField label="Buscar Cotações" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12} md={4}>
            <Checkbox label="Mostrar somente ativos" />
          </Grid>
          <Grid item xs={12} md={2} className="fabButton">
            <Fab color="primary" onClick={handleAddQuotation}>
              +
            </Fab>
          </Grid>
        </Grid>
      </Box>
      <Box
        mt={4}
        mb={4}
        sx={{
          backgroundColor: "#2F4F4F",
          borderRadius: "16px",
          padding: "16px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          align="center"
          color="white"
        >
          Evolução do Preço das Cotações
        </Typography>
        <Line
          data={lineData}
          options={{
            scales: {
              x: {
                grid: {
                  color: "gray",
                },
              },
              y: {
                grid: {
                  color: "gray",
                },
              },
            },
            plugins: {
              legend: {
                labels: {
                  color: "white",
                },
              },
            },
          }}
        />
      </Box>
      <Box display="flex" justifyContent="center" mt={4}>
        <Avatar src={avatarImage} alt="User Avatar" />
      </Box>
    </Container>
  );
};

export default Home;
