import {useState, useEffect} from 'react'
import Head from 'next/head'

import NavBar from '/components/navBar'
import { updateUser, getUserByName } from '/services/userService'

export default function Profile(props){
    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("")
    const [email, setEmail] = useState("")
    const [notificationMessage,setNotificationMessage] = useState("")
    const [succesMessage,setSuccesMessage] = useState("")
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
        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(!regexUsername.test(username) || !regexPass.test(pass) || !regexEmail.test(email)){
            setNotificationMessage("Formato de usuario, email o password invalido")
            return
        }

        //Peticion
        updateUser(email,username,pass)
        .then(data=>{
                if(data.error){
                    setNotificationMessage(data.errorMessage)
                }else{
                    setSuccesMessage("Datos actualizados")
                }
            }
        )
        .catch(error=>console.log(error))

    }

    const closeAlert = (func)=>{
        func("")
    }
    return (
        <>
            <Head>
                <title>Profile | {username}</title>
                <meta name="description" content={`Profile page technical test user ${username}`} />
            </Head>
            <NavBar/>
            <div className="container">
                    { succesMessage &&
                        <div className="row ">
                            <div className="offset-md-4 col-md-4 offset-md-4">
                                <div className="alert alert-info alert-dismissible fade show" role="alert">
                                    {succesMessage}
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" 
                                        onClick={()=>closeAlert(setSuccesMessage)}></button>
                                </div>
                            </div>
                        </div>
                    }
                    { notificationMessage &&
                        <div className="row ">
                            <div className="offset-md-4 col-md-4 offset-md-4">
                                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                    {notificationMessage}
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"
                                        onClick={()=>closeAlert(setNotificationMessage)}></button>
                                </div>
                            </div>
                        </div>
                    }
                <div className="row ">
                    <div className="col"></div>
                    <div className="col">
                        <form name="registerForm" onSubmit={(e)=>updateSubmit(e)}>
                            <div className="mb-3">
                                <label htmlFor="usernameInput" className="form-label">Username</label>
                                <input type="text" className="form-control" id="usernameInput" aria-describedby="emailHelp"
                                value={username} disabled
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
                .container{
                    margin-top: 30px;
                }
                form {
                    margin-top: 10px;
                }
                
            `}</style>
        </>
    )
}

export async function getServerSideProps(context){
    const { params, res }= context
    const { username } = params
    const response = await getUserByName(username)
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
        props: { data }, 
    }
}