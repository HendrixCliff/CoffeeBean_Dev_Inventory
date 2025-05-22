import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './Dashboard';
import Login from "./components/LoginComponent"
import ForgotPassword from "./components/ForgotPasswordComponent"
import SignUp from "./components/SignUpComponent"
import  ResetPassword from "./components/ResetPasswordComponent"
import FilteredItemsList from "./components/FilteredItemsList"
import UploadReceiptForm from './components/UploadReceiptForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/filter" element={<FilteredItemsList />} />
        <Route path="/upload-receipt" element={<UploadReceiptForm />} />
      </Routes>
    </Router>
  );
}

export default App;
