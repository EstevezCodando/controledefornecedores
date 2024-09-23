import { saveAs } from "file-saver";

// Função para exportar as requisições para CSV
export const exportCSV = (requests) => {
  if (!requests || requests.length === 0) {
    console.error("Nenhuma requisição disponível para exportar.");
    return;
  }

  const headers = [
    "Produto",
    "Quantidade",
    "Status",
    "Data de Criação",
    "Usuário",
  ];

  const rows = requests.map((request) => {
    const createdAtDate = request.createdAt
      ? new Date(request.createdAt.seconds * 1000).toLocaleDateString("pt-BR")
      : "Data não disponível"; // Fallback se a data não estiver disponível

    return [
      request.product,
      request.quantity,
      request.status,
      createdAtDate,
      request.userEmail || "Usuário não informado", // Fallback para usuário
    ];
  });

  let csvContent = "";

  // Adicionar cabeçalhos, separados por tabulação
  csvContent += headers.join(";") + "\r\n";

  // Adicionar dados das requisições, separados por tabulação
  rows.forEach((row) => {
    csvContent += row.join(";") + "\r\n";
  });

  // Criar arquivo Blob e realizar o download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "requisicoes.csv");
};
