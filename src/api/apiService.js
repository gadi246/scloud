
import SC from 'soundcloud';
// api consts
const client_id = 'ggX0UomnLs0VmW7qZnCzw';
const limit = 6;
const linked_partitioning = 1;


export const apiServiceInit = () => {
  SC.initialize({
    client_id
  });
};

export const queryData = (q) => {
  return SC.get('/tracks', {
    q,
    limit,
    linked_partitioning
  })
    .then((tracks) => tracks);
};

export const playMusic = (id) => {
  return SC.stream(`/tracks/${id}`).then((player) => player);
};
