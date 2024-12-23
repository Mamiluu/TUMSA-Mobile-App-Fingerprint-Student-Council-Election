import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Dashboard from "./pages/dashboard";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2C7337",
  },
};

const xtheme = extendTheme({ colors });

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

function App() {
  return (
    <ChakraProvider theme={xtheme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
