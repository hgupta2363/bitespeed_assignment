import logo from './logo.svg';
import './App.css';
import FlowBuilder from './FlowBuilder';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='app'>
      <ToastContainer
        style={{ position: 'fixed', top: '5px', right: '280px' }}
        hideProgressBar
        autoClose={1000}
        draggable
      />
      <FlowBuilder />
    </div>
  );
}

export default App;
