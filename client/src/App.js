import {Routes, Route} from 'react-router-dom'
import { Diary, Home, Login, Register, Statistics } from './pages';
import { useLoading } from './utils/hooks/useLoading';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const {loading, error} = useLoading();

  return (
    <div>
      <ToastContainer/>
      {loading && <div>{error || `Loading...`}</div>}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/diary" element={<Diary/>} />
        {/* <Route path="/aboutUs" element={<AboutUs />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/statistics" element={<Statistics />} />
        
      </Routes>
    </div>
  );
}

export default App;
