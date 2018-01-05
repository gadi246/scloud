import React, { Component } from 'react';
import axios from 'axios';

import { apiServiceInit, queryData, playMusic } from '../api/apiService';
import Search from './Search';
import Button from './Button';
import RecentSearches from './recentSearches';
import ResultList from './resultList';
import Player from './Player';

class Root extends Component{
  state = {
    collection: null,
    query: "",
    next_href: "",
    recentSearches: [],
    clickedItemUrl: ''
  };

  componentDidMount(){
   this.getLocalstorage();
  }

  getLocalstorage = () => {
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches'));
    if(recentSearches) this.setState(() => ({recentSearches}));
  };

  saveToLocalStorage = (searches) => {
    if(searches[0]) localStorage.setItem('recentSearches',JSON.stringify(searches));
  };

  searchOnChange = (e) => {
    const query = e.target.value;
    this.setState(() => ({query}))
  };

  searchSongs = (e) => {
    e.preventDefault();
    const { query } = this.state;
    if(query.length > 3){
      apiServiceInit();
      queryData(query)
        .then(({collection, next_href}) => {
          this.setState(({recentSearches}) => {
            if(recentSearches.length === 5){
               recentSearches.shift();
            }
            let newSearches = [...recentSearches, {query, id: Date.now()}];
            this.saveToLocalStorage(newSearches);
            return { collection, next_href, query, recentSearches: newSearches }
          });
        })
    }
  };

  nextCollection = () => {
    const { next_href } = this.state;
    axios.get(next_href)
      .then(({ data: { collection, next_href }}) => {
        this.setState(() => ({collection, next_href}))
      })
  };

  openPlayer = (id) => {
    const { collection } = this.state;
    const clickedItem = collection.find(item => item.id === id);
    const clickedItemUrl = clickedItem.artwork_url;
    this.setImage(clickedItemUrl, id);
  };

  setImage = (clickedItemUrl, id) => {
    const image = new Image();
    image.onload = () => {
      this.setState(() => ({clickedItemUrl}));
      this.playMusic(id);
    };
    image.onerror = () => {
      this.setState(() => ({clickedItemUrl: 'error'}));
    }
    image.src = clickedItemUrl;
  };

  playMusic = (id) => {
    playMusic(id)
      .then(player => player.play())
  };

  render() {
    const { collection, recentSearches, next_href, query, clickedItemUrl } = this.state;

    return (
      <div className="scloud-wrapper">
        <div className="search-col-wrapper">
          <h2>Search for a song...</h2>
          <Search onChange={this.searchOnChange} onSubmit={this.searchSongs} value={query}/>
          <ResultList collection={collection} clickItem={this.openPlayer}>
            {next_href ? <Button next={this.nextCollection} text="Next"/> : null}
          </ResultList>
        </div>
        <Player clickedItemUrl={clickedItemUrl}/>
        <RecentSearches searches={recentSearches}/>
    </div>
    )
  }
}

export default Root;