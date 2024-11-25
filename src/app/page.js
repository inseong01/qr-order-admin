import Header from "@/components/Header";
import styles from "./page.module.css";
import Footer from "@/components/Footer";
import Main from "@/components/Main";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
