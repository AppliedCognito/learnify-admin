
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import DashboardPage from './pages/DashboardPage';
import ContentPage from './pages/ContentPage';
import UserPage from './pages/UserPage';
import QuizPage from './pages/QuizPage';
import Analyticspage from './pages/Analyticspage';
import AchievementsPage from './pages/AchievementsPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainLayout/>}>
          <Route index element={<DashboardPage/>}/>
          <Route path='/dashboard' element={<DashboardPage/>}/>
          <Route path='/content' element={<ContentPage/>}/>
          <Route path='/users' element={<UserPage/>}/>
          <Route path='/quiz' element={<QuizPage/>}/>
          <Route path='/analytics' element={<Analyticspage/>}/>  
          <Route path='/achievements' element={<AchievementsPage/>}/>  
        </Route>
      
      </Routes>
    </Router>

  )
}

export default App
