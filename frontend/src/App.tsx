
import './App.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from './context/AuthProvider';
import AppRouter from './components/router/AppRouter';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import './override.scss'
import './dark-theme.css';  
import OrderProvider from './context/OrderProvider';

const queryClient = new QueryClient()




function App() {
  return (

    <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <OrderProvider>
            <AppRouter></AppRouter>
          </OrderProvider>
        </AuthProvider>
      </QueryClientProvider>
  );
}



export default App;
