import './App.scss';
// import { useSelector, useDispatch } from "react-redux";
// import {increaseCounter,decreaseCounter} from "./redux/action/actions";
import Header from '../src/components/Header/Header';

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
    <div className="App">
        <Header/>
    </div>
  );
}

export default App;
