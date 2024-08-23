//import useData from "./useData";
import genres from '../data/genres'

export interface Genre { // define for 'results' in FetchGenresResponse
    id: number;
    name: string
    image_background: string;
}

// hide the URL/endpoint details behind the useGenres hook, rather than implementing it in GenreList.tsx
const useGenres = () => ({ data: genres, isLoading: false, error: null }); // static implementation of genreList: we want to minimize the impact of this change on genreList, so give it an object with the same 3 properties received by genreList

export default useGenres;