import { Badge } from "@/app/_components/ui/badge";
import { Transaction, TransactionType } from "@prisma/client";
import { CircleIcon } from "lucide-react";

interface ITransactionTypeBadgeProps {
  transaction: Transaction;
}

const TransactionTypeBadge = ({ transaction }: ITransactionTypeBadgeProps) => {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="bg-muted font-bold text-primary hover:bg-muted">
        <CircleIcon className="mr-1 fill-primary" size={10} />
        Depósito
      </Badge>
    );
  }
  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="bg-danger bg-muted bg-opacity-10 font-bold text-danger hover:bg-muted">
        <CircleIcon className="mr-1 fill-danger" size={10} />
        Despesa
      </Badge>
    );
  }
  return (
    <Badge className="bg-muted bg-opacity-10 font-bold text-white hover:bg-muted">
      <CircleIcon className="mr-1 fill-white" size={10} />
      Investimento
    </Badge>
  );
};

export default TransactionTypeBadge;
