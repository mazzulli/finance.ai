"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { upsertTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

interface UpsertTransactionParams {
  id?: string;
  name: string;
  amount: string;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
}

export const upsertTransaction = async (
  params: UpsertTransactionParams, // o Omit retira / desconsidera o parametro userId informado na transaction pois o mesmo não será passado pelo client
) => {
  upsertTransactionSchema.parse(params);
  const { userId } = await auth();
  const numericValue = parseFloat(params.amount.replace(/\D/g, "")) / 100;
  if (!userId) {
    throw new Error("Unauthorized");
  }

  console.log(params);

  await db.transaction.upsert({
    update: { ...params, userId, amount: numericValue },
    create: { ...params, userId, amount: numericValue },
    where: {
      id: params?.id ?? "",
    },
  });
  revalidatePath("/transactions");
};
