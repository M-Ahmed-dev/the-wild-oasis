import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Cabins from "./pages/Cabins";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import NewUsers from "./pages/Users";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import { BrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import Bookings from "./pages/Bookings";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />

      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replaceto="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="users" element={<NewUsers />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
