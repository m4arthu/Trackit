import styled from "styled-components"
import Seta from "../assets/Vector 4.svg"
import Elipse from "../assets/Ellipse 3.svg"
import vector1 from "../assets/vector 1.svg"
import vector2 from "../assets/vector 2.svg"
import vector3 from "../assets/vector 3.svg"
import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import  {AuthContext}  from "../Contexts/auth"

export function Logo() {
    return (
        <ImgContainer>
            <div className="ContainerLogoImgs">
                <div className="vectorsContainer">
                    <img id="vector1" src={vector1} alt="" />
                    <img id="vector2" src={vector2} alt="" />
                    <img id="vector3" src={vector3} alt="" />
                </div>
                <img id="seta" src={Seta} alt="" />
                <img id="elipse" src={Elipse} alt="" />
            </div>
            <div id="LogoText">TrackIt</div>
        </ImgContainer>
    )
}

export default function LogginPage() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const {loggin} = useContext(AuthContext)
    const [inputState,setState] = useState(false)
    function sendLoggin(e) {
        setState(true)
        e.preventDefault();
        loggin(email,password,setState)
    }
    
    return (
        <LogginContainer>
            <Logo />
            <LogginFormContainer onSubmit={sendLoggin}>
                <Input className="input" disabled={inputState} placeholder="  email" onChange={(e)=> setEmail(e.target.value)} type="text" required></Input>
                <Input className="input" disabled={inputState} placeholder="  senha" onChange={(e)=> setPassword(e.target.value)} type="password" required></Input>
                <Button disabled={inputState}>Entrar</Button>
                <Link to={"/cadastro"}>
                    <P>Não tem uma conta? Cadastre-se!</P>
                </Link>
            </LogginFormContainer>
        </LogginContainer>
    )

}

const LogginContainer = styled.div`
width:100%;
display:flex;
flex-direction:column;
justify-content: center;
align-items:center;

`

export const LogginFormContainer = styled.form`
 display:flex;
 flex-direction:column;
 .input::placeholder{
   color:blue;
   font-family: 'Lexend Deca';
   font-style: normal;
   font-weight: 400;
   font-size: 20px;
   color: #DBDBDB;
 }

`
const ImgContainer = styled.div`
 margin-top:20px;
 text-align:center;
 font-family: 'Playball';
 font-style: normal;
 font-weight: 400;
 font-size: 69px;
 color:#126BA5;

 .ContainerLogoImgs{
     position:relative;
     display:flex;
     flex-direction:column;
     margin-bottom:25px;
    .vectorsContainer{
        
        margin-right:28px;
        position:relative;
        img{
            margin-left:5px;
            width:20px;
        }
        #vector1{
            margin-bottom:-15px;
        }
        #vector2{
            margin-bottom:-25px;
        }
        #vector3{
            margin-bottom:-35px;
        }

     }
    #seta{
        width:170px;
    }
 }
 #elipse{
    width:142px;
    height:100%;
    bottom:-70px;
    left:25px;
    position:absolute;
 }
`

export const Input = styled.input`
 border:1px solid #D4D4D4;
 width:303px;
 height:45px;
 border-radius:5px;
 margin-top:10px;
 `

export const Button = styled.button`
 display:flex;
 align-items:center;
 justify-content:center;
 width:310px;
 height:45px;
 background: #52B6FF;
 border-radius: 5px;
 border:none;
 font-family: 'Lexend Deca';
 font-style: normal;
 font-weight: 400;
 font-size: 21px;
 margin-top:10px;
 color:white;

`

export const P = styled.p`
 color:#52B6FF;
 text-decoration:underline;
 font-family: 'Lexend Deca';
 font-style: normal;
 font-weight: 400;
 font-size:14px;
 margin:10px 0 0 40px;
`