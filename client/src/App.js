import logo from './logo.svg';
import './App.css';
import RequestList from './bricks/RequestList'
import LoanCalculator from './bricks/LoanCalculator';
function App() {
  return (
    <div className="App">
      <RequestList />
      <LoanCalculator />
     
    </div>
  );
}

export default App;
