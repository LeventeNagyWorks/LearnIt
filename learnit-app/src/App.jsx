/* eslint-disable no-unused-vars */

import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import HeroSection from './routes/HeroSection';
import StudySetsPage from './routes/StudySetsPage';
import StudySetDetailPage from './routes/StudySetDetailPage';
import LoadingScreen from './components/LoadingScreen';
import { isLoading, isStudyLoading } from './signals';
import LearnStudySet from './routes/LearnStudySet';
import Login from './components/loginAndRegistration/Login';
import Registration from './components/loginAndRegistration/Registration';
import PrivateRoute from './routes/PrivateRoute';
import MyProfile from './routes/MyProfile';

const routeDefinitions = createRoutesFromElements(
  <Route>
    <Route path="/" element={<HeroSection />} />
    <Route path="/login" element={<Login />} />
    <Route path="/registration" element={<Registration />} />
    <Route path="/study-sets" element={<PrivateRoute><StudySetsPage /></PrivateRoute>} />
    <Route path="/study-sets/:itemName" element={<PrivateRoute><StudySetDetailPage /></PrivateRoute>} />
    <Route path="/study-sets/:itemName/learning" element={<PrivateRoute><LearnStudySet /></PrivateRoute>} />
    <Route path="/profile" element={<PrivateRoute><MyProfile /></PrivateRoute>} />
  </Route>
)

const router = createBrowserRouter(routeDefinitions);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;

