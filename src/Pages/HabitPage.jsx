import styled from "styled-components"

export function Navbar() {
    return (
        <NavContainer>
            <div className="container">
                <Logo>TrackIt</Logo>
                <img src="" alt="" />
            </div>
        </NavContainer>
    )
}

export function Footer() {
    return (
        <>
        </>
    )
}

export default function HabitsPage() {
    return (
        <>
            <Navbar />
            <Body>

            </Body>
            <Footer />
        </>
    )
}


const NavContainer = styled.div`
    background: #126BA5;
    width:100vw;
    height: 70px;
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

`

