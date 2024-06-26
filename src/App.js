import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import logo from './logo.svg';
import SignUp from './Authentication/Register/SignUp';
import './App.css';
import Login from './Authentication/Register/Login';
import Table from './Authentication/Register/Table';
// es7

function App() {
  return (
    
    <div className="App">

      <BrowserRouter>
      <Routes>

        <Route path='/' element = {<SignUp/>} />
        <Route path='/loginpage' element = {<Login/>} />  
        <Route path='/table' element = {<Table/>} />

      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
