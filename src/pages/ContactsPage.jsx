import React, { useState, useEffect } from "react";
import { getSuppliers } from "../components/SupplierForm/SupplierForm.operations";
import ContactForm from "../components/ContactForm/ContactForm";
import { getContacts } from "../components/ContactForm/ContactForm.operations";
import {
  Box,
  Typography,
  Container,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const ContactsPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      const suppliersData = await getSuppliers();
      setSuppliers(suppliersData);
    };
    fetchSuppliers();
  }, []);

  useEffect(() => {
    if (selectedSupplier) {
      const fetchContacts = async () => {
        const contactsData = await getContacts(selectedSupplier.id);
        setContacts(contactsData);
      };
      fetchContacts();
    }
  }, [selectedSupplier]);

  const handleSupplierChange = (event) => {
    const supplierId = event.target.value;
    const supplier = suppliers.find((s) => s.id === supplierId);
    setSelectedSupplier(supplier);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Cadastro de Contatos
      </Typography>
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="supplier-select-label">
          Selecionar Fornecedor
        </InputLabel>
        <Select
          labelId="supplier-select-label"
          value={selectedSupplier ? selectedSupplier.id : ""}
          onChange={handleSupplierChange}
          label="Selecionar Fornecedor"
        >
          {suppliers.map((supplier) => (
            <MenuItem key={supplier.id} value={supplier.id}>
              {supplier.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ContactForm suppliers={suppliers} selectedSupplier={selectedSupplier} />
      {selectedSupplier && (
        <Box mt={4}>
          <Typography variant="h5" component="h2" gutterBottom>
            Contatos do Fornecedor: {selectedSupplier.name}
          </Typography>
          {contacts.map((contact) => (
            <Paper key={contact.id} sx={{ padding: 2, marginBottom: 2 }}>
              <Typography variant="h6">{contact.name}</Typography>
              <Typography>Email: {contact.email}</Typography>
              <Typography>Telefone: {contact.phone}</Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default ContactsPage;
