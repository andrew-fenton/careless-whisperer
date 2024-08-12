import './App.css';
import ChatBox from './components/ChatBox';
import NavBar from './components/NavBar';
import Login from './components/LogIn';

export default function App() {
  return (
    <div className="App">
      <div className="container">
        {/* <NavBar /> */}
        {/* <ChatBox /> */}
        <Login />
      </div>
    </div>
  );
}