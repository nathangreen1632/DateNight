import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/Routes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
