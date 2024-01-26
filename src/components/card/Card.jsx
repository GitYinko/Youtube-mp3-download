import React, { useEffect, useState } from 'react'
import logo from "../../assets/logo_transparent.png"
import "../card/Card.css"
import Input from '../input/Input'
import BtnDownload from '../button/BtnDownload'
import { fetch } from '../../services/ApiRequest'
import Loading from '../loading/Loading'

import { ToastContainer, Zoom, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



const Card = () => {

    const [link, setLink] = useState("");

    const [id, setId] = useState(null);

    const [response, setResponse] = useState(null);

    const [disabled, setDisabled] = useState(false);

    const [loading, setLoading] = useState(false)

    const [alertToast, setAlertToast] = useState(false);

    const [alertInput, setAlertInput] = useState(false);




    const notify = () => toast.warn("ID DEL VIDEO NO VALIDO", {
        containerId: "A",
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom

    });

    const notifyInput = () => toast("DEBE INGRESAR UNA URL", {
        containerId: "B",
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom

    });

    const notifyDownload = () => toast.success("DESCARGA COMPLETA! 👌", {
        containerId: "C",
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom

    });


    useEffect(() => { //este useEffect se va a cargar siempre y ciando se modifique el valor del STATE "id" que va a contener el id del video a descargar.

        //este hook va a cargar la data que vamos a consumir de la api de Youtube. si el id del video es valido.
        if (id) {
            const fetchData = () => {

                //le damos un intervalo para que Si la canción está completamente convertida, ya no es necesario repetirla. por lo tanto le damos un cierre a la petision con clearInterval(interval).
                let interval = setInterval(async function () {

                    try {

                        setDisabled(true);
                        setLoading(true);

                        const res = await fetch(id)

                        if (res.data.status === "ok" && res.status === 200) {

                            setResponse(res.data);//pasamos la data de la respuesta a este estado setResponse.

                            // console.log(response) //ccontiene la info de la respuesta.

                            clearInterval(interval); // terminamos el intervalo.

                        }
                        else if (res.data.status === "fail" && res.status === 200) {


                            if (alertToast) {
                                notify()
                            }

                            clearInterval(interval); // terminamos el intervalo.

                        }

                    } catch (error) {

                        console.log(error)

                    }
                    finally {

                        setLoading(false);
                        setDisabled(false);

                    }

                }, 2000);//le damos un dalay de 1s de respuesta.

            }

            fetchData()
        }

    }, [id])

    useEffect(() => {//esta hook se ejecuta cuando haya una respuesta

        //si existe esa respuesta 
        if (response) {

            window.location.href = response.link; // descargamos el archivo que se encuentra en el estado response en la propiedad link que se obtiene.

            notifyDownload()

        }

    }, [response])


    const handledOnchange = (e) => {

        setLink(e.target.value);

    }

    const handledOnclick = (e) => {

        setAlertToast(true);
        setAlertInput(true);

        if (link === "") {
            notifyInput()
        }

        //al state link que resive el valor del input le pasamos el metodo split para ver si existe en la url un divisor "=" entre la url y el id del video. si existe se para el string en dos valores en la matriz.
        const text = link.split("=")[1];// le pasamos la posicion donde se encuentra el id del video que es en el 1 ya que en el 0 se encuentra la url.

        if (text) {
            setId(text);
        }


    }


    return (
        <div className="card">

            {alertToast && (<ToastContainer containerId="A" />)}
            {alertInput && (<ToastContainer containerId="B" />)}
            {response && (<ToastContainer containerId="C" />)}

            <div className='body'>

                <div className='logo'>

                    <img src={logo} />
                    <h2>Descargador MP3</h2>

                </div>

                <div className='form'>
                    <div>
                        <Input
                            type="text"
                            value={link}
                            onChange={handledOnchange}

                        />
                        {loading && (<Loading>Puede tomar un mometo convertir tu video</Loading>)}
                    </div>

                    <BtnDownload
                        type="button"
                        onClick={handledOnclick}
                        disabled={disabled}
                        className={disabled ? "btn-disabled" : ""}

                    />

                </div>

            </div>

        </div>
    )
}

export default Card
