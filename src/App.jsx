import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { onAuthStateChanged } from "firebase/auth";
import 'bulma/css/bulma.min.css';
import './styles/main.css';
import { ProtectedRoute } from "./components/protectedRoute";
import Layout from "./pages/layout";
import Login from "./pages/login";
import Excuses from "./pages/excuses";
import CatFact from "./pages/catsFact";
import Error from "./pages/error";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import Home from "./pages/home";

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        return;
      }
      setUser(null);
    });

    return () => unsubscribe();
  }, [])

  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      }
    }
  });

  return (
    <QueryClientProvider client={client}>
      <Router >
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="catFact" element={
              <ProtectedRoute user={user}>
                <CatFact />
              </ProtectedRoute>
            } />
            <Route path="excuses" element={
              <ProtectedRoute user={user}>
                <Excuses />
              </ProtectedRoute>
            } />
            <Route path="error" element={<Error />} />
            <Route path="*" element={<Navigate to="error" />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
