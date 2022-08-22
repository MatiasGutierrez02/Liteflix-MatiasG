import axios from 'axios'

//Get the popular movie
const movies = async (state) => {
    const getMainMovie = await axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=6f26fd536dd6192ec8a57e94141f8b20')
    state(getMainMovie.data.results[0])
}   

//Get the suggested movies
const moviesSuggested = async (state) => {
    const getSuggestedMovies = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=6f26fd536dd6192ec8a57e94141f8b20')
    state(getSuggestedMovies.data.results)
}   

export {
    movies, moviesSuggested
}