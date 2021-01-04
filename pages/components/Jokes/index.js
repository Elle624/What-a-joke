//import useSWR, { mutate } from 'swr';
import React, { useState, useEffect } from 'react';
import styles from './Jokes.module.css';

const DisplayJokes = () => {
  let [randomJoke, setRandomJoke] = useState('');
  let [favJokes, setFavJokes] = useState([]);
  // const { data, error } = useSWR('http://api.icndb.com/jokes/random/');
  const getRandomJoke = () => {
    return fetch('http://api.icndb.com/jokes/random')
      .then((res) => res.json())
      .then((data) => setRandomJoke(data.value));
  };

  useEffect(() => getRandomJoke(), []);

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
        {/* {error && <p>failed to get you a laugh, please try again!</p>}
        <p>{data ? data.value.joke : 'Loading...'}</p> */}
        <p>{randomJoke.joke}</p>
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
