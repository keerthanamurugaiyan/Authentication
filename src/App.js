import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import logo from './logo.svg';
import SignUp from './Authentication/Register/SignUp';
import './App.css';
import Login from './Authentication/Register/Login';

function App() {
  return (
    
    <div className="App">

      <BrowserRouter>
      <Routes>

        <Route path='/' element = {<SignUp/>} />
        <Route path='/loginpage' element = {<Login/>} />  

      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
