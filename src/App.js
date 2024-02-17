import './App.css';
import { Route, Routes } from 'react-router-dom';
import CustomerRouter from './routers/CustomerRouter';
import AdminRouter from './routers/AdminRouter';

function App() {
  return (
    <div className="">
        <Routes>
          <Route path='/*' element={<CustomerRouter/>}></Route>
          <Route path='/admin/*' element={<AdminRouter/>}></Route>
        </Routes>      
    </div>
  );
}

export default App;
