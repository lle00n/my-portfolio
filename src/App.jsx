/**
 * ----------------------------------------------------------------------------
 * Description: App file that is the parent component and combines all other child components
 * ----------------------------------------------------------------------------
 * Author: Léon Albert
 * ----------------------------------------------------------------------------
 */

import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home/Home.jsx';
import ProjectDetails from './Pages/ProjectDetails/ProjectDetails.jsx';
import ProjectPrivacyPolicy from './Pages/ProjectDetails/ProjectPrivacyPolicy.jsx';

function App() {
  return (
    <Routes>
      {/* Default route "/" → Home */}
      <Route path="/" element={<Navigate to="/my-portfolio" replace />} />

      {/* Hauptseiten */}
      <Route path="/my-portfolio" element={<Home />} />
      <Route path="/my-portfolio/project/:id" element={<ProjectDetails />} />
      <Route path="/my-portfolio/project/:id/privacyPolicy" element={<ProjectPrivacyPolicy />} />

      {/* Fallback für unbekannte URLs */}
      <Route path="*" element={<Navigate to="/my-portfolio" replace />} />
    </Routes>
  );
}

export default App;
