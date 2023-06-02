import { useContext, useEffect, useState } from "react"
import { Body, Footer, Navbar } from "./HabitPage"
import { AuthContext } from "../Contexts/auth"
import styled from "styled-components"
import axios from "axios"
import moment, { now } from "moment/moment"
const weekdays = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sabado"]
export const HojePage = () => {
   const {footerPercentage,setFooterPercentage,user} = useContext(AuthContext)
   const [habits,setHabits] = useState([])
   const data = moment()
   useEffect(()=>{
    progress(user.data.token)
   },[])
   
   
   
   const progress = (token) => {
    var habitConcluidos = 0
    const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today"
    const promisse = axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    promisse.then((response) => {
        setHabits(response.data)
        response.data.forEach((habit) => {
          if (habit.done) {
            habitConcluidos+= 1
          }
        })
        console.log(response.data)
    })
  }
    return (
        <>
            <Navbar />
            <Body>
                <Header>
                    <h2>{weekdays[new Date().getDay()]+","} {data.day() +"/"+ data.month()} </h2>
                </Header>
             {habits.map((habit)=>{
                return <HabitContainer key={habits.indexOf(habit)}>
                        <div>
                            {habit.name}
                        </div>
                </HabitContainer>
             })}
            </Body>
            <Footer percentage={footerPercentage}  />
        </>
    )
}

const HabitContainer = styled.div`
width:100%
display:flex;
justify-content:center;

`
export const Header = styled.div`

`