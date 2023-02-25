import logo from './logo.svg';
import './App.css';
import Routes from './Routes';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import {UserContextProvider} from './context/userContext'

function App() {
  return (
    <div className="App">
      <ReactNotifications />
      <UserContextProvider>
      <Routes/>
      </UserContextProvider>
    </div>
  );
}

export default App;
