import './App.css';
import{Route,Routes} from 'react-router-dom';
import HomePage from './component/HomePage';
import Status from './component/Status/Status';
import StatusViewer from './component/Status/StatusViewer';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/status' element={<Status/>}></Route>
        <Route path='/status/:userId' element={<StatusViewer/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
