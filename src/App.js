import './App.scss';
import Header from '../src/components/Header/Header';
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from './routes/AppRoutes';
import Footer from './components/Footer/Footer';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <Router>
      <div className="app-container position-relative">
        <Header />
        <AppRoutes />
        <Footer />
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </div>
    </Router>

  );
}

export default App;
