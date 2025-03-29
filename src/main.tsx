import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store.ts";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import { AuthLayout } from "./components/index.ts";
import Signup from "./pages/Signup.tsx";
import AddPost from "./pages/AddPost.tsx";
import EditPost from "./pages/EditPost.tsx";
import Post from "./pages/Post.tsx";
import AllPosts from "./pages/AllPosts.tsx";
import Login from "./pages/Login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },{
        path: "/all-posts",
        element: (
            <AuthLayout authentication>
                {" "}
                <AllPosts/>
            </AuthLayout>
        ),
    },
      {
        path: "/all-post",
        element: (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
