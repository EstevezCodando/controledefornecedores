import React, { useState, useEffect } from "react";
import RequestForm from "../components/RequestForm/RequestForm";
import { getRequests } from "../components/RequestForm/RequestForm.operations";
import { Container, Typography, Box } from "@mui/material";
import useStyles from "./RequestPage.styles";

const RequestPage = ({ user }) => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const fetchRequests = async () => {
      const requestsData = await getRequests(user.email);
      setRequests(requestsData);
    };
    fetchRequests();
  }, [user.email]);

  return (
    <Container>
      <Typography variant="h4" className={classes.title}>
        Minhas Requisições de Compras
      </Typography>
      <RequestForm
        selectedRequest={selectedRequest}
        setSelectedRequest={setSelectedRequest}
        user={user}
      />
      <Box mt={4}>
        {requests.length > 0 ? (
          requests.map((request) => (
            <Box
              key={request.id}
              mb={2}
              p={2}
              className={`${classes.requestBox} ${
                request.status === "Cotada"
                  ? classes.cotada
                  : request.status === "Em Cotação"
                  ? classes.emCotacao
                  : classes.aberta
              }`}
              onClick={() => setSelectedRequest(request)}
            >
              <Typography variant="h6">{request.productName}</Typography>
              <Typography>Quantidade: {request.quantity}</Typography>
              <Typography>Status: {request.status}</Typography>
              <Typography>Data da Requisição: {request.requestDate}</Typography>
            </Box>
          ))
        ) : (
          <Typography>Nenhuma requisição encontrada.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default RequestPage;
