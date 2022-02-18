import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Movie from './Movie';
import './App.css';

class App extends React.Component {
  // у нас есть стейт, который хранит в себе текущее 
  // состояние: загружен ли список фильмов или нет
  state = {
    isLoading: true,
    // массив movies будет хранить в себе список фильмов,
    // который мы получим через API
    movies: []
  };

  // эта функция должна выполняться асинхронно, ждем
  // ответа с сервера, где лежит список фильмов
  getMovies = async () => {
    const {
      data: {
        data: {movies},
      },
    } = await axios.get('https://yts.mx/api/v2/list_movies.json?sort_by=rating');
    // console.log(movies);

    // записываем в наше состояние movies [],
    // movies из нашего стейта будет равен переменной movies,
    // которую мы сохранили в data: {movies}
    this.setState({movies: movies, isLoading: false})
  }

  // когда страница с фильмами загрузилась
  componentDidMount() {
    // вызываем функцию setTimeout, которая вызывает
    // функцию через какой-то интервал времени,
    // внутри вызываем функцию setState, заканчиваем
    // загрузку страницы, поэтому пишем false, и setState
    // вызовется спустя 6 секунд после загрузки страницы
    // setTimeout(() => {
    //   this.setState({isLoading: false})
    // }, 6000);

    this.getMovies();
  }

  render() {
    // распаковываем значение объекта: const {isLoading}
    // и указываем откуда мы его распаковываем: = this.state
    const {isLoading, movies} = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
              <span className="loader__text">Загрузка...</span>
          </div> 
          ) : (
            <div className="movies">
              {movies.map((movie) => (
                <Movie
                  key={movie.id}
                  id={movie.id} 
                  year={movie.year} 
                  title={movie.title} 
                  summary={movie.summary} 
                  poster={movie.medium_cover_image}
                  genres={movie.genres}
                />
              ))}
            </div>
          )}
      </section>
    );
  }
}

export default App;

// нижеприведенная строка это пропс. name это название
// пропса, а вода это значение пропса.
// <Food name="water" />
