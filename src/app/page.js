'use client'

import styles from "./page.module.css";
import PageWrap from "@/components/PageWrap";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Home() {
  const queryClient = new QueryClient();
  return (
    <div className={styles.page}>
      <QueryClientProvider client={queryClient}>
        {/* <ClientPage /> */}
        <PageWrap />
      </QueryClientProvider>
    </div>
  );
}
