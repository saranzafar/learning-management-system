import { Outlet } from 'react-router-dom'

function App() {

  return (
    <main className="App h-screen w-screen">
      <Outlet />
    </main>
  );
}

export default App