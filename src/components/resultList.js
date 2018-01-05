import React from 'react';
import ResultItem from './resultItem';
import { memoize } from 'lodash';
const clickedItemWrapper = memoize((id, cb) => () => cb(id));

export default ({children, collection, clickItem}) => (

  collection ? <div>
    <ul>
      {collection.map((({id, ...song}) => {
        return <ResultItem key={id} song={song} onClick={clickedItemWrapper(id, clickItem)}/>
      }))}
    </ul>
    { children }
  </div> : null
)
