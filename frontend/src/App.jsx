import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import AddClass from './pages/AddClass';
import Login from './pages/Login';
import Register from './pages/Register';
import ReserveClass from './pages/ReserveClass';

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/*" element={<div>Home</div>} />
        <Route path="/reserve" element={<ReserveClass />} />
        <Route path="/add" element={<AddClass />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
