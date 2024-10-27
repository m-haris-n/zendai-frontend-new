import { Title } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function SupportiveLogo({ta,size}) {
   const nav = useNavigate()
    return (
      <Title
        className={"hover:cursor-pointer"}
         ta={ta ? ta : "center"}
         size={size? size : 40}
         onClick={()=> nav("/")}
      >
         supportive
      </Title>
   );
}
