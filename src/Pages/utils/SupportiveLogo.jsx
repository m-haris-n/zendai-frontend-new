import { Title } from "@mantine/core";
import React from "react";

export default function SupportiveLogo({ta,size}) {
   return (
      <Title
         span
         ta={ta ? ta : "center"}
         size={size? size : 60}
         c={"grape"}
      >
         supportive
      </Title>
   );
}
