import './styles/App.css'
import Header from './components/Header'
import MainMovie from './components/MainMovie'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
return(
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path='/' element={<MainMovie></MainMovie>}></Route>
        </Routes>
    </BrowserRouter>
)
}

export default App;