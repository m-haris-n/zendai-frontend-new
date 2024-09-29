import React, { useEffect, useState } from "react";
import { privIns } from "../../api/instances";
import { useNavigate } from "react-router-dom";
import {
   AppShell,
   Box,
   Button,
   Flex,
   Loader,
   NumberInput,
   Table,
} from "@mantine/core";
import SupportiveLogo from "../utils/SupportiveLogo";
import UserMenu from "../Chat/components/UserMenu";
import { IconPlus } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import AddCreditsForm from "./AddCreditsForm";

export default function Dashboard() {
   
   const [loading, setLoading] = useState(true);
   const [invalidate, setInvalidate] = useState(true);
   const [allUsers, setAllUsers] = useState(null);
   

   const head = ["Username", "EmailID", "Credits Left", "Add credits"];

   
   const nav = useNavigate();
   useEffect(() => {
    if(invalidate){
        
        setLoading(true);
        privIns
           .get("/users/me")
           .then((res) => {
              const type = res.data.type;
              if (type != "admin") {
                 nav("/chat");
              } else {
                 privIns.get("/users/all").then((res) => {
                    
                    setAllUsers(
                       res.data.message.sort((a,b)=> a.id > b.id).map((usr, index) => {
                          return [
                             usr.username,
                             usr.email,
                             usr.tries,
                             <AddCreditsForm userid={usr.id} setInvalidate={setInvalidate}/>
                          ];
                       })
                    );
                 });
              }
           })
           .catch((err) => {
              nav("/chat");
           })
           .finally(() => {
              setLoading(false);
           });
           setInvalidate(false)
    }
        
   }, [invalidate]);

   if (loading) {
      return (
         <Flex
            h={"100vh"}
            justify={"center"}
            align={"center"}
         >
            <Loader size={"xl"} />
         </Flex>
      );
   }

   return (
      <AppShell
         p={16}
         header={{ height: "80px" }}
      >
         <AppShell.Header>
            <Flex
               direction={"row"}
               justify={"space-between"}
               align={"center"}
               px={16}
               py={16}
            >
               <SupportiveLogo size={40} />
               <UserMenu />
            </Flex>
         </AppShell.Header>
         <AppShell.Main>
            <Table data={{ head: head, body: allUsers && allUsers }} />
         </AppShell.Main>
      </AppShell>
   );
}
