import { useEffect, useState } from "react"

interface ApiError {
    status: number;
    msg: string;
}

export function  useApiRequest<T, A extends unknown[]> (
    apiFunction : (...args: A) => Promise<T>, 
    ...args: A) 
    {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<ApiError | null>(null);
    
    useEffect(() => {
        setError(null);
        setIsLoading(true);
        apiFunction(...args)
        .then((data)=> {
            setData(data);
        })
        .catch((err) => {
            setError({status:404, msg: `Failed to load resource`})
        })
        .finally(() => {
            setIsLoading(false)
        }
        )
    },[apiFunction, ...args]);

    return {data, isLoading, error};
    
}
