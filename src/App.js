import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Navbar/>
      {/* <div className="bg-custom-image"> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* other routes here */}
        </Routes>
      {/* </div> */}
    </Router>
  )
};

export default App;