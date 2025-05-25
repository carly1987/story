import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import '@fontsource/roboto/300.css';
import Layout from './layout';
import WellcomePage from './wellcome';
import ReadPage from './read';
import WriterPage from './write';
import StoryDetail from './story/detail';
import RolePage from './role';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        Component: WellcomePage,
      },
      
      // {
      //   path: "/role/:id/:name/:text",
      //   Component: RolePage,
      // },
      // {
      //   path: "/role",
      //   Component: RolePage,
      // },
    ],
  },
  {
    path: "/write/:id/:name",
    element: <Layout sub={true} />,
    children: [
      {
        index: true,
        Component: WriterPage,
      },
    ]
  },
  {
    path: "/read/:url?",
    element: <Layout sub={true} />,
    children: [
      {
        index: true,
        Component: ReadPage,
      },
    ]
  },
  {
    path: "/story/detail/:name?",
    element: <Layout sub={true} />,
    children: [
      {
        index: true,
        Component: StoryDetail,
      },
    ]
  },
  {
    path: "/role/:name",
    element: <Layout sub={true} />,
    children: [
      {
        index: true,
        Component: RolePage,
      },
    ]
  },
  {
        path: "/write/:name",
        Component: WriterPage,
      },
]);


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />,
);
