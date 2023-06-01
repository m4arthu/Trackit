import axios from "axios";
import React, {createContext} from "react"
import { useState } from "react"
import {  useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [userState, setUserState] = useState(false)
    const [user,setUser] = useState({})
    const navigate = useNavigate()   
    const loggin = (email,password,setInputState) =>{
       const promisse = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
       {
        email:email,
        password:password
       })
       promisse.then((UserData)=>{
        setUserState("true")
        setUser(UserData)
        console.log("usuario Logado") 
        navigate("/habitos")
       })
       promisse.catch((error)=>{
        setInputState(false)
          if(error.response.status === 422){
            alert("email invalido")
          } else {
            alert("Usuario não cadastrado!")
            navigate("/cadastro")
          }
       })
    }
    const register = (email,password,name,imageSrc,setInputState)=>{
        const promisse =   axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
        {
            email: email,
            name: name,
            image: imageSrc,
            password: password
        })
        promisse.then(()=>{
            navigate("/ ")
            console.log("usuario registrado")
        })
        promisse.catch((error)=>{
           if(error.response.status === 422){
            alert("url ou email invalídos")
           } else {
            alert("usuário ja cadastrado")
           }
            setInputState(false)
        })
    }
    return(
        <AuthContext.Provider value={{authenticated:userState, user,  loggin, register}}>
            {children}
        </AuthContext.Provider>
      
      )
    }
    