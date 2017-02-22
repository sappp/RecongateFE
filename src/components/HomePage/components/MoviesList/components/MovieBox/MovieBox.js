import React, { Component } from 'react';
import './MovieBox.css'

class MovieBox extends Component {
  constructor(props){
    super(props)
    this.changeSelectedMovieOnClick = this.changeSelectedMovieOnClick.bind(this);
    this.addThisClassIffirstLoad = 'is-ref';
  }
  componentDidUpdate(){
    this.addThisClassIffirstLoad  = '';
  }
  changeSelectedMovieOnClick(event){

    if(event.currentTarget){
      this.props.changeSelectedMovieOnClick(this.props.id)
    }
  }

  render() {
    return (
      <li onClick={this.changeSelectedMovieOnClick} className={'movie-box ' + (this.props.selectedMovieIndex == this.props.id ? 'movie-box-selected' : '') } >
        <div>
          <img className="movie-box-img" src={this.props.imageLink}/>
        </div>
        <div className="movie-box-info">
          <h1>{this.props.name}</h1>
        </div>
      </li>
    );
  }
}

export default MovieBox;
