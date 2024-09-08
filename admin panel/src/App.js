import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import "./input.css";
import NotFoundPage from "./pages/404Page";
import Info from "./pages/Info";
import Login, { action as LoginAction } from "./pages/Login";
import Root, { loader as loadingAction } from "./pages/Root";
import Users from "./pages/Users";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Home></Home>,
  // },
  {
    path: "/",
    element: <Login></Login>,
    action: LoginAction,
  },
  {
    path: "home",
    element: <Root></Root>,
    loader: loadingAction,
    children: [
      {
        path: "dashboard",
        element: <Info></Info>,
      },
      {
        path: "users",
        element: <Users></Users>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage></NotFoundPage>,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
