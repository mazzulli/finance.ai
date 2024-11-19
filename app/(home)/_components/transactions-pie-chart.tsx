"use client";

import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Pie, PieChart } from "recharts";
import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TransactionType } from "@prisma/client";
import { TransactionPercentagePerType } from "@/app/_data/get-dashboard/types";
import PercentageItems from "./percentage-items";

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Investido",
    color: "#FFFFFF",
  },
  [TransactionType.DEPOSIT]: {
    label: "Receitas",
    color: "#55802E",
  },
  [TransactionType.EXPENSE]: {
    label: "Despesas",
    color: "#e93030",
  },
} satisfies ChartConfig;

interface ITransactionsPieChartProps {
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
  typesPercentage: TransactionPercentagePerType;
}

const TransactionsPieChart = ({
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  typesPercentage,
}: ITransactionsPieChartProps) => {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: "#55802E",
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: "#e93030",
    },
    {
      type: TransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: "#FFFFFF",
    },
  ];
  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
        <div className="space-y-2 p-4">
          <PercentageItems
            icon={<TrendingUpIcon size={16} className="text-primary" />}
            title="Receitas"
            value={typesPercentage[TransactionType.DEPOSIT]}
          />
          <PercentageItems
            icon={<PiggyBankIcon size={16} />}
            title="Investimentos"
            value={typesPercentage[TransactionType.INVESTMENT]}
          />
          <PercentageItems
            icon={<TrendingDownIcon size={16} className="text-danger" />}
            title="Despesas"
            value={typesPercentage[TransactionType.EXPENSE]}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsPieChart;
