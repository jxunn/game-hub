import { GameQuery } from "../App";
import useData from "./useData";

export interface Platform { // must define for parent_platforms
    id: number;
    name: string;
    slug: string;
}

export interface Game { // these properties are received from the API
    id: number;
    name: string;
    background_image: string;
    parent_platforms: { platform: Platform }[] // array of objects, where each object has a property platform of type platform
    metacritic: number;
    rating_top: number; // a whole number
    rating: number; // a floating number
}

// games hook passes selected genre as a query string parameter object to the data hook/server
const useGames = (gameQuery: GameQuery) => 
    useData<Game>(
        '/games', 
        { 
            params: { 
                genres: gameQuery.genre?.id, 
                platforms: gameQuery.platform?.id, 
                ordering: gameQuery.sortOrder,
                search: gameQuery.searchText
            }
        }, 
        [gameQuery] // refresh data anytime gameQuery object changes
    );

export default useGames;