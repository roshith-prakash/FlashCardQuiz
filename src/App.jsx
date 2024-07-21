import { Home, NotFound, Test } from "./pages";
import { useQuery } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { axiosInstance } from "./utils/axios";
import { SyncLoader } from "react-spinners";
import Navbar from "./components/Navbar";
import { Typewriter } from "react-simple-typewriter";

function App() {
  // Check if server is active
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["check"],
    queryFn: () => {
      return axiosInstance.get("/");
    },
    refetchInterval: 10000,
    retry: 10,
  });

  return (
    <>
      {/* If server isn't ready for use, show a loading indicator */}
      {isLoading && (
        <div className="h-screen w-full flex flex-col gap-y-10 justify-center items-center">
          {/* Three dots loading indicator */}
          <SyncLoader
            color={"#9b0ced"}
            loading={isLoading}
            size={65}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          {/* Typewriter effect to show 4 different texts. Gradient text */}
          <p className="bg-gradient-to-br ml-3 text-transparent bg-clip-text from-cta to-hovercta font-medium text-xl">
            <Typewriter
              words={[
                "Waking up the Quizzer !",
                "Turning on the Lights !",
                "Brewing some coffee !",
                "Suit up !",
              ]}
              loop={false}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </p>
        </div>
      )}

      {/* When server responds, allow the user to use the app */}
      {data?.data && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<Test />} />

            {/* Test Page */}
            {/* <Route path="/test" element={<Test />} /> */}

            {/* 404 error page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
