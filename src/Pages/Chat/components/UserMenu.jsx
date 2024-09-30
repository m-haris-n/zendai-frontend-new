import { Avatar, Button, Menu, Text } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import React from "react";
import { useAtom } from "jotai";
import { user } from "../../../Atoms";
import { useNavigate } from "react-router-dom";

export default function UserMenu() {
   //States

   const nav = useNavigate();
   const [currUser, setCurrUser] = useAtom(user);
   //Handlers

   const logoutHandler = () => {
      localStorage.clear();
      nav("/login");
   };

   return (
      <div>
         <Menu position={"bottom-end"}>
            <Menu.Target>
               <Button
                  variant={"transparent"}
                  rightSection={<IconChevronDown size={18} />}
               >
                  {currUser.username}
               </Button>
               
            </Menu.Target>
            <Menu.Dropdown>
               {currUser.type == 'admin' && 
               <Menu.Item onClick={()=> nav("/chat")}>Chats</Menu.Item>}
               {currUser.type == 'admin' && 
               <Menu.Item onClick={()=> nav("/dashboard")}>Dashboard</Menu.Item>}
               <Menu.Item onClick={logoutHandler}>Log out</Menu.Item>
            </Menu.Dropdown>
         </Menu>
      </div>
   );
}
