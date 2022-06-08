import {Routes, Route} from 'react-router-dom'
import { Diary, Home } from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/diary" element={<Diary/>} />
    </Routes>
  );
}

export default App;
