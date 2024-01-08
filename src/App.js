import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./pages/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import { JobsProvider } from "./context/JobsContext";

function App() {
  return (
    <JobsProvider>
      <div className="app-wrapper container">
        <Header />
        {/* ----------------- routes-start ----------------- */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        {/* ----------------- routes-end ------------------- */}
        <Footer />
      </div>
    </JobsProvider>
  );
}

export default App;

// TODO basit route yapisi
// Login islemleri vs olsaydi protected route yapisi kurardim
