import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Issues from "./pages/Issues.jsx";
import PageNotFound from './pages/PageNotFound.jsx';
import SussyBaka from './pages/suspicious.jsx';
import Analytics from './pages/Analytics.jsx';
import FraudTransactionApproval from './pages/Fraudapproval.jsx';
import { AuthProvider } from './components/AuthContext.jsx';
function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path= "/" element={<Home > </Home>} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/login" element = {<Login />}></Route>
        <Route path="/signup" element = {<Signup />} > </Route>
        <Route path = "insights" element= {<SussyBaka ></SussyBaka>} ></Route>
        <Route path='analytics' element={<Analytics />} />
        <Route path='fraudtransactionslive' element={<FraudTransactionApproval />} />
        <Route path="*" element= {<PageNotFound />} />
      </Routes> 
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
