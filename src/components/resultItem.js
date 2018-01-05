import React from 'react';

export default ({onClick, song}) => (
  <li onClick={onClick}>{song.title}</li>
)