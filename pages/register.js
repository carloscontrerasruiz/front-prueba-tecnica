import {useState} from 'react'

import { useRouter } from 'next/router' 
import Head from 'next/head'
import NavBar from '/components/navBar'
import { registerUser } from '/services/userService'

export default function Register(){
    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("")
    const [email, setEmail] = useState("")
    const [notificationMessage,setNotificationMessage] = useState("")
    const router = useRouter()

    const registerSubmit = (e)=>{
        e.preventDefault();
        //Validacion de campos
        const regexUsername = /^[a-zA-Z0-9]{5,10}$/
        const regexPass = /^[a-zA-Z0-9!$&?¡¿]{8,15}$/
        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(!regexUsername.test(username) || !regexPass.test(pass) || !regexEmail.test(email)){
            setNotificationMessage("Formato de usuario, email o password invalido")
            return
        }

        //Peticion
        registerUser(email,username,pass)
        .then(data=>{
                //Login exitoso se envia a otar pagina
                if(data.error){
                    setNotificationMessage(data.errorMessage)
                }else{
                    router.push({pathname:'/login', query: { fromRegister: true }})
                }
            }
        )
        .catch(error=>console.log(error))

    }

    return(
        <>
            <Head>
                <title>Register</title>
                <meta name="description" content="Register page technical test" />
            </Head>
            <NavBar/>
            <div className="container">
                    <div className="row ">
                        <div className="offset-md-4 col-md-4 offset-md-4">
                            <div className="alert alert-info alert-dismissible fade show" role="alert">
                                <ul>
                                    <li>El nombre de usuario no debe contener espacios o caracteres especiales</li>
                                    <li>El password debera tener un longitud minima de 8 caracteres</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    { notificationMessage &&
                        <div className="row ">
                            <div className="offset-md-4 col-md-4 offset-md-4">
                                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                    {notificationMessage}
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>
                        </div>
                    }
                <div className="row ">
                    <div className="col"></div>
                    <div className="col">
                        <form name="registerForm" onSubmit={(e)=>registerSubmit(e)}>
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