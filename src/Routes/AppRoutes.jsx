import {
    BrowserRouter,
    Route,
    Routes,
    Navigate,
} from "react-router-dom"

import LogginPage from "../Pages/LogginPage.jsx"
import RegisterPage from '../Pages/Register.jsx'
import HabitsPage from '../Pages/HabitPage.jsx'
import HistoryPage from '../Pages/HistoryPage.jsx'

import {AuthContext, AuthProvider}  from "../Contexts/auth"
import { useContext } from "react"

export const AppRoutes = () => {
    const Private = ({children}) =>{
        const {authenticated,user} = useContext(AuthContext)
        console.log(authenticated,user)

        if(authenticated) {
            return children
        } else {

            return <LogginPage/>
        }
    }
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route element={
                      <Private>
                        <LogginPage/>
                      </Private>
                    } path='/'></Route>
                    <Route element={
                       <RegisterPage/> 
                    } path='/cadastro'></Route>
                    <Route element={
                        <Private>
                            <HabitsPage/>
                        </Private>
                    } path='/habitos'></Route>
                    <Route element={
                      <Private>
                      <HistoryPage/>
                    </Private>
                    } path='/historico'></Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}