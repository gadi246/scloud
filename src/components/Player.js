import React from 'react';

export default ({clickedItemUrl}) => {
  return(
    <div className={`scloud-player ${clickedItemUrl ? 'player-active' : ''}`} style={{backgroundImage: `url(${clickedItemUrl})`}}>
    </div>
  )
}