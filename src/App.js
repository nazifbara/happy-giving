import { Route, Routes } from 'react-router-dom';

import { AppBar } from './components';
import routes from './routes';

function App() {
  return (
    <>
      <AppBar />
      <main>
        <Routes>
          {routes.map((r) => (
            <Route key={r.name} {...r.props} />
          ))}
        </Routes>
      </main>
    </>
  );
}

export default App;
