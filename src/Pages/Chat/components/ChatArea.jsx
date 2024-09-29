import { areticketsLoading, hasZenCreds, tries, user } from "../../../Atoms";
import {
  Avatar,
  Box,
  Button,
  Divider,
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
import { IconMessageChatbot, IconRobot, IconRobotFace, IconSend } from "@tabler/icons-react";
import { useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDisclosure } from "@mantine/hooks";
import { privIns } from "../../../api/instances";
import { useForm } from "@mantine/form";

import MarkdownPreview from "@uiw/react-markdown-preview";
import Markdown from "react-markdown";
import { useMutation, useQuery, useQueryClient } from "react-query";

const REDIRECT_URI =
  import.meta.env.VITE_ENV_TYPE == "dev"
    ? import.meta.env.VITE_REDIRECT_URI_DEV
    : import.meta.env.VITE_REDIRECT_URI_PROD;
const ZENDESK_CLIENT_ID = import.meta.env.VITE_ZENDESK_CLIENT_ID;


export default function ChatArea({ chatid, setUserTries }) {
  const queryClient = useQueryClient();
  const [zenCreds, setZenCreds] = useAtom(hasZenCreds);
  const [remTries, setRemTries] = useAtom(tries)
  const [ticketsLoading, setTicketsLoading] = useAtom(areticketsLoading)
  // const [ticketsLoading, setTicketsLoading] = useState(true)
  const [waiting, setWaiting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const username = localStorage.getItem("username")
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
        // console.log(err);
      });
    scrollToBottom();
  }, [chatid]);

  useEffect(() => {
    // console.log("Effect", msgHistory);
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
    // console.log("msgobjarr:", [...msgHistory, msgObj]);

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
      <>
    <Box
      key={msg.id}
      px={"md"}
      className={"rounded-md"}
      
    >
      <Flex direction={"row"} align={"start"}>
        <Avatar
        variant={'filled'}
          size={48}
          radius={'lg'}
          m={"md"}
          color={msg.role == "user" ? 'blue' : 'grape'}
        >
          
        {msg.role == 'user'? username[0] : 
        <IconMessageChatbot  />
        }
        </Avatar>
         
        <Paper my={"lg"} >
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
    <Divider/>
      </>
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
          <Button
            size={"lg"}
            color={"#17494D"}
            radius={0}
            onClick={() => {
              window.location.href = `https://${localStorage.getItem(
                "subdomain"
              )}.zendesk.com/oauth/authorizations/new?${new URLSearchParams(
                {
                  response_type: "code",
                  redirect_uri: REDIRECT_URI,
                  client_id: ZENDESK_CLIENT_ID,
                  scope: "tickets:read",
                }
              ).toString()}`;
            }}
          >
            Connect with Zendesk
          </Button>
        </div>
      )}
      {ticketsLoading && (
        <div className={"flex justify-center items-center h-full w-1/2 mx-auto "}>
          <Text size={"xl"} ta={'center'} >
          We are feeding your tickets to our AI so that it can give you good answers. It will take a minute, try reloading after a few minutes
          </Text>
        </div>
      )}
      <ScrollArea viewportRef={viewport} scrollbarSize={8} px={8}>
        {(zenCreds & !ticketsLoading) ? (
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
        ) : <></>}
      </ScrollArea>
      <form onSubmit={msgForm.onSubmit((vals) => msgMutation.mutate(vals))}>
      <Divider mb={16}/>
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
            disabled={(!zenCreds) || (remTries == 0)}
          >
            <IconSend />
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}
