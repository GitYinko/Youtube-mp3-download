//VAMOS A CONSUMIR LA API DE YOUTUBE CON AXIOS.
import axios from "axios";

const requestOptions = { //configuracion de como va hacer el request
    method: 'GET',
    url: 'https://youtube-mp36.p.rapidapi.com/dl',
    params: {},
    headers: {
        'X-RapidAPI-Key': "7187be0767msh6921f99ebdf9d10p1d831fjsn07d76da3a77f",
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
    }
};

const fetch = async (id) => { //consumimos la api 

    try {

        requestOptions.params = { id }; //pasamos a la propiedad params el id de forma dinamica. el valor de "id" va hacer el del estado "id" de la card. 

        const res = await axios.request(requestOptions); //damos la respuesta segun el requerimiento del usuario.

        return res;

    } catch (error) {

        console.log(error);

    }




}

export { fetch };
