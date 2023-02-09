import { BrowserRouter } from 'react-router-dom';

import './App.css';
import MenuComponent from './components/MenuComponent.jsx';

function App() {
  return (
    <BrowserRouter>
      <MenuComponent />
    </BrowserRouter>
  );
}

export default App;
