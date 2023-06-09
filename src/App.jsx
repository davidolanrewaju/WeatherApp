import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cities from './components/Cities';
import DisplayWeather from './components/DisplayWeather';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route index exact element={<Cities />} />
        <Route path="/:cityName" exact element={<DisplayWeather />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
