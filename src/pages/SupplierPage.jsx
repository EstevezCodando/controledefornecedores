import React, { useEffect, useState } from "react";
import SupplierForm from "../components/SupplierForm/SupplierForm";
import DataTableComponent from "../components/DataTable/DataTable";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { Box, Typography } from "@mui/material";

const SupplierPage = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      const querySnapshot = await getDocs(collection(db, "suppliers"));
      const suppliersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSuppliers(suppliersList);
    };

    fetchSuppliers();
  }, []);

  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h3" component="h1" gutterBottom>
        Cadastro de Fornecedores
      </Typography>
      <SupplierForm />
      <DataTableComponent data={suppliers} />
    </Box>
  );
};

export default SupplierPage;
