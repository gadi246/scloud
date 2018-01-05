import React from 'react';

export default ({searches}) => {
  return(
    searches[0] ?
    <div>
      <h2>Your recent Searches</h2>
      <ul>{
        searches.map(({query, id}) => <li key={id}>{query}</li>)
      }
      </ul>
    </div> :
      null
  )
}