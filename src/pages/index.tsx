import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Tabs from "@/components/Tabs";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={`${inter.className} min-h-screen bg-background`}>
      <Header />
      <main className="container mx-auto p-4">
        <Tabs />
      </main>
    </div>
  );
}
