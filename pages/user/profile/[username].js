import {useState, useEffect} from 'react'
import Head from 'next/head'

import NavBar from '/components/navBar'

export default function Profile(props){
    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("")
    const [email, setEmail] = useState("")
    const { body } = props.data
    
    useEffect(()=>{
        setUsername(body.nombreUsuario)
        setPass(body.password)
        setEmail(body.correo)
    },[])

    const updateSubmit = (e)=>{
        e.preventDefault();
        //Validacion de campos
        const regexUsername = /^[a-zA-Z0-9]{5,10}$/
        const regexPass = /^[a-zA-Z0-9!$&?¡¿]{8,15}$/
        if(!regexUsername.test(username) || !regexPass.test(pass)){
            setNotificationMessage("Formato de usuario o password invalido")
            return
        }

        //Peticion
        const requestOptions={
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({ "nombreUsuario": username,"password": pass})
        }
        fetch('http://localhost:9191/api/users/v1/login',requestOptions)
        .then(response=>response.json())
        .then(data=>{
                //Login exitoso se envia a otar pagina
                if(data.error){
                    setNotificationMessage(data.errorMessage)
                }else{
                    router.push(`/user/profile/${data.body.nombreUsuario}`)
                }
            }
        )
        .catch(error=>console.log(error))

    }

    return (
        <>
            <Head>
                <title>Profile | {username}</title>
                <meta name="description" content={`Profile page technical test user ${username}`} />
            </Head>
            <NavBar/>
            <div className="container">
                <div className="row ">
                    <div className="col"></div>
                    <div className="col">
                        <form name="registerForm" onSubmit={(e)=>updateSubmit(e)}>
                            <div className="mb-3">
                                <label htmlFor="usernameInput" className="form-label">Username</label>
                                <input type="text" className="form-control" id="usernameInput" aria-describedby="emailHelp"
                                value={username}
                                onChange={(e)=>setUsername(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1"
                                value={pass}
                                onChange={(e)=>setPass(e.target.value)}/>
                            </div>
                            <button type="submit" className="btn btn-primary">Register</button>
                        </form>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
            <style jsx>{`
                form {
                margin-top: 50px;
                }
                
            `}</style>
        </>
    )
}

export async function getServerSideProps(context){
    const { params, res }= context
    const { username } = params
    const response = await fetch(`http://localhost:9191/api/users/v1/user/${username}`)
    const data = await response.json()
    if (!data) {
        return {
          notFound: true,
        }
    }
    if(data.error){
        return {
            notFound: true,
          }
    }
    return {
        props: { data }, // will be passed to the page component as props
    }
}