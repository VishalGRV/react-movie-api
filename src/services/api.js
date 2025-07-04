const API_KEY = "fbadf8bead6cd7706d0c24094e8586a9"
const BASE_URL = "https://api.themoviedb.org/3"

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
    const data = await response.json()
    return data.results

}


export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
    const data = await response.json()
    return data.results
}

export const getMovieDetails = async (movieid) => {
    const response = await fetch(`${BASE_URL}/movie/${movieid}?api_key=${API_KEY}`)
    const data = await response.json()
    console.log(data)
    return data
}