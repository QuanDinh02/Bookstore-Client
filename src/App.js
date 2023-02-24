import './App.scss';
// import { useSelector, useDispatch } from "react-redux";
// import {increaseCounter,decreaseCounter} from "./redux/action/actions";
import Header from '../src/components/Header/Header';
import HomepageContent from './components/Content/Homepage/HomepageContent';
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
    <div className="app-container">
      <div className='header-section'>
        <Header />
      </div>
      <div className='homepage-section'>
        <HomepageContent />
      </div>
      <div className='footer-section'>
        <Footer/>
      </div>

    </div>
  );
}

export default App;
