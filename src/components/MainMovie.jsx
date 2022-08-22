/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { movies, moviesSuggested } from "../functions/functions"
import '../styles/MainMovie.css'

const MainMovie = () => {

    const root = document.getElementById('root')
    const urlFromImg = 'https://image.tmdb.org/t/p'

    const [mainMovie, setMainMovie] = useState(null)
    useEffect(() =>{
        movies(setMainMovie)
    },[])

    const [suggestionsMovies, setSuggestionsMovies] = useState(null)
    useEffect(() =>{
        moviesSuggested(setSuggestionsMovies)
    },[])

    //Check first if the data exists
    if(mainMovie){
        root.style.backgroundImage = `url(${urlFromImg}/original/${mainMovie.backdrop_path})`
        root.style.backgroundSize = "cover"
        root.style.height = "100vh"
    }

    //Change the style when you hover in the element
    const handleMouseOver = (e, index) => {        
            document.getElementsByClassName("img-content")[index].style.opacity = 0
            document.getElementsByClassName("img-content-hover")[index].style.opacity = 1
            document.getElementsByClassName("img-content")[index].style.transition = "all 500ms ease-in"
            document.getElementsByClassName("img-content-hover")[index].style.transition = "all 500ms ease-in"
    };
    
    //Change the style when hover out the element
    const handleMouseOut = (e, index) => {
            document.getElementsByClassName("img-content")[index].style.opacity = 1
            document.getElementsByClassName("img-content-hover")[index].style.opacity = 0
    };

    //Get Local Storage  
    const storedMovies = localStorage.getItem("Movies")
    const obtainedMovies = JSON.parse(storedMovies)
                

    //Select only one checkbox
    const showMovies = (e, id) =>{
        
        let checkboxes = document.getElementsByClassName("see-more-cont")
        let icons = document.getElementsByClassName("check-icon")
        let text = document.getElementsByClassName("movies-text")
        let checkboxSelected =  document.getElementById(id)

        for(let i = 0; i < checkboxes.length; i++){
            checkboxes[i].checked = false
            icons[i].style.display = "none"
            text[i].style.fontWeight = "400"
        }  

        checkboxSelected.checked = true
        document.getElementsByClassName(id)[0].children[0].children[1].style.display = "block"

        if( id === "pop-movies"){
            document.getElementsByClassName("see-content")[0].innerHTML = "POPULARES"
            document.getElementsByClassName("popular-movies-text")[0].style.fontWeight = "700";

        }else{
            document.getElementsByClassName("see-content")[0].innerHTML = "MIS PELÍCULAS"
            document.getElementsByClassName("my-movies-text")[0].style.fontWeight = "700";
        }

        const suggestion = document.getElementsByClassName("suggestions")
        const myMovies = document.getElementsByClassName("my-movies-list")
        
        if(document.getElementById("pop-movies").checked){
            suggestion[0].style.opacity = 1;

            suggestion[0].children[0].style.marginLeft = "0px";
            suggestion[0].children[1].style.marginLeft = "0px";
            suggestion[0].children[2].style.marginLeft = "0px";
            suggestion[0].children[3].style.marginLeft = "0px";

            if(obtainedMovies !== null && obtainedMovies !== ''){
                for(let i = 0; i < myMovies[0].childElementCount; i++){
                    myMovies[0].children[i].style.marginLeft = "800px";
                }
                myMovies[0].style.display = "none"
            }else{
                document.getElementsByClassName("no-movies-loaded")[0].style.opacity = 0;
            }
  
        }else{
            //In this case, My Movies checkbox is selected
            suggestion[0].style.opacity = 0

            suggestion[0].children[0].style.marginLeft = "800px";
            suggestion[0].children[1].style.marginLeft = "800px";
            suggestion[0].children[2].style.marginLeft = "800px";
            suggestion[0].children[3].style.marginLeft = "800px";
            if(obtainedMovies !== null && obtainedMovies !== ''){
                for(let i = 0; i < myMovies[0].childElementCount; i++){
                    myMovies[0].children[i].style.marginLeft = "0px";
                }
                myMovies[0].style.display = "block"

            }else{
                document.getElementsByClassName("no-movies-loaded")[0].style.opacity = 1;
            }



        }
    }

    return(
        <>
        {mainMovie != null  && suggestionsMovies!= null ?(
            <div className='container'>
                <div className='movie-info'>
                    <p className='liteflix-info'>ORIGINAL DE <strong>LITEFLIX</strong></p>
                    <div className='movie-name'>{mainMovie.original_title}</div>

                    <div className='buttons'>
                        <div className='primary-container'>
                            <div className='primary-button'>
                                <img src={require('../symbols/item-symbols/play.svg').default} alt="Play" />
                                <p>REPRODUCIR</p>
                            </div>
                        </div>

                        <div className='secondary-container'>
                            <div className='secondary-button'> 
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>

                                <div className='text-button-container'>
                                    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path className='path-svg' d="M7.5 0V14" stroke="#ffffff91"/>
                                        <path className='path-svg' d="M14.5 7L0.5 7" stroke="#ffffff91"/>
                                    </svg>
                                    <p>MI LISTA</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='see-options'>
                    <div className='see-options-container'>
                        <div className='dropdown-options'>
                            <label htmlFor="btn-see-more"> <p>VER: <strong className='see-content'>POPULARES</strong></p><img src={require('../symbols/item-symbols/arrow.svg').default} alt="Arrow" /> </label>   
                        </div>

                        <div className='popular-movies'>
                            <div className='suggestions'>
                                <div className='contenedor first-suggestion'>
                                    <figure onMouseOver={e=> handleMouseOver(e,0)} onMouseOut={e=> handleMouseOut(e, 0)}>
                                        <img className='back-img' src={urlFromImg + "/w400/" + suggestionsMovies[0].backdrop_path} alt="Imagen de fondo"/>

                                        <div className='img-content'>
                                            <img className='play-icon' src={require('../symbols/item-symbols/play-suggested.svg').default} alt="Play" />
                                            <p>{suggestionsMovies[0].original_title}</p>
                                        </div>

                                        <div className='img-content-hover'>
                                            <div className='content-hover'>
                                                <svg className='play-icon-hover' width="25" height="25" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle className='circle-play-icon1' cx="20" cy="20" r="19.5"/>
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M26.6484 20.2701L16 13V27L26.6484 20.2701Z"/>
                                                </svg>
                                                <p className='title-hover'>{suggestionsMovies[0].original_title}</p>
                                            </div>

                                            <div className='footer-hover'>
                                                <img className='star-icon-hover' src={require('../symbols/item-symbols/star.svg').default} alt="Star"/>
                                                <p className='vote-avg-hover'>{suggestionsMovies[0].vote_average}</p>
                                                <p className='release-date-hover'>{suggestionsMovies[0].release_date.slice(0,4)}</p>
                                            </div>
                                            
                                        </div>
                                    </figure>         
                                </div>

                                <div className='contenedor second-suggestion'>
                                    <figure onMouseOver={e=> handleMouseOver(e,1)} onMouseOut={e=> handleMouseOut(e, 1)}>
                                        <img className='back-img' src={urlFromImg + "/w400/" + suggestionsMovies[1].backdrop_path} alt="Imagen de fondo"/>
                                        
                                        <div className='img-content'>
                                            <img className='play-icon' src={require('../symbols/item-symbols/play-suggested.svg').default} alt="Play" />
                                            <p>{suggestionsMovies[1].original_title}</p>
                                        </div>

                                        <div className='img-content-hover'>
                                            <div className='content-hover' >
                                            <svg className='play-icon-hover' width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="20" cy="20" r="19.5"/>
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M26.6484 20.2701L16 13V27L26.6484 20.2701Z"/>
                                                </svg>
                                                <p className='title-hover'>{suggestionsMovies[1].original_title}</p>
                                            </div>

                                            <div className='footer-hover'>
                                                <img className='star-icon-hover' src={require('../symbols/item-symbols/star.svg').default} alt="Star"/>
                                                <p className='vote-avg-hover'>{suggestionsMovies[1].vote_average}</p>
                                                <p className='release-date-hover'>{suggestionsMovies[1].release_date.slice(0,4)}</p>
                                            </div>
                                            
                                        </div>
                                    </figure>         
                                </div>

                                <div className='contenedor third-suggestion'>
                                    <figure onMouseOver={e=> handleMouseOver(e,2)} onMouseOut={e=> handleMouseOut(e, 2)}>
                                        <img className='back-img' src={urlFromImg + "/w400/" + suggestionsMovies[2].backdrop_path} alt="Imagen de fondo"/>
                                        
                                        <div className='img-content'>
                                            <img className='play-icon' src={require('../symbols/item-symbols/play-suggested.svg').default} alt="Play" />
                                            <p>{suggestionsMovies[2].original_title}</p>
                                        </div>

                                        <div className='img-content-hover'>
                                            <div className='content-hover'>
                                                <svg className='play-icon-hover' width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="20" cy="20" r="19.5"/>
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M26.6484 20.2701L16 13V27L26.6484 20.2701Z"/>
                                                </svg>
                                                <p className='title-hover'>{suggestionsMovies[2].original_title}</p>
                                            </div>

                                            <div className='footer-hover'>
                                                <img className='star-icon-hover' src={require('../symbols/item-symbols/star.svg').default} alt="Star"/>
                                                <p className='vote-avg-hover'>{suggestionsMovies[2].vote_average}</p>
                                                <p className='release-date-hover'>{suggestionsMovies[2].release_date.slice(0,4)}</p>
                                            </div>
                                            
                                        </div>
                                    </figure>         
                                </div>

                                <div className='contenedor fourth-suggestion'>
                                    <figure onMouseOver={e=> handleMouseOver(e,3)} onMouseOut={e=> handleMouseOut(e, 3)}>
                                        <img className='back-img' src={urlFromImg + "/w400/" + suggestionsMovies[3].backdrop_path} alt="Imagen de fondo"/>
                                        
                                        <div className='img-content'>
                                            <img className='play-icon' src={require('../symbols/item-symbols/play-suggested.svg').default} alt="Play" />
                                            <p>{suggestionsMovies[3].original_title}</p>
                                        </div>

                                        <div className='img-content-hover'>
                                            <div className='content-hover'>
                                            <svg className='play-icon-hover' width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="20" cy="20" r="19.5"/>
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M26.6484 20.2701L16 13V27L26.6484 20.2701Z"/>
                                                </svg>
                                                <p className='title-hover'>{suggestionsMovies[3].original_title}</p>
                                            </div>

                                            <div className='footer-hover'>
                                                <img className='star-icon-hover' src={require('../symbols/item-symbols/star.svg').default} alt="Star"/>
                                                <p className='vote-avg-hover'>{suggestionsMovies[3].vote_average}</p>
                                                <p className='release-date-hover'>{suggestionsMovies[3].release_date.slice(0,4)}</p>
                                            </div>
                                            
                                        </div>
                                    </figure>         
                                </div>
                            </div>
                            {storedMovies !== null && storedMovies !== '' ?(
                                    <>
                                    <div className='my-movies-list'>
                                        <div className='my-movies-contenedor first-suggestion'>
                                            <figure onMouseOver={e=> handleMouseOver(e,4)} onMouseOut={e=> handleMouseOut(e, 4)}>
                                                <img className='back-img' src={obtainedMovies[0].movieImage} alt="Imagen de fondo"/>

                                                <div className='img-content'>
                                                    <img className='play-icon' src={require('../symbols/item-symbols/play-suggested.svg').default} alt="Play" />
                                                    <p>{obtainedMovies[0].movieName}</p>
                                                </div>

                                                <div className='img-content-hover'>
                                                    <div className='content-hover'>
                                                        <svg className='play-icon-hover' width="25" height="25" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle className='circle-play-icon1' cx="20" cy="20" r="19.5"/>
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M26.6484 20.2701L16 13V27L26.6484 20.2701Z"/>
                                                        </svg>
                                                        <p className='title-hover'>{obtainedMovies[0].movieName}</p>
                                                    </div>
                                                </div>
                                            </figure>         
                                        </div>

                                        {
                                            storedMovies !== null && storedMovies !== '' && obtainedMovies.length > 1 && 
                                            <div className='my-movies-contenedor second-suggestion'>
                                                <figure onMouseOver={e=> handleMouseOver(e,5)} onMouseOut={e=> handleMouseOut(e, 5)}>
                                                    <img className='back-img' src={obtainedMovies[1].movieImage} alt="Imagen de fondo"/>
                                                    
                                                    <div className='img-content'>
                                                        <img className='play-icon' src={require('../symbols/item-symbols/play-suggested.svg').default} alt="Play" />
                                                        <p>{obtainedMovies[1].movieName}</p>
                                                    </div>

                                                    <div className='img-content-hover'>
                                                        <div className='content-hover' >
                                                        <svg className='play-icon-hover' width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <circle cx="20" cy="20" r="19.5"/>
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M26.6484 20.2701L16 13V27L26.6484 20.2701Z"/>
                                                            </svg>
                                                            <p className='title-hover'>{obtainedMovies[1].movieName}</p>
                                                        </div>
                                                    </div>
                                                </figure>         
                                            </div>
                                        }
                                        {
                                           storedMovies !== null && storedMovies !== '' && obtainedMovies.length > 2 &&
                                            <div className='my-movies-contenedor third-suggestion'>
                                                <figure onMouseOver={e=> handleMouseOver(e,6)} onMouseOut={e=> handleMouseOut(e, 6)}>
                                                    <img className='back-img' src={obtainedMovies[2].movieImage} alt="Imagen de fondo"/>
                                                    
                                                    <div className='img-content'>
                                                        <img className='play-icon' src={require('../symbols/item-symbols/play-suggested.svg').default} alt="Play" />
                                                        <p>{obtainedMovies[2].movieName}</p>
                                                    </div>

                                                    <div className='img-content-hover'>
                                                        <div className='content-hover'>
                                                            <svg className='play-icon-hover' width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <circle cx="20" cy="20" r="19.5"/>
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M26.6484 20.2701L16 13V27L26.6484 20.2701Z"/>
                                                            </svg>
                                                            <p className='title-hover'>{obtainedMovies[2].movieName}</p>
                                                        </div>
                                                    </div>
                                                </figure>         
                                            </div>
                                        }

                                        {
                                            storedMovies !== null && storedMovies !== '' && obtainedMovies.length > 3 &&
                                            <div className='my-movies-contenedor fourth-suggestion'>
                                                <figure onMouseOver={e=> handleMouseOver(e,7)} onMouseOut={e=> handleMouseOut(e, 7)}>
                                                    <img className='back-img' src={obtainedMovies[3].movieImage} alt="Imagen de fondo"/>
                                                    
                                                    <div className='img-content'>
                                                        <img className='play-icon' src={require('../symbols/item-symbols/play-suggested.svg').default} alt="Play" />
                                                        <p>{obtainedMovies[3].movieName}</p>
                                                    </div>

                                                    <div className='img-content-hover'>
                                                        <div className='content-hover'>
                                                        <svg className='play-icon-hover' width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <circle cx="20" cy="20" r="19.5"/>
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M26.6484 20.2701L16 13V27L26.6484 20.2701Z"/>
                                                            </svg>
                                                            <p className='title-hover'>{obtainedMovies[3].movieName}</p>
                                                        </div>
                                                    </div>
                                                </figure>         
                                            </div>
                                        } 
                                    </div>
                                    </>
                                    ) : (
                                        <div className='no-movies-loaded'> NO HAS CARGADO NINGUNA PELÍCULA</div>
                                    )
                                }
                        </div>
                    </div>
                </div>
                <input type="checkbox" id="btn-see-more"/>
                <div className='see-more-container'>
                    <img src={require('../symbols/item-symbols/union.svg').default} alt="" />
                    <div className='box-content'>
                        <label htmlFor="pop-movies" className='pop-movies'>
                            <div className='popular-check'>
                                <p className='popular-movies-text movies-text'>POPULARES</p>
                                <img className='check-icon' src={require('../symbols/item-symbols/check.svg').default} alt="" />
                            </div>
                        </label>
                        <input type="checkbox" className='see-more-cont' id="pop-movies" onChange={e=> showMovies(e,"pop-movies")} checked/>

                        <label htmlFor="my-movies" className='my-movies'>
                            <div className='my-movies-check'>
                                <p className='my-movies-text movies-text'>MIS PELÍCULAS</p>
                                <img className='check-icon' src={require('../symbols/item-symbols/check.svg').default} alt="" />
                            </div>
                        </label>
                        <input type="checkbox" className='see-more-cont' id="my-movies" onChange={e=> showMovies(e,"my-movies")}/>
                    </div>
                   
                </div>
            </div>

        ) :('Error!') }
        </>
    )
}

export default MainMovie