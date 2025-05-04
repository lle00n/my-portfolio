/**
 * ----------------------------------------------------------------------------
 * Description: App file that is the parent component and combines all other child components
 * ----------------------------------------------------------------------------
 * Author: Léon Albert
 * ----------------------------------------------------------------------------
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home.js';
import ProjectDetails from './Pages/ProjectDetails/ProjectDetails.js';

function App() {
  return (
    <Routes>
      <Route path="/my-portfolio" element={<Home />} />
      <Route path="/my-portfolio/project/:id" element={<ProjectDetails />} />
    </Routes>
  );
}

export default App;