import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import Navbar from "../_components/navbar";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";
import IAReportButton from "./_components/ia-report-button";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

const Home = async ({ searchParams: { month } }: HomeProps) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/login");
  }

  const monthIsInvalid = !month || !isMatch(month, "MM");

  if (monthIsInvalid) {
    const currentMonth = new Date().getMonth();
    redirect(`?month=${currentMonth + 1}`); // +1 because date-fns expects 0-11
  }

  const dashboard = await getDashboard(month, userId);

  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-6 overflow-hidden p-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex gap-4">
            <IAReportButton />
            <TimeSelect />
          </div>
        </div>
        <div className="grid grid-cols-[2fr,1fr] gap-4 overflow-hidden">
          <div className="flex flex-col gap-4 overflow-hidden">
            <SummaryCards month={month} userId={userId} {...dashboard} />
            <div className="grid grid-cols-3 grid-rows-1 gap-4 overflow-hidden">
              <TransactionsPieChart {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </>
  );
};

export default Home;
