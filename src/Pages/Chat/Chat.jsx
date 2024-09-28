import { useDisclosure } from "@mantine/hooks";
import {
  ActionIcon,
  AppShell,
  Avatar,
  Burger,
  Button,
  Flex,
  Group,
  Image,
  Loader,
  Modal,
  NavLink,
  Skeleton,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import ChatArea from "./components/ChatArea";
import ChatHistory from "./components/ChatHistory";
import { IconChevronDown, IconUser } from "@tabler/icons-react";
import { IconChevronCompactDown } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { privIns } from "../../api/instances";
import { areticketsLoading, hasZenCreds, tries, user } from "../../Atoms";
import UserMenu from "./components/UserMenu";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import SupportiveLogo from "../utils/SupportiveLogo";

export default function Dashboard() {
  // STATES

  const { chatid } = useParams();

  const queryClient = useQueryClient();

  const nav = useNavigate();

  const [opened, { toggle }] = useDisclosure(false);
  const [modalOpened, modalstate] = useDisclosure(false);
  const [zenCreds, setZenCreds] = useAtom(hasZenCreds);
  const [currUser, setCurrUser] = useAtom(user);
  const [userTries, setUserTries] = useAtom(tries);
  const [chatHist, setChatHist] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [ticketsLoading, setTicketsLoading] = useAtom(areticketsLoading)

  // Track if the tickets are being refreshed
  const [ticketsRefreshing, setTicketsRefreshing] = useState(false);

  // INIT CHECKERS

  // PRE-CHECKERS

  useEffect(() => {
    const uid = localStorage.getItem("userid");

    if (uid == null) {
      nav("/login");
    }
  }, []);

  //Queries

  useEffect(() => {
    setPageLoading(true);
    privIns
      .get("/users/me")
      .then((res) => {
        const userdata = res.data;

        setCurrUser(userdata);
        setUserTries(userdata.tries);

        if (userdata.apikey == null || userdata.subdomain == null) {
          setZenCreds(false);
        } else {
          setZenCreds(true);
        }
        setTicketsLoading(userdata.is_loaded)
        setPageLoading(false);
      })
      .catch((err) => {
        localStorage.clear();
        nav("/login");
        // console.log(err);
      });
  }, []);

  useEffect(() => {
    privIns
      .get("/users/me")
      .then((res) => {
        const userdata = res.data;



        setTicketsLoading(userdata.is_loaded)

      })
      .catch((err) => {

      });
  }, [ticketsRefreshing])

  useEffect(() => {
    privIns.get("/chats/").then((res) => {
      setChatHist(res.data);
    });
  }, []);

  if (pageLoading) {
    return (
      <Flex h={"100vh"} justify={"center"} align={"center"}>
        <Loader size={"xl"} />
      </Flex>
    );
  }

  /**
   * Send a request to the backend to synchronize the users Zendesk Tickets with their Meilisearch instance. This will
   * allow the user to ensure that their knowledge base is always up to date.
   */
  const refreshTickets = () => {
    setTicketsRefreshing(true);
    privIns
      .put("/users/tickets")
      .then((res) => {
        setTicketsRefreshing(false);
      })
      .catch((err) => {
        setTicketsRefreshing(false);
      });
  };

  return (
    <>

      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Flex
            dir={"row"}
            w={"100%"}
            h="100%"
            align={"center"}
            justify={"space-between"}
            px={"md"}
          >
            <Group h="100%">
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
              />
              <SupportiveLogo size={34}/>
            </Group>
            <Flex direction={"row"} gap={16} align={"center"}>
              <Button variant={"contained"} onClick={refreshTickets}>
                {ticketsRefreshing ? (
                  <Loader size={"xs"} color={"white"} />
                ) : (
                  "Refresh Tickets"
                )}
              </Button>
              <Button variant={"outline"}>{userTries} Queries left</Button>

              <UserMenu />
            </Flex>
          </Flex>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <ChatHistory history={chatHist} activeid={chatid} />
        </AppShell.Navbar>
        <AppShell.Main>
          <ChatArea
            setUserTries={setUserTries}
            chatid={chatid}
          />
        </AppShell.Main>
      </AppShell>
    </>
  );
}
