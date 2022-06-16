import {Routes, Route} from 'react-router-dom'
import { Diary, Home, Login, Register, Statistics, NoteStat, Profile, AboutUs } from './pages';
import { useLoading } from './utils/hooks/useLoading';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import PrivateRoute from './PrivateRoute';

function App() {
  const {loading, error} = useLoading();

  return (
    <div>
      <ToastContainer/>
      {loading && <div>{error || `Loading...`}</div>}
      <Routes>
        <Route path="/" element={<Home/>} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Home/>} />
        <Route path="/aboutUs" element={<AboutUs />} />

        <Route path="/diary" location="/diary" element={<PrivateRoute/>} >
          <Route path="/diary" element={<Diary/>} />
        </Route>

        <Route path="/profile" location="/profile" element={<PrivateRoute/>} >
          <Route  path="/profile" element={<Profile/>}/>
        </Route>

        <Route path="/statistics" location="/statistics" element={<PrivateRoute/>} >
          <Route path="/statistics" element={<Statistics />} />
        </Route>

        <Route path="/statistics/note/:noteId" location="/diary" element={<PrivateRoute/>} >
          <Route path="/statistics/note/:noteId" element={<NoteStat />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
