import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import NgoSidebar from "./components/NgoSidebar";
import NgoDashboard from "./components/NgoDashboard";
import EditNgoProfileForm from "./components/EditNgoProfileForm";
import ManageEvents from "./components/ManageEvents";
import NgoPostsMedia from "./components/NgoPostsMedia";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./index.css";
import CreateEvent from "./components/CreateEvent";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000, // 1000->mili so 60*1000==60sec
      staleTime: 0, // 1000->mili so 60*1000==60sec
    },
  },
});
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NgoSidebar/>} />
            <Route path="/ngo/dashboard" element={<NgoDashboard/>} />
            <Route path="/ngo/edit-profile" element={<EditNgoProfileForm/>} />
            <Route path="/ngo/events" element={<ManageEvents/>} />
            <Route path="/ngo/events/create" element={<CreateEvent />} />
            <Route path="/ngo/posts" element={<NgoPostsMedia/>} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",

              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
