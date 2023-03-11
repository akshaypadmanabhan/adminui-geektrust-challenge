import "./App.css";
import Admins from "./components/Admins/Admins";
import SearchBar from "./components/search/Search";
function App() {
  return <div className="App">
   <SearchBar/>
    
    <Admins/>
    <SearchBar/>
  </div>;
}

export default App;
