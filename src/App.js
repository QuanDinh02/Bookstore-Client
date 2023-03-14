import './App.scss';
import {
  BrowserRouter as Router
} from "react-router-dom";
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <div className="app-container position-relative">
        <AppRoutes />
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </div>
    </Router>

  );
}

export default App;
