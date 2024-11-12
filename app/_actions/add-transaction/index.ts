"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { addTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

interface AddTransactionParams {
  name: string;
  amount: string;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
}

export const addTransaction = async (
  params: AddTransactionParams, // o Omit retira / desconsidera o parametro userId informado na transaction pois o mesmo não será passado pelo client
) => {
  addTransactionSchema.parse(params);
  const { userId } = await auth();
  const numericValue = parseFloat(params.amount.replace(/\D/g, "")) / 100;
  if (!userId) {
    throw new Error("Unauthorized");
  }
  await db.transaction.create({
    data: { ...params, userId, amount: numericValue },
  });
  revalidatePath("/transactions");
};
