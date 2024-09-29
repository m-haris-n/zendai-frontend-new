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
} from "@mantine/core";
// import { GoogleButton } from "@/components/buttons/GoogleButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { pubIns } from "../../api/instances";
import bg from "../../assets/supporitve-bg.png"
import SupportiveLogo from "../utils/SupportiveLogo";
import { useAtom } from "jotai";
import { user } from "../../Atoms";

export default function Login(props) {
  const nav = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currUser, setCurrUser] = useAtom(user)

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
    nav("/register");
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

  return (
    <Box
         
         style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
         }}
         h={"100vh"}
         className={"h-full w-full"}
      >
      
    <Flex pt={80} justify={"center"} >
      <Paper radius={0} p="xl" maw={600} w={500} withBorder {...props}>
        <SupportiveLogo/>

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
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              onClick={() => toggle()}
              size="s"
            >
              "Don't have an account? Register"
            </Anchor>
            <Button size={"lg"} type="submit" radius="xl" w={150}>
              {loading ? <Loader color={"white"} size={"sm"} /> : "Login"}
            </Button>
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
