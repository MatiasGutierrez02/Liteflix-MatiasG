/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import '../styles/Header.css'

function Header() {

    let myMoviesUpload = []

    const [image, setImage] = useState(null)

    //Get the image from the input and save it in variable "image" in base 64 
    const getImage = (e) => {            
        var file = document.querySelector('input[type=file]')['files'][0];
        var reader = new FileReader();
        reader.onloadend = function () {
            setImage(reader.result) 
        };
        reader.readAsDataURL(file);
        
        
        document.getElementsByClassName("add-movie-box")[0].style.opacity = 0
        document.getElementsByClassName("charging")[0].style.opacity = 1
        document.getElementsByClassName("upload-bar-complete")[0].style.transform = 'translateX(100%)'
        document.getElementsByClassName("loading")[0].style.transform = 'translateX(100%)'
        document.getElementsByClassName("ready")[0].style.transform = 'translateX(100%)'
    };

    //Save the Image and the Title when the user clicks on "button-add-movie" in Local Storage
    const uploadMovie = (e) => { 
        
        let name = document.getElementsByClassName("text-input")[0].value
        let dataObtained 

        //Get data from Local Storage if exists
        if(localStorage.getItem("Movies") !== null){
            dataObtained = JSON.parse(localStorage.getItem("Movies"))
            myMoviesUpload = dataObtained
            myMoviesUpload.push({movieName: name, movieImage: image});
            localStorage.setItem("Movies", JSON.stringify(myMoviesUpload))

        }else{
            myMoviesUpload.push({movieName: name, movieImage: image});
            localStorage.setItem("Movies", JSON.stringify(myMoviesUpload))
        }

        //Adding styles
        document.getElementsByClassName("charging")[0].style.opacity = 0
        document.getElementsByClassName("text-input")[0].style.opacity = 0
        document.getElementsByClassName("button-add-movie")[0].style.opacity = 0
        document.getElementsByClassName("final-message")[0].style.opacity = 1
    }

    const resetUpload = (e) => {
        document.getElementsByClassName("final-message")[0].style.opacity = 0
        document.getElementsByClassName("text-input")[0].style.opacity = 1
        document.getElementsByClassName("button-add-movie")[0].style.opacity = 1
        document.getElementsByClassName("add-movie-box")[0].style.opacity = 1

        document.getElementsByClassName("text-input")[0].value = ""
    }

    return(
        <>
        <div className='nav-bar'>
            <div className='left-side'>
                <h1 className='title'>LITE<strong>FLIX</strong></h1>
                <div className='add-film'>
                    <label htmlFor='btn-add-movie' className='add-film-content'>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 0V16" stroke="white"/>
                            <path d="M16 8L3.57628e-07 8" stroke="white"/>
                        </svg>
                        <p>AGREGAR PELÍCULA</p>
                    </label>  
                </div>
                <input type="checkbox" id="btn-add-movie"/>

                <div className='background-add-movie'>
                    <div className='add-movie-content'>
                        <label htmlFor="btn-add-movie" onClick={(e) => resetUpload(e)}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5147 1.51472L18.4853 18.4853" stroke="white" strokeLinecap="square"/>
                                <path d="M1.5147 18.4853L18.4853 1.51472" stroke="white" strokeLinecap="square"/>
                            </svg>
                        </label>

                        <p className='title-box'>AGREGAR PELÍCULA</p>
                        <label className='add-movie-box' htmlFor="add-movie-input">
                            <img src={require('../symbols/nav-symbols/fill.svg').default} alt="Clip" />
                            <p>AGREGÁ UN ARCHIVO O ARRASTRALO Y SOLTALO AQUÍ</p>
                            <input id='add-movie-input' type="file" accept='image/*' onChange={(e) => getImage(e)}/>
                        </label>
                        <div className='charging'>
                            <p className='ready'>¡LISTO!</p>
                            <p className='loading'>CARGANDO</p>
                            <div className='upload-bar'></div>
                            <div className="upload-bar-complete"></div>
                        </div>
                        <div className='final-message'>
                            <p>¡FELICITACIONES!</p>
                            <p>LA PELICULA FUE SUBIDA CORRECTAMENTE</p>
                        </div>
                        <input type="text" placeholder='TÍTULO'className='text-input'/>
                        <div className="button-add-movie" onClick={(e) => uploadMovie(e)}>
                            <p>SUBIR PELÍCULA</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='right-side'>
                <label className='menu-but' htmlFor="btn-menu">
                    <svg width="21" height="13" viewBox="0 0 21 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 0.5H20.5" stroke="white" strokeLinecap="square"/>
                        <path d="M0.5 6.5H20.5" stroke="white" strokeLinecap="square"/>
                        <path d="M0.5 12.5H20.5" stroke="white" strokeLinecap="square"/>
                    </svg>
                </label>
                <a className='not-but' href="#"><img src={require('../symbols/nav-symbols/notification.svg').default} alt="Notificación" /></a>
                <a className='prof-but' href="#"><img src={require('../symbols/nav-symbols/profile.svg').default} alt="Perfil" /></a>
            </div>
            <input type="checkbox" id="btn-menu"/>

            <div className="background">
                <div className="menu-content">
                    <div className="icons-menu">
                        <div className="left-side-menu">
                            <label htmlFor="btn-menu">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.5147 1.51472L18.4853 18.4853" stroke="white" strokeLinecap="square"/>
                                    <path d="M1.5147 18.4853L18.4853 1.51472" stroke="white" strokeLinecap="square"/>
                                </svg>
                            </label>
                        </div>
                        <div className="right-side-menu">
                            <img src={require('../symbols/nav-symbols/notification.svg').default} alt="Notificación" />
                            <img src={require('../symbols/nav-symbols/profile.svg').default} alt="Perfil" />
                        </div>
                    </div>
                    <nav>
                        <div className="button first">INICIO</div>
                        <div className="button">SERIES</div>
                        <div className="button">PELÍCULAS</div>
                        <div className="button">AGREGADAS RECIENTEMENTE</div>
                        <div className="button">POPULARES</div>
                        <div className="button">MIS PELÍCULAS</div>
                        <div className="button">MI LISTA</div>
                        <label htmlFor="btn-add-movie">
                            <div className="button">AGREGAR PELÍCULA</div>
                        </label>
                        <div className="button">CERRAR SESIÓN</div>
                    </nav>

                </div>
            </div>
        </div>
        </>         
    )
}

export default Header