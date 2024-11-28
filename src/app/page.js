'use client'

import Header from "@/components/Header";
import styles from "./page.module.css";
import Footer from "@/components/Footer";
import Main from "@/components/Main";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Home() {
  const queryClient = new QueryClient();
  return (
    <div className={styles.page}>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Main />
        <Footer />
      </QueryClientProvider>
    </div>
  );
}
