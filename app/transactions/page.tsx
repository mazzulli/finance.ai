import { ArrowUpDownIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";

const Transactions = async () => {
  const transactions = await db.transaction.findMany({});
  return (
    <div className="space-y-6 p-6">
      {/* TITULO E BOTÃO */}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <Button className="rounded-full">
          Adicionar transação
          <ArrowUpDownIcon size={18} />
        </Button>
      </div>
      {/* LISTA DE TRANSAÇÕES */}
      <DataTable columns={transactionColumns} data={transactions} />
    </div>
  );
};

export default Transactions;
