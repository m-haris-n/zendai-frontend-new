import {
  Anchor,
  Box,
  Button,
  Flex,
  Loader,
  NavLink,
  Paper,
  ScrollArea,
  Skeleton,
  Text,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { privIns } from "../../../api/instances";

export default function ChatHistory({ activeid }) {
  const nav = useNavigate();

  const [loading, setLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const [invalidate, setInvalidate] = useState(0);

  // console.log("loading", loading);

  useEffect(() => {
    setChatLoading(true);
    privIns.get("/chats/").then((res) => {
      setHistory(res.data);
      setChatLoading(false);
    });
  }, [invalidate]);

  const createChat = () => {
    const now = new Date();
    const formattedDate = now.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const chatName = formattedDate;
    setLoading(true);
    privIns
      .post("/chats/", { chatname: chatName })
      .then((res) => {
        setLoading(false);
        nav(`/chat/${res.data.id}`);
        setInvalidate(Math.random());
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const navlinks = history.map((chat) => (
    <NavLink
      key={chat.id}
      label={chat.chatname != null ? chat.chatname : chat.created_at}
      variant={"light"}
      className={"rounded-md"}
      active={chat.id == activeid}
      onClick={() => nav(`/chat/${chat.id}`)}
    />
  ));

  return (
    <ScrollArea mah={"calc(100vh)"} scrollbarSize={5}>
      <Flex
        h={"100%"}
        w={"100%"}
        direction={"column"}
        justify={"space-between"}
        align={"start"}
        gap={16}
        pr={16}
      >
        <Button
          onClick={() => {
            createChat();
          }}
        >
          {loading == true ? (
            <Loader size={"sm"} color={"white"} />
          ) : (
            "Create new chat"
          )}
        </Button>

        {chatLoading && (
          <>
            <Skeleton h={20} w={150} animate={true} />
            <Skeleton h={20} w={150} animate={true} />
            <Skeleton h={20} w={150} animate={true} />
          </>
        )}
        {!chatLoading && navlinks}
      </Flex>
    </ScrollArea>
  );
}
