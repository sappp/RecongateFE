import React, { Component } from 'react';
import './MoviesList.css'
import MovieBox from './components/MovieBox/MovieBox'
class MoviesList extends Component {

  constructor(props){
    super(props);
    this.changeSelectedMovieOnClick = this.changeSelectedMovieOnClick.bind(this)
  }
  componentDidMount(){
    var elem = document.querySelector('.movie-boxes-ul');

    this.getAllMovieBoxes().then((els) => {
        return els;
    })
    .then(function(els){
      els.lastChild.classList.add('is-ref')
    })
  }

  getAllMovieBoxes(){
    return new Promise(function(resolve, rejects){
      let mbs = document.querySelector('.movie-boxes-ul');
        resolve(mbs)
    })
  }

  changeSelectedMovieOnClick(currentOder){
    this.props.changeSelectedMovieOnClick(currentOder);
  }

  render() {
    return (
      <div className="MoviesList">
          <ul className="movie-boxes-ul mb-base-state">
            {this.props.data.map((movie) => {
              return <MovieBox  key={movie.id}
                                name={movie.name}
                                id={movie.id}
                                imageLink={movie.imageLink}
                      changeSelectedMovieOnClick={this.changeSelectedMovieOnClick} selectedMovieIndex={this.props.selectedMovieIndex}/>;
            })}
          </ul>
      </div>
    );
  }
}

export default MoviesList;
