import AddTransactionButton from "@/app/_components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import {
  Eye,
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";
import { db } from "@/app/_lib/prisma";

const SummaryCards = async () => {
  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );

  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { type: "EXPENSE" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );

  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );

  const balance = depositsTotal - investmentsTotal - expensesTotal;

  return (
    <div className="space-y-6">
      {/* PRIMEIRO CARD */}
      <Card>
        <CardHeader className="flex-row items-center gap-2">
          <WalletIcon size={16} />
          <p className="text-white opacity-70">Saldo</p>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <p
              className={`${balance < 0 ? "text-4xl font-bold text-danger" : "text-4xl font-bold text-primary"}`}
            >
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(balance))}
            </p>
            <Eye />
          </div>
          <AddTransactionButton />
        </CardContent>
      </Card>

      {/* OUTROS CARDS */}
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investido"
          amount={String(investmentsTotal)}
        />
        <SummaryCard
          icon={<TrendingUpIcon className="text-primary" size={16} />}
          title="Receita"
          amount={String(depositsTotal)}
        />
        <SummaryCard
          icon={<TrendingDownIcon className="text-danger" size={16} />}
          title="Despesa"
          amount={String(expensesTotal)}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
