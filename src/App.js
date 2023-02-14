import Customroutes from './Routes';
import {UserProvider} from './context/userContext';
function App() {
  return (
    <UserProvider>
    <div className="App">
      <Customroutes/>
    </div>
    </UserProvider>
    
  );
}

export default App;

