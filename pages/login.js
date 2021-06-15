import {useState} from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { loginService } from '/services/userService'
import NavBar from '/components/navBar'

export default function Login(){
    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("")
    const [notificationMessage,setNotificationMessage] = useState("")
    const router = useRouter()

    

    const loginSubmit = (e)=>{
        e.preventDefault();
        //Validacion de campos
        const regexUsername = /^[a-zA-Z0-9]{5,10}$/
        const regexPass = /^[a-zA-Z0-9!$&?¡¿]{8,15}$/
        if(!regexUsername.test(username) || !regexPass.test(pass)){
            setNotificationMessage("Formato de usuario o password invalido")
            return
        }

        //Peticion
        loginService(username,pass)
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

    return(
        
        <>
            <Head>
                <title>Login</title>
                <meta name="description" content="Login page technical test" />
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
               {
                   router.query.fromRegister && 
                   <div className="row ">
                        <div className="offset-md-4 col-md-4 offset-md-4">
                            <div className="alert alert-info alert-dismissible fade show" role="alert">
                                <strong>Felicidades</strong> tu usuario fue creado con exito, ingresa con tu nombre de usuario y contraseña
                            </div>
                        </div>
                    </div>
               }
                <div className="row ">
                    <div className="col"></div>
                    <div className="col">
                        <form name="contactform" onSubmit={(e)=>loginSubmit(e)}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    value={username}
                                    onChange={(e)=>setUsername(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1"
                                    value={pass}
                                    onChange={(e)=>setPass(e.target.value)}/>
                            </div>
                            <button type="submit" className="btn btn-primary">Ingresar</button>
                        </form>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
            <style jsx>{`
                form {
                margin-top: 10px;
                }
                .container{
                margin-top: 30px;
                }
                
            `}</style>
        </>
    )
}