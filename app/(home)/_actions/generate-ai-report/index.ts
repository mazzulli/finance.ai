"use server";
import OpenAI from "openai";
import { db } from "@/app/_lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { GenerateAiReportSchema, generateAiReportSchema } from "./schema";

export const generateAiReport = async ({ month }: GenerateAiReportSchema) => {
  // valida se o mês existe e é válido
  try {
    generateAiReportSchema.parse({ month });
  } catch (error) {
    console.log(error);
    throw new Error("Mês inválido.");
  }

  // validar se o user está logado
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // valida se o usuário tem o plano premium
  const user = await clerkClient.users.getUser(userId);
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium";
  if (!hasPremiumPlan) {
    throw new Error(
      "Você precisa de um plano Premium para acessar o relatório.",
    );
  }

  // conectar com chatGPT
  const openAi = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  //pegar as transações do mês recebido
  const transactions = await db.transaction.findMany({
    where: {
      date: {
        gte: new Date(`2024-${month}-01`),
        lt: new Date(`2024-${month}-31`),
      },
      userId,
    },
  });

  //envar as transações para o ChatGPT e pedir para ele gerar um relatorio com insights
  const content = `Gere um relatório com insights sobre as minhas finanças, com dicas e orientações de como melhorar
  minha vida financeira. As transações estão divididas por ponto e virgula. A estrutura de cada uma é {DATA}-{TIPO}-{VALOR}-{CATEGORIA}. São elas:
  ${transactions
    .map(
      (transaction) =>
        `${transaction.date.toLocaleDateString("pt-BR")}-${transaction.type}-R$${transaction.amount}-${transaction.category}`,
    )
    .join(";")}`;

  const completion = await openAi.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Você é um especialista em gestão de finanças pessoais. Você ajuda as pessoas a organizarem melhor as suas finanças.",
      },
      {
        role: "user",
        content: content,
      },
    ],
  });

  //pegar o relatório gerado pelo ChatGPT e retornar para o usuário
  return completion.choices[0].message.content;
};
