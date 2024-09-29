import React, { useEffect } from "react";
import { privIns } from "../../api/instances";
import { useNavigate } from "react-router-dom";

export default function ChatRedirector() {
   const nav = useNavigate();

   useEffect(() => {
      privIns
         .get("/chats/")
         .then((res) => {
            if (res.data.length == 0) {
               // console.log("creating new chat");
               privIns.post("/chats", { chatname: "Welcome to supportive!" }).then((res) => {
                  nav(0);
               });
            }
            nav(`/chat/${res.data[0].id}`);
         })
         .catch((err) => {
            // console.log(err);
            // localStorage.clear();
            nav("/login");
         });
   }, []);
   return <div></div>;
}
