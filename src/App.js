import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ForgetPassword from './pages/ForgetPassword';
import Header from './components/Header';
import './global.css/Login.css';
import './global.css/Signup.css'
function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={< SignUp/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
