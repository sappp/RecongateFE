import React, { Component } from 'react';
import './HomePage.css';

import mockData from '../../mockData.json'

import Showcase from './components/Showcase/Showcase'
import MoviesList from './components/MoviesList/MoviesList'

class HomePage extends Component {
  constructor(props){

   super(props);

   this.state = {
     selectedMovieIndex: 1,
     allMoviesData: [],
   }
   this.changeSelectedMovieOnClick = this.changeSelectedMovieOnClick.bind(this)
 }

  componentDidMount() {

    this.getData()
        .then((data) => {
            this.setState({allMoviesData:data});
      })
  }

  getData(){
    return new Promise(function(resolve, reject){
      resolve(mockData)
    })
  }

  changeSelectedMovieOnClick(id){
    var diff = (id - this.state.selectedMovieIndex);

    if(diff < -7){
      diff = diff + 10;
    }
    if(diff > 7){
      diff = diff - 10;
    }
    if(diff == 1 ){
      this.next(true);
    }
    if(diff == 2){
      this.next(true);
      setTimeout(() => {
          this.next(true);
      }, 50);
    }
    if(diff == -1){
      this.next(false);
    }
    if(diff == -2){
      this.next(false);
      setTimeout(() => {
          this.next(false);
      }, 50);
    }

    this.setState({selectedMovieIndex:id});

  }

  next(next){
    var movieList = document.querySelector('.movie-boxes-ul');
    var moviesListElements = movieList.children;

    var el = document.querySelector('.is-ref');
      el.classList.remove('is-ref');

    var newSeat = '';
    if(next){
      newSeat = this.nextNode(el, movieList);
      movieList.classList.remove('is-reversing')
    } else {
      newSeat = this.prevNode(el, movieList);
      movieList.classList.add('is-reversing')
    }


    //workaround to make react update the new is-ref class
    this.addClass(newSeat, 'is-ref').then((state) => {
      if(state){
        newSeat.style['order'] = 1;
        newSeat.classList.add('is-ref')

        for(let i = 2; i < moviesListElements.length + 1; i++ ){
          newSeat = this.nextNode(newSeat, movieList);
          newSeat.style['order'] = i;

        }
      }
    })

    movieList.classList.remove('mb-base-state')
    setTimeout(function(){
        movieList.classList.add('mb-base-state');
      }, 50);
  };
  prevNode(el, elList){
    if(el.previousSibling !== null){
      return el.previousSibling;
    }
    return elList.lastChild;
  }

  nextNode(el, elList){
    if(el.nextSibling !== null){
      return el.nextSibling;
    }
    return elList.firstChild;
  }


  addClass(node, className){
    return new Promise(function(resolve, reject){
        node.classList.add('is-ref')

        if(node.classList.contains('is-ref')){
          resolve(true)
        } else {
          resolve(false)
        }
    })
  }

  render() {
    return (
      <div className="HomePage">
        <Showcase data={this.state.allMoviesData} selectedMovieIndex={this.state.selectedMovieIndex} changeSelectedMovieOnClick={this.changeSelectedMovieOnClick}/>
        <MoviesList  data={this.state.allMoviesData} selectedMovieIndex={this.state.selectedMovieIndex} changeSelectedMovieOnClick={this.changeSelectedMovieOnClick}/>
      </div>
    );
  }
  
}

export default HomePage;
