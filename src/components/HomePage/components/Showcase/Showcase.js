import React, { Component } from 'react';
import './Showcase.css';

class Showcase extends Component {
  constructor(props){
    super(props)

    this.nextPrevMovie = this.nextPrevMovie.bind(this);
  }
  nextPrevMovie(nextPrev) {
    let currentId = this.props.selectedMovieIndex;
    let moveTo = '';

    if(nextPrev == 'next'){
      moveTo = Number(currentId) + 1;
      if(moveTo == this.props.data.length + 1)
        moveTo = 1;
    } else {
      moveTo = Number(currentId) - 1;
      if(moveTo == 0){
        moveTo = this.props.data.length;
      }
    }
    this.props.changeSelectedMovieOnClick(moveTo);
  }
  render() {
    return (
      <div className="Showcase">
        {this.props.data.map((movie) => {
          if(movie.id == this.props.selectedMovieIndex){
            return (
              <div key={movie.id}>
                <div className="showcase-on-background">
                  <div className="showcase-info">
                      <span id="rank"> Rank: {movie.imdbRate}</span>
                      <h1>{movie.name}</h1>
                      <div id="more-info">
                        <span>Release Year: {movie.releaseYear}</span>
                        <br />
                        <span>IMDB Rating: {movie.imdbRating} / 10</span>
                      </div>
                  </div>
                  <ul className="showcase-buttons">
                    <li>
                        <a href="http://www.foxmovies.com/movies/a-cure-for-wellness#tickets" className="btn" >
                            <span className="left">Watch Trailer</span>
                            <span className="right"><span></span></span>
                        </a>
                    </li>
                    <li>
                      <a href={movie.imdbLink} className="btn">
                          <span className="left">Visit IMDB page</span>
                          <span className="right"><span></span></span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="rightLeftArrows">
                    <div className="left" onClick={this.nextPrevMovie.bind(null ,'prev')}><span ></span></div>
                    <div className="right"><span onClick={this.nextPrevMovie.bind(null ,'next')}></span></div>
                </div>
                <div className="gradient"></div>
                <img className="showcase-background" src={movie.imageLink}/>
                  <div className="triangle">
                    <div className="left-triangle"></div>
                    <div className="right-triangle"></div>
                  </div>
              </div>
            )
          }
        })}
      </div>

    );
  }
}

export default Showcase;
