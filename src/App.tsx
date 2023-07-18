import "./App.css";
import Layout from "./Layout";
import FirstPart from "./components/FirstPart";
import MainPart from "./components/MainPart";
import ThirdPart from "./components/ThirdPart";

function App() {
  return (
    <Layout>
      <FirstPart />
      <MainPart />
      <ThirdPart />
    </Layout>
  );
}

export default App;
