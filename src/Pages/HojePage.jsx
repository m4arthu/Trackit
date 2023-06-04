import { useContext, useEffect, useState } from "react"
import { Body, Footer, Navbar } from "./HabitPage"
import { AuthContext } from "../Contexts/auth"
import styled from "styled-components"
import axios from "axios"
import moment from "moment/moment"
const weekdays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"]
import Confirm from "../assets/confirm.svg"
export const HojePage = () => {
  const { footerPercentage, setFooterPercentage, user } = useContext(AuthContext)
  const [habits, setHabits] = useState([])
  const data = moment()
  useEffect(() => {
    progress(user.data.token)
  }, [])

  const Habit = ({ habit }) => {
    console.log(habit)
    const [confirmed, setConfirmed] = useState(habit.done ? true : false)
    const toMarkHabit = () => {
      if (habit.done) {
        setConfirmed(false)
        const promisse = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/uncheck`, {}, {
          headers: {
            'Authorization': `Bearer ${user.data.token}`
          }
        })
        promisse.then(() => {
          axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", {
            headers: {
              'Authorization': `Bearer ${user.data.token}`
            }
          }).then((response) => {
            const total = response.data.length
            let habitosFeitos = 0
            response.data.forEach((h) => {
              if (h.done) {
                habitosFeitos++
              }
            })
            setHabits(response.data)
            setFooterPercentage((habitosFeitos / total).toFixed(2))
          })
        })
      } else {
        setConfirmed(true)
        const promisse = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/check`, {}, {
          headers: {
            'Authorization': `Bearer ${user.data.token}`
          }
        })
        promisse.then(() => {
          axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", {
            headers: {
              'Authorization': `Bearer ${user.data.token}`
            }
          }).then((response) => {
            const total = response.data.length
            let habitosFeitos = 0
            response.data.forEach((h) => {
              if (h.done) {
                habitosFeitos++
              }
            })
            setHabits(response.data)
            setFooterPercentage((habitosFeitos / total).toFixed(2) * 100)
          })

        })
      }
    }

    return <HabitContainer seqeunce={habit.currentSequence} record={habit.highestSequence}  confirmed={confirmed} key={habits.indexOf(habit)}>
      <div data-test="today-habit-name">
        {habit.name}
        <button data-test="today-habit-check-btn" onClick={() => { toMarkHabit() }} className="confirm-box"><img src={Confirm} alt="" /></button>
        <section>
          <p data-test="today-habit-sequence">Sequência atual <span>{habit.currentSequence} dias</span></p>
          <p data-test="today-habit-record">Seu recorde <span>{habit.highestSequence} dias</span></p>
        </section>
      </div>

    </HabitContainer>
  }

  const progress = (token) => {
    const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today"
    const promisse = axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    promisse.then((response) => {
      setHabits(response.data)
    })
  }
  return (
    < div>
      <Navbar />
      <Header>
        <h2 data-test="today">{weekdays[data.day()] + ","} {new Date().getDate() + "/" + data.month()} </h2>
        {footerPercentage === 0.00 ? <P >Nenhum hábito concluído ainda</P> :
          <P color={"#8FC549"}><span data-test="today-counter" >{footerPercentage + "%"}</span> dos hábitos concluídos</P>}
      </Header>
      {habits.map((habit) => {
        return <HojeContainer data-test="today-habit-container">
          <Habit  key={habit.id}  habit={habit} />
        </HojeContainer>

      })}

      <Footer percentage={footerPercentage} />
    </div>
  )
}

const HabitContainer = styled.div`
width:100%
display:flex;
justify-content:center;
height: 94px;
width: 340px;
border-radius: 5px;
background:#ffff;
margin-top:20px;
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;


div{
  position:relative;
  font-size: 20px;
  color: #666666;
  margin: 15px 0 0 15px;
  display:flex;
  justify-content:space-between;
  margin-right:13px;
  section{
    position:absolute;
    bottom:5px;
    font-size:13px;
    p{
      span{
      color:${(props)=>props.seqeunce === props.highestSequence ? "#8FC549" : "#666666"};
      }
    }
}
}
  button{
  height: 69px;
   width: 69px;
   left: 276px;
   top: 190px;
   border-radius: 5px;
   background: ${(props) => props.confirmed ? "#8FC549" : "#EBEBEB"};
   border:none;
   
}
`
export const Header = styled.div`

font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 23px;
color: #126BA5;
margin: 20px 0  0 20px;

`
const P = styled.p`
 color: ${(props) => props.color ? props.color : "#BABABA"};
  font-size:18px;
  margin-top:10px;
`

const HojeContainer = styled.div`
display:flex;
justify-content:center;

`