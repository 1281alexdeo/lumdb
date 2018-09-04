import React from 'react';

const SearchMovie = ({ search }) => (
  <div>
    <h2>
      <span>
        <input
          placeholder="Search Movies"
          style={{
            width: '350px',
            height: '40px',
            fontSize: '30px',
            background: 'white',
            color: '#222',
            borderRadius: '5px',
            border: 'none',
            padding: '5px',
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '250px'
          }}
          type="text"
          name="search_term"
          onChange={search}
        />
      </span>
    </h2>
  </div>
);

export default SearchMovie;
