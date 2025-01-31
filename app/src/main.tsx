import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import WellcomePage from './wellcome';
import StoryPage from './story';
import WriterPage from './write';
import RolePage from './role';
import Layout from './layout';
import '@fontsource/roboto/300.css';
import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        Component: WellcomePage,
      },
      {
        path: "/story",
        Component: StoryPage,
      },
      {
        path: "/write/:id/:name",
        Component: WriterPage,
      },
      {
        path: "/role/:id/:name/:text",
        Component: RolePage,
      },
      {
        path: "/role",
        Component: RolePage,
      },
    ],
  }
]);


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />,
);
