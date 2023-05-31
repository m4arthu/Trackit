import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import LogginPage from "./Pages/LogginPage.jsx"
import RegisterPage from './Pages/Register.jsx'
import  HabitsPage  from './Pages/HabitPage.jsx'
import HistoryPage from './Pages/HistoryPage.jsx'
function App() {

  return (
    <>
      <ResetCss />
      <BrowserRouter>
        <Routes>
          <Route Component={LogginPage} path='/'></Route>
		  <Route Component={RegisterPage} path='/cadastro'></Route>
		  <Route Component={HabitsPage} path='/habitos'></Route>
		  <Route Component={HistoryPage} path='/historico'></Route>
		</Routes>
      </BrowserRouter>

    </>
  )
}

export default App


const ResetCss = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

`