import logo from './logo.svg';
import './App.scss';
import { useSelector, useDispatch } from "react-redux";
import {increaseCounter,decreaseCounter} from "./redux/action/actions";

function App() {
  const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(increaseCounter());
  }

  const handleDecrease = () => {
    dispatch(decreaseCounter());
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hello world with React</h1>
        <div>
          Count: {count}
        </div>
        <button onClick={handleIncrease}>Increase</button>
        <button onClick={handleDecrease}>Decrease</button>
      </header>
    </div>
  );
}

export default App;
