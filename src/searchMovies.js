import React,{useState} from 'react';
import MovieCard from './movieCard';

export default function SearchMovies(){
    
    const [query,setQuery] = useState('');
    const [movies,setMovies] = useState([]);
    const searchMovies = async (e) => {
        e.preventDefault();
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}&pages=1&include_adult=false`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            setMovies(data.results);
        } catch (error) {
            console.error(error);
        }        
    }
    return (
        <>
            <form className="form" onSubmit={searchMovies}>
                <label className="label" htmlFor="query">Movie Name</label>
                <input className="input" type="text" name="query" placeholder="i.e. Mission Impossible" value={query} onChange={(e) => setQuery(e.target.value)} />
                <button className="button" type="submit">Search</button>
            </form>
            <div className="card-list">
                {Object.keys(movies).length>0 ?
                    movies.filter(movie => movie.poster_path).map(movie => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))
                : <p style={{textAlign:"center"}}>No search result found..</p>}
            </div>
        </>
    )
}