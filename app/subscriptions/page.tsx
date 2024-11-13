import { auth } from "@clerk/nextjs/server";
import Navbar from "../_components/navbar";
import { redirect } from "next/navigation";

const Subscriptions = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  return (
    <>
      <div>
        <Navbar />
      </div>
      <h1>Subscription Page</h1>
    </>
  );
};

export default Subscriptions;
