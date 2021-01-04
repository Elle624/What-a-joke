import React, { useState, useEffect } from 'react';
import { apiCalls } from '../../../apiCalls';
import styles from './Jokes.module.css';

const DisplayJokes = () => {
  let [favJokes, setFavJokes] = useState([]);
  let [randomJoke, setRandomJoke] = useState('');
  let [error, setError] = useState('');

  const getRandomJoke = () => {
    apiCalls
      .fetchRadomJoke()
      .then((data) => setRandomJoke(data.value))
      .catch((err) => setError(err.message));
  };

  const addFavoriteJoke = (id) => {
    apiCalls
      .fetchFavoriteJoke(id)
      .then((data) => {
        if (!favJokes.find((jokeDeets) => jokeDeets.joke === data.value.joke)) {
          const updateFavJokesList = [...favJokes, data.value];
          setFavJokes(updateFavJokesList);
        }
      })
      .catch((err) => setError(err.message));
  };

  useEffect(() => getRandomJoke(), []);

  return (
    <>
      <section className={styles.jokeContainer}>
        {error && <p>failed to get you a laugh, please try again!</p>}
        <p>{randomJoke ? randomJoke.joke : 'Loading...'}</p>
        <section className={styles.nav}>
          <button onClick={getRandomJoke}>🤦‍♀️❌</button>
          <button onClick={() => addFavoriteJoke(randomJoke.id)}>😹🉑</button>
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
