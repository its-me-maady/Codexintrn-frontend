import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import NotFound from './NotFound';

function App() {
  return (
    <Router>
      <nav className="bg-gray-800 p-4 mb-8 flex gap-4">
        <Link to="/" className="text-white hover:text-blue-300 font-semibold">Home</Link>
        <Link to="/about" className="text-white hover:text-blue-300 font-semibold">About</Link>
      </nav>
      <div className="container mx-auto px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
