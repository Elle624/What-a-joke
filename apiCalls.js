export const apiCalls = {
  fetchRadomJoke() {
    return fetch('http://api.icndb.com/jokes/random').then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(
          'Sorry we are having difficulty loading this page, please try again later!'
        );
      }
    });
  },

  fetchFavoriteJoke(id) {
    return fetch(`http://api.icndb.com/jokes/${id}`).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(
          'Sorry we are having difficulty loading this page, please try again later!'
        );
      }
    });
  }
};
