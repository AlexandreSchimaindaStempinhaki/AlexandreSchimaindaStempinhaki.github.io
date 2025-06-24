import logo from './logo.svg';
import './App.css';
import Welcome from './components/welcome';
import Link from './components/link';
import Counter from './components/counter';
import List from './components/list';
import Mega from './components/mega';

function App() {
  return (
    <div className="App">
      <Welcome text="Corinthians 🦅⚽⚫⚪" cor = "#808080"/>
      <Link url="https://www.corinthians.com.br/" text = "Corinthians"/>
      <Counter val="10"/>
      <List />
      <Mega />
    </div>
  );
}

export default App;
