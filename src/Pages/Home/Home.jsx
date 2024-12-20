import React from "react";
import { Title, Text, Button, Container, Box } from "@mantine/core";

import classes from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import SupportiveLogo from "../utils/SupportiveLogo";
export default function Home() {
   const nav = useNavigate();

   return (
      <Box  className={'h-full w-full'}>

         <Container
            className={classes.wrapper}
            size={1400}
            h={"100vh"}
            style={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center",

            }}
         >


            <div className={classes.inner}>
               <SupportiveLogo />
               <Title className={classes.title} ta={'center'}>
                  Supercharge your Zendesk Support
               </Title>

               <Container
                  
                  size={600}
               >
                  <Text
                     size="lg"
                     className={classes.description}
                     my={4}
                  >
                     Stop wrangling with Zendesk Explore to get basic data, just
                     type what you need and let supportive do the work.
                  </Text>
               </Container>

               <div className={'flex flex-row gap-x-4 justify-center align-middle my-4'}>
                  <Button
                     radius={0}
                     size={"lg"}
                     onClick={() => nav("/register")}
                  >
                     Register
                  </Button>
                  <Button
                     radius={0}
                     size={"lg"}
                     variant={"white"}
                     onClick={() => nav("/login")}
                  >
                     Login
                  </Button>
               </div>
            </div>
         </Container>
      </Box>

   );
}
