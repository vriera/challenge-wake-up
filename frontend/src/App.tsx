
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

const queryClient = new QueryClient()




function App() {
  return (
    <ThemeProvider
    breakpoints={[ 'sm', 'xs', 'xxs']}
  >
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRouter></AppRouter>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}



export default App;
