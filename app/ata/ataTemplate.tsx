export default function ataHTML({
  numero,
  data,
  local,
  horarioInicio,
  horarioFim,
  grau,
  topicos,
  observacoes,
}: any) {
  const topicosArray = Array.isArray(topicos)
    ? topicos
    : typeof topicos === "string"
    ? topicos.split(",").map((t) => t.trim())
    : [];

  return `
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: Arial, sans-serif; padding: 24px; }
          h1   { text-align: center; }
          h2   { margin-top: 24px; }
          p    { line-height: 1.6; }
          ul   { margin-left: 16px; }
        </style>
      </head>
      <body>
        <h1>Ata Nº ${numero}</h1>
        <p><strong>Data:</strong> ${data}</p>
        <p><strong>Local:</strong> ${local}</p>
        <p><strong>Horário:</strong> ${horarioInicio} – ${horarioFim}</p>
        <p><strong>Grau:</strong> ${grau}</p>

        <h2>Tópicos discutidos</h2>
        <ul>
          ${topicosArray.map((t: string) => `<li>${t}</li>`).join("")}
        </ul>

        <h2>Observações</h2>
        <p>${observacoes || "—"}</p>
      </body>
    </html>
  `;
}
