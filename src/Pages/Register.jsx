import styled from "styled-components"
import { Logo, LogginFormContainer, Input, Button, P } from "./LogginPage.jsx"
import { Link } from "react-router-dom"


export default function RegisterPage() {
    return (
        <RegisterContainer>
            <Logo />
            <LogginFormContainer>
                <Input className="input" placeholder="  email" type="text"></Input>
                <Input className="input" placeholder="  senha" type="password"></Input>
                <Input className="input" placeholder="  nome" type="text"></Input>
                <Input className="input" placeholder="  foto" type="text"></Input>
                <Button>Cadastrar</Button>
                <Link to={"/"}>
                    <P>Já tem uma conta? Faça login!</P>
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


