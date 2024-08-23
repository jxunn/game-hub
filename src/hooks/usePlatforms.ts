// fetches platform data
import useData from "./useData";

interface Platform {
    id: number;
    name: string;
    slug: string;
}

const usePlatforms = () => useData<Platform>('/platforms/lists/parents') // pass new endpoint for fetching the platforms

export default usePlatforms;