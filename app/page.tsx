import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "./_components/navbar";

const Home = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/login");
  }

  return (
    <>
      <div>
        <Navbar />
      </div>
      <h1>Dashboard Page</h1>
    </>
  );
};

export default Home;
