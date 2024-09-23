import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RequestForm from "../components/RequestForm/RequestForm";
import QuotationForm from "../components/QuotationForm/QuotationForm";
import {
  getRequests,
  deleteRequest,
  checkAndUpdateRequestStatus,
} from "../components/RequestForm/RequestForm.operations";
import {
  getQuotationsByRequestId,
  deleteQuotation,
} from "../components/QuotationForm/QuotationForm.operations";
import { RequestBox, Title } from "./RequestPage.styles";


const RequestPage = ({ user }) => {
  const [requests, setRequests] = useState([]);
  const [quotations, setQuotations] = useState({});
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedQuotation, setSelectedQuotation] = useState(null);

  // Função para buscar as requisições do usuário logado
  const fetchRequests = useCallback(async () => {
    try {
      // Passando corretamente o user.email e user.userType
      const requestsData = await getRequests(user.email, user.userType);

      setRequests(requestsData);

      // Carregar as cotações para todas as requisições
      const quotationsData = {};
      for (const request of requestsData) {
        const requestQuotations = await getQuotationsByRequestId(request.id);
        quotationsData[request.id] = requestQuotations;
      }
      setQuotations(quotationsData);
    } catch (error) {
      console.error("Erro ao buscar requisições e cotações:", error);
    }
  }, [user.email, user.userType]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleDeleteRequest = async (requestId) => {
    try {
      await deleteRequest(requestId);
      await checkAndUpdateRequestStatus(requestId);
      fetchRequests();
    } catch (error) {
      console.error("Erro ao deletar requisição:", error);
    }
  };

  const handleQuotationSaved = async (requestId) => {
    try {
      await checkAndUpdateRequestStatus(requestId);
      fetchRequests();
    } catch (error) {
      console.error("Erro ao salvar cotação:", error);
    }
  };

  const handleDeleteQuotation = async (quotationId, requestId) => {
    try {
      await deleteQuotation(quotationId, requestId);
      await checkAndUpdateRequestStatus(requestId);
      fetchRequests();
    } catch (error) {
      console.error("Erro ao deletar cotação:", error);
    }
  };

  return (
    <Container>
      <Title>Minhas Requisições de Compras</Title>

      {/* Formulário para criar ou editar requisições */}
      <RequestForm
        onRequisitionSubmitted={fetchRequests}
        selectedRequest={selectedRequest}
        setSelectedRequest={setSelectedRequest}
        userEmail={user.email}
        requests={requests}
      />

      {/* Exibição das requisições agrupadas por status */}
      {["Aberta", "Em Cotação", "Cotada"].map((status, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{status}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {requests.filter((request) => request.status === status).length >
            0 ? (
              requests
                .filter((request) => request.status === status)
                .map((request) => (
                  <RequestBox key={request.id}>
                    <Typography variant="h6">{request.product}</Typography>
                    <Typography>Quantidade: {request.quantity}</Typography>
                    <Typography>Status: {request.status}</Typography>
                    <Typography>Usuário: {request.userEmail}</Typography>
                    <Typography>
                      Data da Requisição:{" "}
                      {format(
                        new Date(request.createdAt.seconds * 1000),
                        "dd/MM/yyyy",
                        {
                          locale: ptBR,
                        }
                      )}
                    </Typography>

                    {/* Administrador pode ver o formulário de cotação */}
                    {user.userType === "admin" &&
                      request.status !== "Cotada" && (
                        <QuotationForm
                          requestId={request.id}
                          selectedQuotation={selectedQuotation}
                          setSelectedQuotation={setSelectedQuotation}
                          onQuotationSaved={() =>
                            handleQuotationSaved(request.id)
                          }
                          user={user}
                        />
                      )}

                    {/* Exibe as cotações como caixas expansíveis */}
                    {quotations[request.id]?.map((quotation, index) => (
                      <Accordion key={quotation.id}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography>
                            Cotação {index + 1}: R$ {quotation.price}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            Fornecedor: {quotation.supplierName}
                          </Typography>
                          <Typography>
                            Data da Cotação:{" "}
                            {format(
                              new Date(quotation.quotationDate),
                              "dd/MM/yyyy",
                              {
                                locale: ptBR,
                              }
                            )}
                          </Typography>
                          <Typography>Usuário: {quotation.userName}</Typography>

                          {/* Somente Administrador pode editar ou excluir cotações */}
                          {user.userType === "admin" && (
                            <>
                              <Button
                                variant="outlined"
                                onClick={() => setSelectedQuotation(quotation)}
                              >
                                Editar Cotação
                              </Button>

                              <Button
                                variant="outlined"
                                color="error"
                                onClick={() =>
                                  handleDeleteQuotation(
                                    quotation.id,
                                    request.id
                                  )
                                }
                              >
                                Excluir Cotação
                              </Button>
                            </>
                          )}
                        </AccordionDetails>
                      </Accordion>
                    ))}

                    {/* Somente o proprietário da requisição ou administrador pode excluir */}
                    {(user.userType === "admin" ||
                      request.userEmail === user.email) && (
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDeleteRequest(request.id)}
                      >
                        Excluir Requisição
                      </Button>
                    )}
                  </RequestBox>
                ))
            ) : (
              <Typography>Nenhuma requisição encontrada.</Typography>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default RequestPage;
