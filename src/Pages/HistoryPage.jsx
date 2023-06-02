import { useContext } from "react";
import { Navbar,  Body, Footer} from "./HabitPage";
import { AuthContext } from "../Contexts/auth";
import { Header } from "./HojePage";

export default function HistoryPage() {
   const {footerPercentage} = useContext(AuthContext)
    return (
        <>
            <Navbar />
            <Header>
                <h2>histórico</h2>
            </Header>
            <Body>
                <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
            </Body>
            <Footer percentage={footerPercentage}/>
        </>
    )
}