import './App.scss';
// import { useSelector, useDispatch } from "react-redux";
// import {increaseCounter,decreaseCounter} from "./redux/action/actions";
import Header from '../src/components/Header/Header';
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from './routes/AppRoutes';
import Footer from './components/Footer/Footer';

function App() {
  // const count = useSelector(state => state.counter.count);
  // const dispatch = useDispatch();

  // const handleIncrease = () => {
  //   dispatch(increaseCounter());
  // }

  // const handleDecrease = () => {
  //   dispatch(decreaseCounter());
  // }

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
