import {
    BrowserRouter,
    Route,
    Routes,
    Navigate,
} from "react-router-dom"
import { GoogleOAuthProvider } from '@react-oauth/google';
import LogginPage from "../Pages/LogginPage.jsx"
import RegisterPage from '../Pages/Register.jsx'
import HabitsPage from '../Pages/HabitPage.jsx'
import HistoryPage from '../Pages/HistoryPage.jsx'

import { AuthContext, AuthProvider } from "../Contexts/auth"
import { useContext } from "react"
import { HojePage } from "../Pages/HojePage.jsx"

export const AppRoutes = () => {
    const Private = ({ children }) => {
        const { authenticated, user } = useContext(AuthContext)

        if (authenticated) {
            return children
        } else {

            return <LogginPage />
        }
    }
    return (
        <BrowserRouter>
            <GoogleOAuthProvider clientId="803295868541-o441a78i4thhnt2rr5ks39v77d3m4naq.apps.googleusercontent.com">
                <AuthProvider>
                    <Routes>
                        <Route element={
                            <Private>
                                <LogginPage />
                            </Private>
                        } path='/'></Route>
                        <Route element={
                            <RegisterPage />
                        } path='/cadastro'></Route>
                        <Route element={
                            <Private>
                                <HabitsPage />
                            </Private>
                        } path='/habitos'></Route>
                        <Route element={
                            <Private>
                                <HistoryPage />
                            </Private>
                        } path='/historico'></Route>
                        <Route path="/hoje" element={
                            <Private>
                                <HojePage />
                            </Private>
                        }></Route>

                    </Routes>
                </AuthProvider>
            </GoogleOAuthProvider>;
        </BrowserRouter>
    )
}