import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ActivityDetails from './pages/ActivityDetails';
import SelectDate from './pages/SelectDate';
import SelectTime from './pages/SelectTime';
import Checkout from './pages/Checkout';
import CheckoutDetails from './pages/CheckoutDetails';
import Confirmation from './pages/Confirmation';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activity/:id" element={<ActivityDetails />} />
        <Route path="/select-date/:id" element={<SelectDate />} />
        <Route path="/select-time/:id" element={<SelectTime />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout-details" element={<CheckoutDetails />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </Router>
  );
}

export default App;
