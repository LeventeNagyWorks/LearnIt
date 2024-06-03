/* eslint-disable no-unused-vars */

import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';

import HeroSection from './routes/HeroSection';
import StudySetsPage from './routes/StudySetsPage';

const routeDefinitions = createRoutesFromElements(
  <Route>
    <Route path="/"  element={<HeroSection />}/>
    <Route path="/study-sets"  element={<StudySetsPage />}/>
  </Route>
)

const router = createBrowserRouter(routeDefinitions);

// const router = createBrowserRouter ([
//   { path: '/', element: <HeroSection /> },
//   { path: '/study-sets', element: <StudySetsPage /> },
// ]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
