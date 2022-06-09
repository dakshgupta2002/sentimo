import {Routes, Route} from 'react-router-dom'
import { Diary, Home, Login } from './pages';
import { useLoading } from './utils/hooks/useLoading';

function App() {
  const {loading, error} = useLoading();

  return (
    <div>
      {loading && <div>{error || `Loading...`}</div>}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/diary" element={<Diary/>} />
        <Route path="/aboutUs" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
