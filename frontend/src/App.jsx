import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserRouter from './Routers/UserRouter'
import AdminRouter from './Routers/AdminRouter'

function App() {


  return (
    <>
      <div>
       <BrowserRouter>
        <Routes>

          <Route  path='/*' element={< UserRouter />} />
          <Route  path='/admin/*' element={< AdminRouter />} />

        </Routes>
       </BrowserRouter>
      </div>
     
    </>
  )
}

export default App
