import { useEffect, useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { LeadProvider } from './context/LeadContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 100);
    return () => window.clearTimeout(timer);
  }, []);

  if (!ready) return null;

  return (
    <AuthProvider>
      <LeadProvider>
        <AppRoutes />
      </LeadProvider>
    </AuthProvider>
  );
}

export default App;
