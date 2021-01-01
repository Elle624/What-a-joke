import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <section className={styles.container}>
      <Head>
        <title>What A Joke</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1 className={styles.h1}>What A Joke </h1>
      <Link href='/jokes'>
        <h2 className={styles.h2}>👉 Ready for laughing? 👈</h2>
      </Link>
    </section>
  );
}
