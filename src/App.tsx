import "./App.css";
import Layout from "./Layout";
import FirstPart from "./components/FirstPart";
import MainPart from "./components/MainPart";
import ThirdPart from "./components/ThirdPart";
import { useSelector, useDispatch } from "react-redux";
import { setCounter } from "./redux/actions";

function App() {
  const counter = useSelector((state: any) => state.counter);
  const dispatch = useDispatch();

  const incrementCounter = () => {
    dispatch(setCounter(counter + 1));
  };
  console.log(incrementCounter);
  return (
    <Layout>
      <FirstPart />
      <MainPart />
      <ThirdPart />
    </Layout>
  );
}

export default App;
