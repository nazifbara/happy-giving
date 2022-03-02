import { Route, Routes } from 'react-router-dom';

import { AppBar, ContentBox } from './components';
import routes from './routes';

function App() {
  return (
    <>
      <AppBar />
      <ContentBox>
        <Routes>
          {routes.map((r) => (
            <Route key={r.name} {...r.props} />
          ))}
        </Routes>
      </ContentBox>
    </>
  );
}

export default App;
