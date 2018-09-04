import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';
const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';
const Movie = ({ movie }) => (
  <Fragment>
    <Link to={`/details/${movie.id}`}>
      <Overdrive id={movie.id.toString()}>
        <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
      </Overdrive>
    </Link>
  </Fragment>
);

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  }).isRequired
};

export default Movie;

export const Poster = styled.img`
  box-shadow: 0 0 35px black;
  margin: 20px;
  display: flex;
`;
