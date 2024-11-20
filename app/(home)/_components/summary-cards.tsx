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
import { canUserAddTransaction } from "@/app/_data/can-user-add-transaction";

interface ISummaryCards {
  month: string;
  userId: string;
  balance: number;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
}

const SummaryCards = async ({
  balance,
  depositsTotal,
  investmentsTotal,
  expensesTotal,
}: ISummaryCards) => {
  const userCanAddTransactions = await canUserAddTransaction();
  return (
    <div className="space-y-2">
      {/* PRIMEIRO CARD */}
      <Card className="bg-zinc-900">
        <CardHeader className="flex-row items-center gap-2">
          <WalletIcon size={16} />
          <p className="text-sm text-white opacity-70">Saldo</p>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <p
              className={`${balance < 0 ? "text-2xl font-bold text-danger" : "text-2xl font-bold text-primary"}`}
            >
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(balance))}
            </p>
            <Eye />
          </div>
          <AddTransactionButton
            userCanAddTransaction={userCanAddTransactions}
          />
        </CardContent>
      </Card>

      {/* OUTROS CARDS */}
      <div className="grid grid-cols-3 gap-2 text-sm">
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
