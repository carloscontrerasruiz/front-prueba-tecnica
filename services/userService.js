const url = "http://localhost:9191/api/users/v1"
import { useCookies } from 'react-cookie';

function createBearer(){

}

export const loginService = (username,pass)=>{
    const requestOptions={
        method:"POST",
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({ "nombreUsuario": username,"password": pass})
    }
    return fetch(`${url}/login`,requestOptions)
        .then(response=>response.json())
}

export const updateUser = (email,username,pass,jwt="")=>{
    const requestOptions={
        method:"PUT",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        },
        body:JSON.stringify({ "correo":email,"nombreUsuario": username,"password": pass})
    }
    return fetch(`${url}/userUpdate`,requestOptions)
    .then(response=>response.json())
}

export const getUserByName=(username,jwt="")=>{
    const requestOptions={
        method:"GET",
        headers:{
            'Authorization': `Bearer ${jwt}`,
        }
    }
    return fetch(`${url}/user/${username}`,requestOptions)
}

export const registerUser = (email,username,pass)=>{
    const requestOptions={
        method:"POST",
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({ "correo":email,"nombreUsuario": username,"password": pass})
    }
    return fetch(`${url}/userCreate`,requestOptions)
    .then(response=>response.json())
}