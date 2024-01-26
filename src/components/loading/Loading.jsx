import React, { useEffect, useRef } from 'react'
import Lottie from 'lottie-react'
import loadingMp3 from "../../assets/Yinko Music MP3.json"
import "../loading/loading.css"


const Loading = ({ children }) => {

    const lottieRef = useRef();

    useEffect(() => {

        lottieRef.current.setSpeed(1);

    }, [])


    return (
        <section className='container_lottie'>

            <div className='lottie'>
                <Lottie lottieRef={lottieRef} animationData={loadingMp3}></Lottie>
            </div>
            <span>{children}</span>

        </section>

    )
}

export default Loading