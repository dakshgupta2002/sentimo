import {Routes, Route} from 'react-router-dom'
import { Diary, Home, Login, Register } from './pages';
import { useLoading } from './utils/hooks/useLoading';

function App() {
  const {loading, error} = useLoading();

  return (
    <div>
      {loading && <div>{error || `Loading...`}</div>}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/diary" element={<Diary/>} />
        {/* <Route path="/aboutUs" element={<AboutUs />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
