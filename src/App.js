import React from 'react';
import Store from './Components/Store';
import Dashboard from './Components/Dashboard';


function App() {
  return (
    <div className="App">
      <Store>
        <Dashboard/>
      </Store>
    </div>
  );
}

export default App;
