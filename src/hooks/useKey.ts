import { useEffect, useRef } from "react"

const useKey = (key: string , callback: Function) => {
    const callBackRef = useRef(callback);
    
    const handler = (event: KeyboardEvent ) => {
        if(event.key.toLowerCase() === key) callBackRef.current(event)
    }
    useEffect(()=>{ callBackRef.current = callback });
    useEffect(()=>{
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    },[key])
}
export default useKey