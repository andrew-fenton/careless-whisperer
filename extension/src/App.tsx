import './App.css';
import ChatBox from './components/ChatBox';
import NavBar from './components/NavBar';

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <NavBar />
        <ChatBox />
      </div>
    </div>
  );
}