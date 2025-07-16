import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Issues from "./pages/Issues.jsx";
import PageNotFound from './pages/PageNotFound.jsx';
import SussyBaka from './pages/SussyBaka.jsx';
import FraudMerchantsPage from './pages/Fraudmerch.jsx';
import FraudTransactionApproval from './pages/Fraudapproval.jsx';
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path= "/" element={<Home > </Home>} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/login" element = {<Login />}></Route>
        <Route path="/signup" element = {<Signup />} > </Route>
        <Route path = "Suscustomers" element= {<SussyBaka ></SussyBaka>} ></Route>
        <Route path='fraudmerchants' element={<FraudMerchantsPage />} />
        <Route path='fraudtransactionslive' element={<FraudTransactionApproval />} />
        <Route path="*" element= {<PageNotFound />} />
      </Routes> 
    </BrowserRouter>
    </>
  )
}

export default App
