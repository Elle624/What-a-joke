import useSWR, { mutate } from 'swr';
import styles from '../styles/Jokes.module.css';

const Jokes = () => {
  const { data, error } = useSWR('http://api.icndb.com/jokes/random/');
  return (
    <section className={styles.jokeContainer}>
      {error && <p>failed to get you a laugh, please try again!</p>}
      <p>{data ? data.value.joke : 'Loading...'}</p>
      <button onClick={() => mutate('http://api.icndb.com/jokes/random/')}>
        Not Funny Try Again!
      </button>
    </section>
  );
};

export default Jokes;
