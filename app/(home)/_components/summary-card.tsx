import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { ReactNode } from "react";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: string;
}

const SummaryCard = ({ icon, title, amount }: SummaryCardProps) => {
  return (
    <Card>
      <CardHeader className="flex-row items-center gap-2">
        {icon}
        <p className="text-white opacity-70">{title}</p>
      </CardHeader>
      <CardContent className="flex items-center">
        <p className="text-2xl font-bold">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(Number(amount))}
        </p>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
