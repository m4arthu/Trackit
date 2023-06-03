import styled from "styled-components"
import { Logo, LogginFormContainer, Input, Button, P } from "./LogginPage.jsx"
import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import {AuthContext}  from "../Contexts/auth"

export default function RegisterPage() {
    const [email, setEmail]  = useState("")
    const [password, setpassword] = useState("")
    const [name, setname] = useState("")
    const [foto, setfoto] = useState("")
    const {register} = useContext(AuthContext)
    const [inputState,setState] = useState(false)
   
    const EnviarDados = (e) =>{
    e.preventDefault()
    setState(true)
    register(email,password,name,foto,setState)
   }
   
    return (
        <RegisterContainer>
            <Logo />
            <LogginFormContainer onSubmit={EnviarDados}>
                <Input data-test="email-input" className="input" placeholder="  email" disabled={inputState} onChange={(e)=> setEmail(e.target.value)} type="text" required></Input>
                <Input data-test="password-input" className="input" placeholder="  senha" disabled={inputState} onChange={(e)=> setpassword(e.target.value)} type="password" required></Input>
                <Input data-test="user-name-input" className="input" placeholder="  nome" disabled={inputState} onChange={(e)=> setname(e.target.value)} type="text" required></Input>
                <Input data-test="user-image-input" className="input" placeholder="  foto" disabled={inputState}  onChange={(e)=> setfoto(e.target.value)} type="text" required></Input>
                <Button data-test="siginup-btn" disabled={inputState}>Cadastrar</Button>
                <Link to={"/"}>
                    <P data-test="login-link">Já tem uma conta? Faça login!</P>
                </Link>
            </LogginFormContainer>
        </RegisterContainer>
    )
}

const RegisterContainer = styled.div`
width:100%;
display:flex;
flex-direction:column;
justify-content: center;
align-items:center;
`


