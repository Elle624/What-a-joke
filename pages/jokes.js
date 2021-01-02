import useSWR, { mutate } from 'swr';
import styles from '../styles/Jokes.module.css';

const Jokes = () => {
  const { data, error } = useSWR('http://api.icndb.com/jokes/random/');
  return (
    <>
      <section className={styles.jokeContainer}>
        {error && <p>failed to get you a laugh, please try again!</p>}
        <p>{data ? data.value.joke : 'Loading...'}</p>
        <section className={styles.nav}>
          <button onClick={() => mutate('http://api.icndb.com/jokes/random/')}>
            🤦‍♀️❌
          </button>
          <button>😹🉑</button>
        </section>
      </section>
      <section className={styles.displayFavJokes}></section>
    </>
  );
};

export default Jokes;
