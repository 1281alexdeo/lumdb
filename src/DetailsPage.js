import React, { Component } from 'react';
import { Poster } from './Movie';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';
const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';
const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';
export class DetailsPage extends Component {
  state = {
    movie: {}
  };
  async componentDidMount() {
    const id = this.props.match.params.id;
    const URL = `https://api.themoviedb.org/3/movie/${id}?api_key=c0498fac0d51f736066267679e5aa30f&language=en-US`;

    try {
      const res = await fetch(URL);
      const movie = await res.json();

      this.setState({
        movie
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { movie } = this.state;
    if (movie) {
      return (
        <MovieWrapper
          backgroundBackdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}
        >
          <MovieInfo>
            <Overdrive id={movie.id}>
              <Poster
                src={`${POSTER_PATH}${movie.poster_path}`}
                alt={movie.title}
              />
            </Overdrive>
            <div>
              <h1>{movie.title}</h1>
              <h3> {movie.release_date}</h3>
              <p>{movie.overview}</p>
            </div>
          </MovieInfo>
        </MovieWrapper>
      );
    } else {
      return <h2>Loading...</h2>;
    }
  }
}

export default DetailsPage;

const MovieWrapper = styled.div`
  position: relative;
  padding-top: 50vh;
  background: url(${props => props.backgroundBackdrop}) no-repeat;
  margin-top: -20px;
  background-size: cover;
`;

const MovieInfo = styled.div`
  background: white;
  text-align: left;
  padding: 2rem 10%;
  display: flex;
  > div {
    margin-left: 20px;
  }
  img {
    position: relative;
    top: -5rem;
  }
`;
