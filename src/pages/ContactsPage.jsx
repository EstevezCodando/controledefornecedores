import React, { useState, useEffect, useCallback } from "react";
import { getSuppliers } from "../components/SupplierForm/SupplierForm.operations";
import ContactForm from "../components/ContactForm/ContactForm";
import {
  getContacts,
  deleteContact,
} from "../components/ContactForm/ContactForm.operations";
import {
  Box,
  Typography,
  Container,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
  Button,
} from "@mui/material";

const ContactsPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [filter, setFilter] = useState({ name: "" });

  useEffect(() => {
    const fetchSuppliers = async () => {
      const suppliersData = await getSuppliers();
      setSuppliers(suppliersData);
    };
    fetchSuppliers();
  }, []);

  const fetchContacts = useCallback(async () => {
    if (selectedSupplier) {
      const contactsData = await getContacts(selectedSupplier.id);
      setContacts(contactsData);
    }
  }, [selectedSupplier]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleSupplierChange = (event) => {
    const supplierId = event.target.value;
    const supplier = suppliers.find((s) => s.id === supplierId);
    setSelectedSupplier(supplier);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    if (selectedSupplier) {
      const contactsData = await getContacts(selectedSupplier.id);
      const filteredContacts = contactsData.filter((contact) =>
        contact.name.toLowerCase().includes(filter.name.toLowerCase())
      );
      setContacts(filteredContacts);
    }
  };

  const handleEdit = (contact) => {
    setSelectedContact(contact);
  };

  const handleDelete = async (contactId) => {
    if (window.confirm("Tem certeza de que deseja excluir este contato?")) {
      await deleteContact(contactId);
      fetchContacts();
    }
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
      <ContactForm
        suppliers={suppliers}
        selectedSupplier={selectedSupplier}
        selectedContact={selectedContact}
        onContactAdded={fetchContacts}
        onContactUpdated={() => {
          setSelectedContact(null);
          fetchContacts();
        }}
      />
      {selectedSupplier && (
        <Box mt={4}>
          <Typography variant="h6" component="h2" gutterBottom>
            Buscar Contatos
          </Typography>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <TextField
              label="Nome"
              name="name"
              value={filter.name}
              onChange={handleFilterChange}
              variant="outlined"
              sx={{ marginRight: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              sx={{ marginRight: 2 }}
            >
              Buscar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                setFilter({ name: "" });
                fetchContacts();
              }}
            >
              Limpar
            </Button>
          </Box>
        </Box>
      )}
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
              <Button onClick={() => handleEdit(contact)}>Editar</Button>
              <Button onClick={() => handleDelete(contact.id)}>Excluir</Button>
            </Paper>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default ContactsPage;
