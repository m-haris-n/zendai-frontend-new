import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Chat from "./Pages/Chat/Chat";
import "./index.css";
import "@mantine/core/styles.css";
import { QueryClient, QueryClientProvider } from "react-query";
import ChatRedirector from "./Pages/Chat/ChatRedirector";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import CallBack from "./Pages/Auth/CallBack";
import Dashboard from "./Pages/Admin/Dashboard";
import { privIns } from "./api/instances";
import { useAtom } from "jotai";
import { user } from "./Atoms";
import { useEffect } from "react";
import NotFound from "./Pages/NotFound";
import { HomeNew } from "./Pages/HomeNew/HomeNew";
import Pricing from "./Pages/HomeNew/Pricing";
import Privacy from "./Pages/HomeNew/Privacy";

const queryClient = new QueryClient();

const router = createBrowserRouter([
   
   {
      path: "/",
      element: <HomeNew />,
   },
   {
      path: "/pricing",
      element: <Pricing/>
   },
   {
      path: "/privacy",
      element: <Privacy/>
   },
   {
      path: "/chat",
      element: <ChatRedirector />,
   },
   {
      path: "/chat/:chatid",
      element: <Chat />,
   },
   {
      path: "/login",
      element: <Login />,
   },
   {
      path: "/signup",
      element: <Register />,
   },
   {
      path: "/zendesk/oauth/callback",
      element: <CallBack/>
   },
   {
      path: "/dashboard",
      element: <Dashboard/>
   },
   {
      path: "*",
      element: <NotFound/>
   },
]);

export function Router() {
   const [currUser, setCurrUser] = useAtom(user)
   useEffect(()=> {
      
      // privIns.get('/users/me').then(res => {
      //    setCurrUser(res.data)
      // }).catch(err => {
        
      // })
   }, [])
   
   return (
      <QueryClientProvider client={queryClient}>
         <RouterProvider router={router} />
      </QueryClientProvider>
   );
}
