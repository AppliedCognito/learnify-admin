
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import DashboardPage from './pages/DashboardPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainLayout/>}>
          <Route index element={<DashboardPage/>}/>
          <Route path='/dashboard' element={<DashboardPage/>}/>
      

        
        </Route>
      
      </Routes>
    </Router>

  )
}

export default App
