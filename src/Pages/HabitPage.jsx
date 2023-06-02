import styled from "styled-components"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../Contexts/auth"
import axios from "axios"
import { Link } from "react-router-dom"
import ReactDOM from 'react-dom/client'
export function Navbar() {
    const { user } = useContext(AuthContext)
    return (
        <NavContainer>
            <div className="container">
                <Logo>TrackIt</Logo>
                <img src={user.data.image} alt="" />
            </div>
        </NavContainer>
    )
}

export function Footer({ percentage }) {
    return (
        <FooterContainer>
            <div>
                <Link to={"/habitos"}>
                    <p>Habitos</p>
                </Link>
                <div className="progressBarcontainer">
                    <CircularProgressbar
                        value={percentage}
                        styles={progressbarStyle}
                    />
                    <Link to={"/Hoje"}>
                        <p >Hoje</p>
                    </Link>
                </div>
                <Link to={"/historico"}>
                    <p>Histórico</p>
                </Link>
            </div>
        </FooterContainer>
    )
}

function PostHabits({ setDisplayState }) {
    return (
        <PostHabitsContainer>
            <h2>Meus hábitos</h2>
            <button onClick={() => setDisplayState("flex")}>+</button>

        </PostHabitsContainer>
    )
}


export default function HabitsPage() {
    const { user, footerPercentage } = useContext(AuthContext)
    const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
    const [habits, setHabits] = useState([])
    const [displayState, setDisplayState] = useState("none")
    const [inputDisable, setInputDisable] = useState(false)
    const [habit, setHabit] = useState("")
    const percentage = 100
    const weekdays = [{ id: "1", value: "D" }, { id: "2", value: "S" }, { id: "3", value: "T" }, { id: "4", value: "Q" }, { id: "5", value: "Q" }, { id: "6", value: "S" }, { id: "7", value: "S" }]
    var selectedDays = []
    useEffect(() => {
        const promisse = axios.get(url, {
            headers: {
                'Authorization': `Bearer ${user.data.token}`
            }
        })
        promisse.then((response) => {
            setHabits(response.data)
        })
    }, [])

    const Button = ({ value, disabled, id }) => {
        const [selected, setSelected] = useState(false)
        return <ButtonWeek disabled={disabled} type="button" selected={selected} onClick={() => {
            if (selected) {
                setSelected(false)
                selectedDays.splice(selectedDays.indexOf(id), 1)
            } else {
                setSelected(true)
                selectedDays.push(id)
            }
            console.log(selectedDays)
        }} value={value} />

    }

    const sendHabit = (e) => {
        setInputDisable(true)
        e.preventDefault()
        const data = {
            name: habit,
            days: selectedDays
        }
        const promisse = axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${user.data.token}`
            }
        })
        promisse.then((response) => {
            console.log(response)
            setInputDisable(false)
            setHabit("")
            setDisplayState("none")
            selectedDays = []
            const promisse = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", {
                headers: {
                    'Authorization': `Bearer ${user.data.token}`
                }
            })
            promisse.then((response) => {
                setHabits(response.data)
            })
        })
        promisse.catch((error) => {
            setInputDisable(false)
            alert("habito ja criado!!")
            console.log(error)
        })
    }
    return (habits.length === 0 ?

        <>
            <Navbar />
            <Body>
                <PostHabits setDisplayState={setDisplayState} />
                <HabitsForm style={{ display: displayState }} onSubmit={sendHabit}>
                    <input disabled={inputDisable} onChange={(e) => setHabit(e.target.value)} className="text" placeholder="  Nome do hábito" type="text" ></input>
                    <div className="dayweek">
                        {weekdays.map((day) => {
                            return <Button disabled={inputDisable} key={day.id} id={day.id} value={day.value} />
                        })}
                    </div>
                    <div className="actions">
                        <input disabled={inputDisable} className="cancelar" onClick={() => setDisplayState("none")} type="button" value={"cancelar"} />
                        <input disabled={inputDisable} className="enviar" type="submit" value={"salvar"} />
                    </div>
                </HabitsForm>
                <p>Você não tem nenhum hábito cadastrado ainda.
                    Adicione um hábito para começar a trackear!</p>
            </Body>
            <Footer percentage={percentage} />
        </>

        :

        <>
            <Navbar />
            <Body>
                <PostHabits setDisplayState={setDisplayState} />
                <HabitsForm style={{ display: displayState }} onSubmit={sendHabit}>
                    <input disabled={inputDisable} onChange={(e) => setHabit(e.target.value)} className="text" placeholder="  Nome do hábito" type="text" ></input>
                    <div className="dayweek">
                        {weekdays.map((day) => {
                            return <Button disabled={inputDisable} key={day.id} id={day.id} value={day.value} />
                        })}
                    </div>
                    <div className="actions">
                        <input disabled={inputDisable} className="cancelar" onClick={() => setDisplayState("none")} type="button" value={"cancelar"} />
                        <input disabled={inputDisable} className="enviar" type="submit" value={"salvar"} />
                    </div>
                </HabitsForm>
                {habits.map((habit) => {
                    console.log(habit)
                    return <HabitContainer key={habit.id}>
                        <div>
                            <h2>{habit.name}</h2>
                            <div className="container">
                                {weekdays.map((day) => {
                                    if (habit.days.indexOf(weekdays.indexOf(day) + 1) === -1) {
                                        return <ButtonWeek key={day.id} type="button" selected={false} value={day.value} />
                                    } else {
                                        return <ButtonWeek key={day.id} type="button" selected={true} value={day.value} />
                                    }
                                })}
                            </div>
                        </div>
                    </HabitContainer>
                })}
            </Body>
            <Footer percentage={percentage} />
        </>
    )
}


const progressbarStyle = buildStyles({
    // Rotation of path and trail, in number of turns (0-1)
    rotation: 0.25,

    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
    strokeLinecap: 'round',

    // Text size
    textSize: '16px',

    // How long animation takes to go from one percentage to another, in seconds
    pathTransitionDuration: 0.5,

    // Can specify path transition in more detail, or remove it entirely
    // pathTransition: 'none',

    // Colors
    pathColor: `#FFFF`,
    textColor: '#f88',
    trailColor: '#52B6FF',
    backgroundColor: '#52B6FF',
})

const FooterContainer = styled.div`
width:100vw;
height:70px;
background: #FFFFFF;
position:fixed;
bottom:0;

img{
    margin-bottom:40px;
}
div{
    display:flex;
    align-items:center;
    justify-content:space-between;
    margin:0 20px;
    height:100%;
}

.progressBarcontainer{
    position: relative;
    width:76px;
    height:76px;
    background:#52B6FF;
    border-radius:100%;
    border: 5px solid #52B6FF;
    margin-bottom:50px;
    a{
      p{
        position:absolute;
        left:17px;
        bottom:30px;
        color:#FFFF;
      }
   }
}
p{
   font-family: 'Lexend Deca';
   font-style: normal;
   font-weight: 400;
   font-size: 18px;
   color: #52B6FF;
}
a{
    text-decoration:none;
}
`


const NavContainer = styled.div`
    background: #126BA5;
    width:100vw;
    height: 70px;
    box-shadow:0 5px 5px rgb(0,0,0,0.2);
    .container{
        display:flex;
        justify-content:space-between;
        align-items:center;
        height:100%;
        margin:0 20px;
        img{
            border-radius:100%;
            width:51px;
            height:51px;
        }
    }

`

const Logo = styled.p`
font-family: 'Playball';
font-style: normal;
font-weight: 400;
font-size: 40px;
color:white;
`


export const Body = styled.div`
   width:100vw;
   display:flex;
   flex-direction:column;
   align-items:center;
   margin-bottom:120px;
   p{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        margin-top:45px;
        width:338px;
        color: #666666;

    }

`
export const PostHabitsContainer = styled.div`
    display:flex;
    justify-content:space-between;
    width:100%;
    margin-top:20px;
    h2{
        margin-left:10px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        color: #126BA5;

    }
    button{
        display:flex;
        justify-content:center;
        align-items:center;
        padding:0;
        margin:0;
        width:40px;
        height:35px;
        margin-right: 20px;
        background: #52B6FF;
        border-radius: 5px;
        border:none;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 27px;
        color: #FFFFFF;
    }
`

const HabitsForm = styled.form`
    display:flex;
    flex-direction:column;
    align-items:center;
    background: #FFFF;
    width:340px;
    height:180px;
    border-radius: 5px;
    margin-top:20px; 

    .text{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        color:black;
        width:303px;
        height:45px;
        border-radius:5px;
        margin-top:20px;
        border:1px solid #D4D4D4;
    }
    .text::placeholder{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        color:#DBDBDB;
        font-size:20px;

    }
    .dayweek{
        margin-top:10px;
        width:100%;
        margin-left:20px;
    }

    .actions{
        width:100%;
        display:flex;
        justify-content:right;
        margin-top:10px;
        input{
            margin-right:20px;
        }

        .cancelar{
            background:none;
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            color: #52B6FF;
            border:none;
        }

        .enviar{
            width:84px;
            height:35px;
            background:#52B6FF;
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            color: #FFFF;
            border:none;
            border-radius:5px;
        }
    }
    
`

const ButtonWeek = styled.input`
     margin-left:5px;
     width:30px;
     height:30px;
     border:1px solid #D4D4D4;
     border-radius:5px;
     background: ${(props) => props.selected ? "#CFCFCF" : "#FFFF"};
     font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    color:${(props) => props.selected ? "#FFFF" : "#DBDBDB"};
    font-size:20px;
`

const HabitContainer = styled.div`
width:100%;
display:flex;
justify-content:center;
div{
    width:290px;
    height:91px;
    background: #FFFFFF;
    border-radius: 5px;
}

`