import { hasZenCreds } from "../../../Atoms";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Group,
  Loader,
  Paper,
  ScrollArea,
  Skeleton,
  Text,
  TextInput,
  Textarea,
  Title,
  rgba,
} from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import { useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDisclosure } from "@mantine/hooks";
import { privIns } from "../../../api/instances";
import { useForm } from "@mantine/form";

import MarkdownPreview from "@uiw/react-markdown-preview";
import Markdown from "react-markdown";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function ChatArea({ openCredsModal, chatid, setUserTries }) {
  const queryClient = useQueryClient();

  const [zenCreds, setZenCreds] = useAtom(hasZenCreds);

  const [waiting, setWaiting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [msgHistory, setMsgHistory] = useState([]);

  const msgForm = useForm({
    initialValues: {
      role: "user",
      content: "",
    },
  });

  const viewport = useRef();
  const scrollToBottom = () =>
    viewport.current.scrollTo({
      top: viewport.current.scrollHeight,
      behavior: "smooth",
    });

  useEffect(() => {
    scrollToBottom();
  }, [msgHistory]);

  // INIT HANDLERS

  useEffect(() => {
    setLoading(true);
    privIns
      .get(`/chats/${chatid}`)
      .then((res) => {
        setMsgHistory(res.data.messages);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
    scrollToBottom();
  }, [chatid]);

  useEffect(() => {
    console.log("Effect", msgHistory);
  }, [msgHistory, queryClient.invalidateQueries]);

  //Queries
  const sendMessage = (vals) => {
    msgForm.reset();

    setWaiting(true);
    setError(false);

    let id = 1;
    if (msgHistory.length > 0) {
      id = msgHistory[msgHistory.length - 1].id + 1;
    }

    let msgObj = { content: vals.content, id: id, role: "user" };
    console.log("msgobjarr:", [...msgHistory, msgObj]);

    setMsgHistory((msgHistory) => [...msgHistory, msgObj]);

    privIns
      .post(`/chats/${chatid}/messages`, vals)
      .then((res) => {
        setMsgHistory((msgHistory) => [...msgHistory, res.data]);
        setWaiting(false);

        // Decrement user tries counter appropiately
        setUserTries((prev) => prev - 1);
      })
      .catch((err) => {
        setWaiting(false);
        setError(true);
      });
  };

  // const msgs = useQuery("msgs", () => {
  //    privIns
  //       .get(`/chats/${chatid}`)
  //       .then((res) => {
  //          setMsgHistory(res.data.messages);
  //       })
  //       .catch((err) => {
  //          // console.log(err);
  //       });
  // });

  const msgMutation = useMutation(sendMessage, {
    onSuccess: () => {
      // queryClient.invalidateQueries("msgs");
      queryClient.invalidateQueries("curr_user");
    },
  });

  function handleKeyDown(e) {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      if (msgForm.values.content != "") {
        sendMessage(msgForm.values);
      }
    }
  }

  //DYNAMIC COMPONENTS

  // console.log(history);
  const chat = msgHistory.map((msg) => {
    // console.log("hist:", msgHistory);
    return (
      <Box
        key={msg.id}
        px={"md"}
        bg={msg.role === "user" ? "gray.2" : ""}
        className={"rounded-md"}
      >
        <Flex direction={"row"} align={"start"}>
          <Avatar
            size={48}
            m={"md"}
            color={msg.role === "user" ? "green" : "blue"}
          />
          <Paper my={"lg"} bg={rgba("ffffff", 0)}>
            {msg.role == "user" && (
              <Text lh={1} my={8}>
                {msg.content}
              </Text>
            )}
            {msg.role != "user" && (
              <Markdown className={"p-0 m-0"}>{msg.content}</Markdown>
            )}
          </Paper>
        </Flex>
      </Box>
    );
  });

  if (loading) {
    return (
      <>
        <Skeleton my={16} w={"100%"} h={40} animate={true} />
        <Skeleton my={16} w={"100%"} h={40} animate={true} />
        <Skeleton my={16} w={"100%"} h={40} animate={true} />
      </>
    );
  }

  return (
    <Flex
      direction={"column"}
      w={"100%"}
      h={"calc(100vh - 100px)"}
      justify={"space-between"}
      gap={16}
    >
      {!zenCreds && (
        <div className={"flex justify-center items-center h-full w-full "}>
          <Title order={1} ta={"center"} maw={400}>
            You can't use the app without adding your{" "}
            <Title
              component={"a"}
              className={" hover:cursor-pointer underline"}
              onClick={openCredsModal}
            >
              zendesk credentials.
            </Title>
          </Title>
        </div>
      )}
      <ScrollArea viewportRef={viewport} scrollbarSize={8} px={8}>
        {zenCreds && (
          <Paper h={"100%"} w={"100%"}>
            {chat}
            {waiting && <Loader ml={100} mt={20} type={"dots"} />}
            {error && (
              <Text
                p={16}
                mx={16}
                c={"red.9"}
                bg={"red3"}
                className={" bg-red-300 rounded-md"}
              >
                Something went wrong and we couldn't get the response. You may
                want to check if your <strong>Zendesk Credentials</strong> are
                correct. If the problem persists, contact support.
              </Text>
            )}
          </Paper>
        )}
      </ScrollArea>
      <form onSubmit={msgForm.onSubmit((vals) => msgMutation.mutate(vals))}>
        <Flex
          w={"100%"}
          direction={"row"}
          justify={"space-between"}
          align={"end"}
          columnGap={16}
        >
          <Textarea
            size={"lg"}
            w={"100%"}
            rows={1}
            maxRows={6}
            autosize
            required
            onKeyDown={handleKeyDown}
            {...msgForm.getInputProps("content")}
          />
          <Button
            type={"submit"}
            size={"lg"}
            onKeyDown={(e) => handleKeyDown(e)}
            disabled={!zenCreds}
          >
            <IconSend />
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}
