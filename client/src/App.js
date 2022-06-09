import {Routes, Route} from 'react-router-dom'
import { Diary, Home, Login } from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/diary" element={<Diary/>} />
      <Route path="/aboutUs" element={<Login />} />
    </Routes>
  );
}

export default App;
