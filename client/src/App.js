import {Routes, Route} from 'react-router-dom'
import { Diary, Home, Login, Register, Statistics, NoteStat, Profile, AboutUs, Recommendation } from './pages';
import { useLoading } from './utils/hooks/useLoading';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import PrivateRoute from './PrivateRoute';
import Favorite from './pages/Favorite/Favorite';
import Protected from './pages/Protected/Protected';

function App() {
  const {LoadingScreen} = useLoading();

  return (
    <div>
      <ToastContainer/>
      <LoadingScreen/>
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

        <Route path="/favorites" location="/favorites" element={<PrivateRoute/>} >
          <Route path="/favorites" element={<Favorite />} />
        </Route>

        <Route path="/protected" location="/protected" element={<PrivateRoute/>} >
          <Route path="/protected" element={<Protected />} />
        </Route>

        <Route path="/statistics/note/:noteId" location="/diary" element={<PrivateRoute/>} >
          <Route path="/statistics/note/:noteId" element={<NoteStat />} />
        </Route>

        <Route path="/movies" location="/movies" element={<PrivateRoute/>} >
          <Route path="/movies" element={<Recommendation />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
