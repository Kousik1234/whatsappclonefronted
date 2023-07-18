import './App.css';
import{Route,Routes} from 'react-router-dom';
import HomePage from './component/HomePage';
import Status from './component/Status/Status';
import StatusViewer from './component/Status/StatusViewer';
import Signin from './component/Register/Signin';
import SignUp from './component/Register/SignUp';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/status' element={<Status/>}></Route>
        <Route path='/status/:userId' element={<StatusViewer/>}></Route>
        <Route path='/signin' element={<Signin/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
