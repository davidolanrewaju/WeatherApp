import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cities from './components/Cities';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index exact element={<Cities />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
