import React from 'react';
import Button from './Button';

 export default ({  onChange, onSubmit, query } ) => {
  return(
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" value={query} onChange={onChange} placeholder="Search..."/>
        <Button text="Go"/>
      </form>
    </div>
  )
}