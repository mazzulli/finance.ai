import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";

const Home = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/login");
  }

  return (
    <div className="flex w-full flex-col">
      <div>
        <Navbar />
      </div>
      {/* TITULO E BOTÃO */}
      <div className="flex w-full items-center justify-between pl-6 pt-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <div className="w-full p-6">
        {/* DASHBOARD */}
        <SummaryCards />
      </div>
    </div>
  );
};

export default Home;
