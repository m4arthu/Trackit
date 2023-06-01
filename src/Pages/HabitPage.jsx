import styled from "styled-components"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
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
    let percentage = 15
    return (
        <FooterContainer>
            <div>
                <p>Habitos</p>
                <div className="progressBarcontainer">
                    <CircularProgressbar
                        value={percentage}
                        styles={progressbarStyle}
                    />
                    <p>Hoje</p>
                </div>

                <p>Histórico</p>
            </div>
        </FooterContainer>
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
    p{
        position:absolute;
        left:20px;
        color:#FFFF;
    }
}

p{
   font-family: 'Lexend Deca';
   font-style: normal;
   font-weight: 400;
   font-size: 18px;
   color: #52B6FF;
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

`

