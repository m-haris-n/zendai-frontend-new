import { Title } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function SupportiveLogo({ta,size}) {
   const nav = useNavigate()
    return (
      <Title
        className={"hover:cursor-pointer"}
         span
         ta={ta ? ta : "center"}
         size={size? size : 60}
         c={"grape"}
         onClick={()=> nav("/")}
      >
         supportive
      </Title>
   );
}
