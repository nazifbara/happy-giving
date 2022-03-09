import { Route, Routes } from 'react-router-dom';

import { CartProvider } from './contexts';
import { AppBar, ContentBox } from './components';
import routes from './routes';

function App() {
  return (
    <CartProvider>
      <AppBar />
      <ContentBox>
        <Routes>
          {routes.map((r) => (
            <Route key={r.name} {...r.props} />
          ))}
        </Routes>
      </ContentBox>
    </CartProvider>
  );
}

export default App;
