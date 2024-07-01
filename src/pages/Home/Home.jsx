import React, { useEffect, useState } from "react";
import {
  getQuotations,
  deleteQuotation,
  addQuotation,
} from "../../components/QuotationForm/QuotationForm.operations";
import QuotationForm from "../../components/QuotationForm/QuotationForm";
import {
  Container,
  Box,
  Fab,
  Grid,
  TextField,
  Checkbox,
  Typography,
} from "@mui/material";
import { TableList, IconButton, Loading, Avatar } from "../../components";
import { Bar, Line } from "react-chartjs-2";
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
import avatarImage from "../../assets/img/avatar.jpg";
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
  const [suppliers, setSuppliers] = useState([]);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [quotationsData, productsData, suppliersData] = await Promise.all([
        getQuotations(),
        getProducts(),
        getSuppliers(),
      ]);

      const quotationsWithNames = quotationsData.map((quotation) => {
        const product = productsData.find((p) => p.id === quotation.productId);
        const supplier = suppliersData.find(
          (s) => s.id === quotation.supplierId
        );
        return {
          ...quotation,
          productName: product ? product.name : "",
          supplierName: supplier ? supplier.name : "",
        };
      });

      setQuotations(quotationsWithNames);
      setProducts(productsData);
      setSuppliers(suppliersData);
      setLoading(false);
    };
    fetchData();
  }, []);

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
      field: "actions",
      headerName: "Ações",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" justifyContent="center" gap={2}>
          <IconButton type="edit" onClick={() => handleEdit(params.row)} />
          <IconButton
            type="delete"
            onClick={() => handleDelete(params.row.id)}
          />
        </Box>
      ),
    },
  ];

  if (loading) {
    return <Loading />;
  }

  const barData = {
    labels: quotations.map((q) => q.productName),
    datasets: [
      {
        label: "Cotações por Produto",
        data: quotations.map((q) => q.price),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const lineData = {
    labels: quotations.map((q) => q.quotationDate),
    datasets: [
      {
        label: "Evolução do Preço",
        data: quotations.map((q) => q.price),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Lista de Cotações
      </Typography>
      <QuotationForm
        selectedQuotation={selectedQuotation}
        setSelectedQuotation={setSelectedQuotation}
      />
      <TableList data={quotations} columns={columns} />
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
      <Box mt={4} mb={4}>
        <Typography variant="h5" component="h2" gutterBottom>
          Gráfico de Cotações por Produto
        </Typography>
        <Bar data={barData} />
      </Box>
      <Box mt={4} mb={4}>
        <Typography variant="h5" component="h2" gutterBottom>
          Evolução do Preço das Cotações
        </Typography>
        <Line data={lineData} />
      </Box>
      <Box display="flex" justifyContent="center" mt={4}>
        <Avatar src={avatarImage} alt="User Avatar" />
      </Box>
    </Container>
  );
};

export default Home;
