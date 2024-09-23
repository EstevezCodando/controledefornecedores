import React, { useEffect, useState } from "react";
import SupplierForm from "../components/SupplierForm/SupplierForm";
import DataTableComponent from "../components/DataTable/DataTable";
import { firestoreDb } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { Box, Typography } from "@mui/material";
import {
  getSupplierDependencies,
  deleteSupplier,
} from "../components/SupplierForm/SupplierForm.operations";

const SupplierPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      const querySnapshot = await getDocs(collection(firestoreDb, "suppliers"));
      const suppliersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSuppliers(suppliersList);
    };

    fetchSuppliers();
  }, []);

  const handleEdit = (supplier) => {
    setSelectedSupplier(supplier);
  };

const fetchSuppliers = async () => {
  const querySnapshot = await getDocs(collection(firestoreDb, "suppliers"));
  const suppliersList = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  setSuppliers(suppliersList);
};

  const handleDelete = async (supplier) => {
    const dependencies = await getSupplierDependencies(supplier.id);
    if (
      dependencies.contacts.length > 0 ||
      dependencies.products.length > 0 ||
      dependencies.quotations.length > 0
    ) {
      if (
        window.confirm(
          `O fornecedor ${supplier.name} está vinculado a outros dados (contatos, produtos, cotações). Deseja excluir todos os dados relacionados?`
        )
      ) {
        await deleteSupplier(supplier.id);
        setSuppliers(suppliers.filter((s) => s.id !== supplier.id));
      }
    } else {
      if (window.confirm(`Deseja excluir o fornecedor ${supplier.name}?`)) {
        await deleteSupplier(supplier.id);
        setSuppliers(suppliers.filter((s) => s.id !== supplier.id));
      }
    }
  };


  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h3" component="h1" gutterBottom>
        Cadastro de Fornecedores
      </Typography>
      <SupplierForm
        selectedSupplier={selectedSupplier}
        onSubmitSuccess={fetchSuppliers}
      />
      <DataTableComponent
        data={suppliers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default SupplierPage;
