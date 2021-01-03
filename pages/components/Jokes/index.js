import useSWR, { mutate } from 'swr';
import React, { useState } from 'react';
import styles from './Jokes.module.css';

const DisplayJokes = () => {
  let [favJokes, setFavJokes] = useState([]);
  const { data, error } = useSWR('http://api.icndb.com/jokes/random/');
  const addFavoriteJoke = (id) => {
    fetch(`http://api.icndb.com/jokes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!favJokes.find((jokeDeets) => jokeDeets.joke === data.value.joke)) {
          const updateFavJokesList = [...favJokes, data.value];
          setFavJokes(updateFavJokesList);
        }
      });
  };

  return (
    <>
      <section className={styles.jokeContainer}>
        {error && <p>failed to get you a laugh, please try again!</p>}
        <p>{data ? data.value.joke : 'Loading...'}</p>
        <section className={styles.nav}>
          <button onClick={() => mutate('http://api.icndb.com/jokes/random/')}>
            🤦‍♀️❌
          </button>
          <button onClick={() => addFavoriteJoke(data.value.id)}>😹🉑</button>
        </section>
      </section>
      <section className={styles.displayFavJokes}>
        {favJokes.map((jokeDetails) => (
          <section key={jokeDetails.id} className={styles.favJokeCard}>
            <p>{jokeDetails.joke}</p>
          </section>
        ))}
      </section>
    </>
  );
};
export default DisplayJokes;
