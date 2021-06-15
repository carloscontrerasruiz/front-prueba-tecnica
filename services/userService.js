const url = "http://localhost:9191/api/users/v1"

export const loginService = (username,pass)=>{
    const requestOptions={
        method:"POST",
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({ "nombreUsuario": username,"password": pass})
    }
    return fetch(`${url}/login`,requestOptions)
        .then(response=>response.json())
}

export const updateUser = (email,username,pass)=>{
    const requestOptions={
        method:"PUT",
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({ "correo":email,"nombreUsuario": username,"password": pass})
    }
    return fetch(`${url}/user`,requestOptions)
    .then(response=>response.json())
}

export const getUserByName=(username)=>{
    return fetch(`${url}/user/${username}`)
}

export const registerUser = (email,username,pass)=>{
    const requestOptions={
        method:"POST",
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({ "correo":email,"nombreUsuario": username,"password": pass})
    }
    return fetch(`${url}/user`,requestOptions)
    .then(response=>response.json())
}