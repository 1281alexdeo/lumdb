import React, { Component } from 'react';
import styled from 'styled-components';
import Movie from './Movie';
import './App.css';
import SearchMovie from './SearchMovie';
const URL =
  'https://api.themoviedb.org/3/discover/movie?api_key=c0498fac0d51f736066267679e5aa30f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';

const SEARCH_ENDPOINT =
  'https://api.themoviedb.org/3/search/movie?api_key=c0498fac0d51f736066267679e5aa30f&language=en-US&query=It&page=1&include_adult=false';

class MovieList extends Component {
  state = {
    movies: [],
    pages: 1,
    filteredMovies: []
  };

  searchMovies = e => {
    const { movies } = this.state;
    console.log(e.target.value);
    let keyword = e.target.value;
    let serchedMovie = movies.filter(movie =>
      movie.title.toLowerCase().includes(keyword.toLowerCase())
    );

    this.setState({ filteredMovies: serchedMovie });
  };

  async componentDidMount() {
    if (localStorage.getItem('state') == null) {
      try {
        const res = await fetch(URL);

        const movies = await res.json();

        this.setState({
          movies: movies.results
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      let LS_state = JSON.parse(localStorage.getItem('state'));

      this.setState(LS_state);
    }
  }

  async shouldComponentUpdate(nextProps, nextState, nextContext) {
    let currentstate = JSON.parse(localStorage.getItem('state'));
    const { pages } = nextState;
    if (this.state.pages != pages && currentstate != nextState) {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=c0498fac0d51f736066267679e5aa30f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pages}`
        );
        const movies = await res.json();

        this.setState({
          movies: movies.results
        });

        localStorage.setItem('state', JSON.stringify(this.state));
        let local = JSON.parse(localStorage.getItem('state')).filteredMovies;
        if (local.length > 0) {
          this.setState({
            filteredMovies: []
          });
          localStorage.setItem('state', JSON.stringify(this.state));
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  controls = () => (
    <div>
      <h1>hello</h1>
    </div>
  );
  render() {
    const { movies, pages, filteredMovies } = this.state;
    let filteredResult = filteredMovies.map(mov => (
      <Movie key={mov.id} movie={mov} />
    ));
    let moviedata = movies.map(movie => <Movie key={movie.id} movie={movie} />);
    let disabled = null;
    pages <= 1 ? (disabled = 'disabled') : (disabled = null);
    return (
      <div className="App">
        <SearchMovie search={this.searchMovies} movies={movies} />
        <div>
          <MovieGrid>{filteredResult}</MovieGrid>
          <MovieGrid>{moviedata}</MovieGrid>
        </div>

        <br />
        <span>
          {disabled ? (
            <Button
              disabled
              onClick={() =>
                this.setState({
                  pages: pages - 1
                })
              }
            >
              Prev
            </Button>
          ) : (
            <Button
              onClick={() =>
                this.setState({
                  pages: pages - 1
                })
              }
            >
              Prev
            </Button>
          )}{' '}
          <Button
            onClick={() =>
              this.setState({
                pages: pages + 1
              })
            }
          >
            Next
          </Button>{' '}
        </span>
      </div>
    );
  }
}
export default MovieList;

const MovieGrid = styled.div`
  display: grid;
  margin-top: -40px;
  background: #222;
  padding: 1rem;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 1rem;
`;

const Button = styled.button`
  background: #222;
  display: inline-block;
  padding: 5px;
  border-radius: 3px;
  margin: 10px;
  width: 100px;
  color: white;
  border: 1px solid white;
  &:hover {
    background: white;
    color: #222;
    cursor: pointer;
  }
`;
