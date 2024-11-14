import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import Navbar from "../_components/navbar";

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

  return (
    <div className="flex w-full flex-col">
      <Navbar />
      {/* TITULO E BOTÃO */}
      <div className="flex w-full items-center justify-between p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <TimeSelect />
      </div>
      <div className="w-full p-6">
        {/* DASHBOARD */}
        <SummaryCards month={month} userId={userId} />
      </div>
    </div>
  );
};

export default Home;
