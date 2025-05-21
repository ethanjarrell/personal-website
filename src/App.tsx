import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes';

export default function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route, i) => (
          <Route key={i} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
}
