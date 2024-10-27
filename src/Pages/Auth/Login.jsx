import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Box,
  Flex,
  Loader,
  Alert,
  Modal,
} from "@mantine/core";
// import { GoogleButton } from "@/components/buttons/GoogleButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { pubIns } from "../../api/instances";
import bg from "../../assets/supporitve-bg.png"
import SupportiveLogo from "../utils/SupportiveLogo";
import { useAtom } from "jotai";
import { action, user } from "../../Atoms";


const REDIRECT_URI =
    import.meta.env.VITE_ENV_TYPE == "dev"
        ? import.meta.env.VITE_REDIRECT_URI_DEV
        : import.meta.env.VITE_REDIRECT_URI_PROD;
const ZENDESK_CLIENT_ID = import.meta.env.VITE_ZENDESK_CLIENT_ID;
const ZENDESK_CLIENT_SECRET = import.meta.env.VITE_ZENDESK_CLIENT_SECRET;

export default function Login(props) {
  const nav = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currUser, setCurrUser] = useAtom(user)
  const [actionState, setAction] = useAtom(action)
  const [modalOpened, setModalOpened] = useState(false);
  const [subdomain, setSubdomain] = useState("");

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      password: (val) =>
        val.length < 6
          ? "Password should include at least 6 characters!"
          : null,
      username: (val) =>
        val.length < 1 ? "Username must not be empty!" : null,
    },
  });

  // PRE-CHECKERS

  useEffect(() => {
    const uid = localStorage.getItem("userid");

    if (uid != null) {
      if(localStorage.getItem("type") == 'admin'){
        nav("/dashboard");
      }else{
        
        nav("/chat");
      }
    }
  }, []);

  //HANDLERS

  const toggle = () => {
    nav("/signup");
  };

  const handleAuth = (vals) => {
    setLoading(true);
    setError(false);
    const login = {
      username: vals.username,
      password: vals.password,
    };
    const loginStr = `username=${encodeURIComponent(vals.username)}&password=${encodeURIComponent(vals.password)}`;
    console.log(loginStr);
    pubIns
    .post("/token", loginStr)
    .then((res) => {
      setLoading(false);
      const data = res.data;
      console.log(data);
      setCurrUser(data.user)
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("userid", data.user.id);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("subdomain", data.user.subdomain);
      localStorage.setItem("type", data.user.type);
      if(data.user.type == 'admin'){
        nav("/dashboard");
      }
      else{
        nav("/chat");
      }
    })
    .catch((err) => {
        // console.log(err);
        setError(err.response.data.detail);

        setLoading(false);
      });
  };

  const handleZendeskLogin = () => {
    setAction("login");
    if (subdomain) {
      window.location.href = `https://${subdomain}.zendesk.com/oauth/authorizations/new?${new URLSearchParams({
        response_type: "code",
        redirect_uri: REDIRECT_URI,
        client_id: ZENDESK_CLIENT_ID,
        scope: "tickets:read",
      }).toString()}`;
    }
  };

  return (
    <Box
         
         h={"100vh"}
         className={"h-full w-full"}
      >
      
    <Flex pt={80} justify={"center"} >
      <Paper radius={0} p="xl" maw={600} w={500} withBorder {...props}>
        <SupportiveLogo/>
        <Button fullWidth={true} size={"lg"} color={"#17494D"} my={16} onClick={() => setModalOpened(true)}>
          Login with Zendesk
        </Button>
        <Modal
          opened={modalOpened}
          onClose={() => setModalOpened(false)}
          title="Enter your Zendesk subdomain"
        >
          <TextInput
            placeholder="Your subdomain"
            value={subdomain}
            onChange={(event) => setSubdomain(event.currentTarget.value)}
          />
          <Button onClick={handleZendeskLogin} mt="md">
            Continue
          </Button>
        </Modal>
        <Divider label="OR" size={"sm"} />
        <form
          onSubmit={form.onSubmit((vals) => {
            // console.log(vals);
            handleAuth(vals);
          })}
        >
          <Stack>
            <TextInput
              required
              size={"lg"}
              label="Username"
              radius="md"
              {...form.getInputProps("username")}
            />

            <PasswordInput
              required
              size={"lg"}
              label="Password"
              value={form.values.password}
              {...form.getInputProps("password")}
              radius="md"
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Button size={"lg"} type="submit" radius="xl" fullWidth={true}>
              {loading ? <Loader color={"white"} size={"sm"} /> : "Login"}
            </Button>
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              onClick={() => toggle()}
              size="s"
            >
              "Don't have an account? Register"
            </Anchor>
          </Group>
        </form>
        {error && (
          <Alert my={16} color={"red"} radius={"md"}>
            {error}
          </Alert>
        )}
      </Paper>
    </Flex>
    </Box>
  );
}
