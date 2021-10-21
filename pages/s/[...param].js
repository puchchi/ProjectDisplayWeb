import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'

function s() {
    const router = useRouter()

    const [params, setParams] = useState("")

    useEffect(()=>{
        if(!router.isReady) return;
    
        // codes using router.query
        const { param, query } = router.query
        const q = router.query

        setParams(param)
        console.log(q)
    
    }, [router.isReady]);

    return (
        <div>
   
            In search page {params}
        </div>
    )
}

export default s
