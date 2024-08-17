/* eslint-disable no-unused-vars */

import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';

import HeroSection from './routes/HeroSection';
import StudySetsPage from './routes/StudySetsPage';
import StudySetDetailPage from './routes/StudySetDetailPage';
import LoadingScreen from './components/LoadingScreen';
import { isLoading, isStudyLoading } from './signals';
import LearnStudySet from './routes/LearnStudySet';

const routeDefinitions = createRoutesFromElements(
  <Route>
    <Route path="/" element={<HeroSection />}/>
    <Route path="/study-sets" element={<StudySetsPage />}/>
    <Route path="/study-sets/:itemName" element={<StudySetDetailPage />}/>
    <Route path="/study-sets/:itemName/learning" element={<LearnStudySet />}/>
  </Route>
)

const router = createBrowserRouter(routeDefinitions);

// const router = createBrowserRouter ([
//   { path: '/', element: <HeroSection /> },
//   { path: '/study-sets', element: <StudySetsPage /> },
// ]);

function App() {
  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App;
