import './App.scss';
import Header from '../src/components/Header/Header';
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from './routes/AppRoutes';
import Footer from './components/Footer/Footer';

function App() {
  
  return (
    <Router>
      <div className="app-container position-relative">
        <Header />
        <AppRoutes />
        <Footer />
      </div>
    </Router>

  );
}

export default App;
