import { BrowserRouter, Routes, Route } from "react-router";
import { Appbar } from "./components/Appbar";
import "./index.css";
import { LandingPage } from "./pages/Landing";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashbaord";
import { VideoCreator } from "./pages/VideoCreator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

export function App() {
  return (
    <div>
       <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Appbar />  
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/video-creator" element={<VideoCreator />} />
            </Routes>
          </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
