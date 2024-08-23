// a generic, data-fetching hook
import { AxiosRequestConfig, CanceledError } from "axios";
import { useState, useEffect } from "react";
import apiClient from "../services/api-client";

interface FetchResponse<T> {
    // must define interface for the response object of server
    count: number;
    results: T[];
}

// when using useData hook, we should pass genres as a query string parameter (as defined in the api)
// we must make deps optional bc it follows an optional parameter
const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[] ) => { // use generic type parameter, <T>
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
  
    useEffect(() => {
      const controller = new AbortController(); 

      setLoading(true); 
      apiClient
        .get<FetchResponse<T>>(endpoint, { signal: controller.signal, ...requestConfig }) // instead of a hardcoded endpoint of a specific type, we allow the type to be passed in instead so useData is more flexible
        .then((res) => {
            setData(res.data.results);
            setLoading(false);
        })
        .catch((err) => {
            if (err instanceof CanceledError) return;
            setError(err.message)});
            setLoading(false);
        return () => controller.abort();
    }, deps ? [...deps] : []); // pass a dependencies array (deps) to our hook so each time a genre is selected, we send a request to get the games of that genre
    // if deps exists, make it the dependencies array; otherwise, pass empty array

    return { data, error, isLoading }; // return so they can be used in GenreList component
}

export default useData;