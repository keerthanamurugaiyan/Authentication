import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import SignUp from './Authentication/Register/SignUp';
import Login from './Authentication/Register/Login';
import AdminTable from './Authentication/Register/AdminTable';
import UserTable from './Authentication/Register/UserTable';
// es7

function App() {
  return (
    
    <div className="App">

      <BrowserRouter>
      <Routes>

        <Route path='/' element = {<SignUp/>} />
        <Route path='/loginpage' element = {<Login/>} />  
        <Route path='/usertable' element = {<UserTable/>} />
        {/* <Route path='/admintable' element = {<AdminTable/>} /> */}

      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
