import { useState, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import StatusBar from "./components/StatusBar";
import ScrollProgress from "./components/ScrollProgress";
import FloatingButtons from "./components/FloatingButtons";
import Loader from "./components/Loader";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { ToastProvider } from "./components/Toast";
import ResumeModal from "./components/ResumeModal";
import EasterEgg from "./components/EasterEgg";

const ResumeModalContext = createContext(() => {});
// eslint-disable-next-line react-refresh/only-export-components
export const useResumeModal = () => useContext(ResumeModalContext);

function App() {
  const [loading, setLoading] = useState(true);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <BrowserRouter>
      <ToastProvider>
        <ResumeModalContext.Provider value={() => setResumeOpen(true)}>
          <Loader onDone={() => setLoading(false)} />
          {!loading && (
            <>
              <ScrollProgress />
              <Navbar />
              <FloatingButtons />
              <StatusBar />
              <main className="pb-7 sm:pb-7">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
              <EasterEgg />
            </>
          )}
        </ResumeModalContext.Provider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
