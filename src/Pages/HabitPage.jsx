import styled from "styled-components"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../Contexts/auth"
import axios from "axios"
import { Link } from "react-router-dom"
import trash from "../assets/trash.svg"
import { useRef } from "react"
export function Navbar() {
    const { user } = useContext(AuthContext)
    return (
        <NavContainer data-test="header">
            <div className="container">
                <Logo>TrackIt</Logo>
                <img data-test="avatar" src={user.data.image} alt="" />
            </div>
        </NavContainer>
    )
}

export function Footer({ percentage }) {
    return (
        <FooterContainer data-test="menu">
            <div>
                <Link to={"/habitos"}>
                    <p data-test="habit-link">Habitos</p>
                </Link>
                <div className="progressBarcontainer">
                    <CircularProgressbar
                        value={percentage}
                        styles={progressbarStyle}
                    />
                    <Link  to={"/Hoje"}>
                        <p data-test="today-link" >Hoje</p>
                    </Link>
                </div>
                <Link  to={"/historico"}>
                    <p data-test="history-link">Histórico</p>
                </Link>
            </div>
        </FooterContainer>
    )
}

function PostHabits({ setDisplayState }) {
    return (
        <PostHabitsContainer data-test="habit-create-container">
            <h2>Meus hábitos</h2>
            <button data-test="habit-create-btn" onClick={() => setDisplayState("flex")}>+</button>
        </PostHabitsContainer>
    )
}


export default function HabitsPage() {
    var Null = ""
    const { user, footerPercentage,setFooterPercentage } = useContext(AuthContext)
    const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
    const [habits, setHabits] = useState([])
    const [displayState, setDisplayState] = useState("none")
    const [inputDisable, setInputDisable] = useState(false)
    const habit = useRef(null)
    const weekdays = [{ id: "0", value: "D" }, { id: "1", value: "S" }, { id: "2", value: "T" }, { id: "3", value: "Q" }, { id: "4", value: "Q" }, { id: "5", value: "S" }, { id: "6", value: "S" }]
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
        progress(user.data.token)
    }, [])


    const progress = (token) => {
        axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }).then((response)=>{
            const total = response.data.length
            let habitosFeitos = 0 
            response.data.forEach((h)=>{
              if(h.done){
                habitosFeitos++
              }
            })
            setFooterPercentage((habitosFeitos/total).toFixed(2)*100)
          })
      }


   
    const Button = ({ value, disabled, id }) => {
        const [selected, setSelected] = useState(false)
        return <ButtonWeek data-test="habit-day" disabled={disabled} type="button" selected={selected} onClick={() => {
            if (selected) {
                setSelected(false)
                selectedDays.splice(selectedDays.indexOf(Number(id)), 1)
            } else {
                setSelected(true)
                selectedDays.push(Number(id))
            }
        }} value={value} />

    }

    const sendHabit = (e) => {
        setInputDisable(true)
        e.preventDefault()
       
        const data = {
            name: habit.current.value,
            days: selectedDays
        }
        const promisse = axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${user.data.token}`
            }
        })
        promisse.then((response) => {
            habit.current.value = ""
            setInputDisable(false)
            setDisplayState("none")
            console.log(response)
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
            (error)
        })
    }

    const deleteHabit = (id) =>{
        if(confirm("deseja apagar o  abito?")){
            const promisse = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,{
                headers: {
                    'Authorization': `Bearer ${user.data.token}`
                }
            })

            promisse.then(()=>{
             const promisse = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", {
                 headers: {
                     'Authorization': `Bearer ${user.data.token}`
                 }
             })
             promisse.then((response) => {
                 setHabits(response.data)
             })
            })
        } 
    }
    return (habits.length === 0 ?

        <>
            <Navbar />
            <Body>
                <PostHabits setDisplayState={setDisplayState} />
                <HabitsForm data-test="habit-create-container" style={{ display: displayState }} onSubmit={sendHabit}>
                    <input data-test="habit-name-input" disabled={inputDisable} ref={habit} className="text" placeholder="  Nome do hábito" type="text" ></input>
                    <div className="dayweek">
                        {weekdays.map((day) => {
                            return <Button disabled={inputDisable} key={day.id} id={day.id} value={day.value} />
                        })}
                    </div>
                    <div className="actions">
                        <input disabled={inputDisable} data-test="habit-create-cancel-btn" className="cancelar" onClick={() => setDisplayState("none")} type="button" value={"cancelar"} />
                        <input disabled={inputDisable} data-test="habit-create-save-btn"  className="enviar" type="submit" value={"salvar"} />
                    </div>
                </HabitsForm>
                <p>Você não tem nenhum hábito cadastrado ainda.
                    Adicione um hábito para começar a trackear!</p>
            </Body>
            <Footer percentage={footerPercentage} />
        </>

        :

        <>
            <Navbar />
            <Body>
                <PostHabits setDisplayState={setDisplayState} />
                <HabitsForm data-test="habit-create-container" style={{ display: displayState }} onSubmit={sendHabit}>
                    <input data-test="habit-name-input" disabled={inputDisable} ref={habit} className="text" placeholder="  Nome do hábito" type="text" ></input>
                    <div className="dayweek">
                        {weekdays.map((day) => {
                            return <Button disabled={inputDisable} key={day.id} id={day.id} value={day.value} />
                        })}
                    </div>
                    <div className="actions">
                        <input disabled={inputDisable} data-test="habit-create-cancel-btn"  className="cancelar" onClick={() => setDisplayState("none")} type="button" value={"cancelar"} />
                        <input disabled={inputDisable} data-test="habit-create-save-btn" className="enviar" type="submit" value={"salvar"} />
                    </div>
                </HabitsForm>
                {habits.map((habit) => {
                    return <HabitContainer data-test="habit-container" key={habit.id}>
                        <div>
                            <h2 className="header"data-test="habit-name">{habit.name}<span data-test="habit-delete-btn" ><img onClick={()=>deleteHabit(habit.id)}src={trash} alt="" /></span></h2>
                            <div className="container">
                                {weekdays.map((day) => {
                                    if (habit.days.indexOf(weekdays.indexOf(day)) === -1) {
                                        return <ButtonWeek data-test="habit-day" key={day.id} type="button" selected={false} value={day.value} />
                                    } else {
                                        return <ButtonWeek data-test="habit-day" key={day.id} type="button" selected={true} value={day.value} />
                                    }
                                })}
                            </div>
                        </div>
                    </HabitContainer>
                })}
            </Body>
            <Footer percentage={footerPercentage} />
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
   margin-bottom:150px;
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
    width:100%;
    margin-top:20px;
    justify-content:space-between;
    h2{
        margin-left:10px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        color: #126BA5;
        word-break:break-all;
        display:flex;
        margin-right:15px;
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
margin-top:40px;
align-items:center;
word-break:break-word;

.header{
    display:flex;
    width:100%;
    margin-top:10px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    justify-content:space-between;
    background-color:#ffff;
    span{
        margin-right:20px;
    }
}
div{
    margin-top:10px;
    width:290px;
    height:50px;
    background: #FFFFFF;
    border-radius: 5px;
}
.container{
    margin-top:0
}
`