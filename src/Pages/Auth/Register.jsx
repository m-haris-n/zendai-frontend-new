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
import SupportiveLogo from "../utils/SupportiveLogo";
import { action } from "../../Atoms";
import { useAtom } from "jotai";


const REDIRECT_URI =
    import.meta.env.VITE_ENV_TYPE == "dev"
        ? import.meta.env.VITE_REDIRECT_URI_DEV
        : import.meta.env.VITE_REDIRECT_URI_PROD;
const ZENDESK_CLIENT_ID = import.meta.env.VITE_ZENDESK_CLIENT_ID;
const ZENDESK_CLIENT_SECRET = import.meta.env.VITE_ZENDESK_CLIENT_SECRET;

export default function Register(props) {
   const nav = useNavigate();

   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);
   const [actionState, setAction] = useAtom(action)
   const [modalOpened, setModalOpened] = useState(false);
   const [subdomain, setSubdomain] = useState("");

   const form = useForm({
      initialValues: {
         email: "",
         username: "",
         subdomain: "",
         password: "",
         terms: false,
      },

      validate: {
         email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),

         password: (val) =>
            val.length < 6
               ? "Password should include at least 6 characters"
               : null,
         username: (val) =>
            val.length < 6
               ? "Password should include at least 6 characters"
               : null,
         terms: (val) => (val ? null : "Must agree to terms and conditions."),
      },
   });

   // PRE-CHECKERS

   useEffect(() => {
      const uid = localStorage.getItem("userid");

      if (uid != null) {
         nav("/chat");
      }
   }, []);

   //HANDLERS

   const toggle = () => {
      nav("/login");
   };

   const handleAuth = (vals) => {
      // console.log("authing");
      setLoading(true);
      setError(false);

      // console.log("register");
      const register = {
         username: vals.username,
         email: vals.email,
         password: vals.password,
         subdomain: vals.subdomain,
      };
      // console.log(register);
      pubIns
         .post("/register/", register)
         .then((res) => {
            setLoading(false);
            // console.log(res);
            // setType(() => "login");
            nav("/login");
         })
         .catch((err) => {
            // console.log(err.response.data.detail);
            setError(err.response.data.detail);
            setLoading(false);
            // console.log(err);
         });
   };

   const handleZendeskSignup = () => {
      setModalOpened(true);
   };

   const handleSubdomainSubmit = () => {
      setModalOpened(false);
      localStorage.setItem("action", "register");
      localStorage.setItem("subdomain", subdomain);
      window.location.href = `https://${subdomain}.zendesk.com/oauth/authorizations/new?${new URLSearchParams({
         response_type: "code",
         redirect_uri: REDIRECT_URI,
         client_id: ZENDESK_CLIENT_ID,
         scope: "tickets:read",
      }).toString()}`;
   };

   return (
      <Box
         h={"100vh"}
         className={"h-full w-full"}
      >
         <Flex
            pt={80}
            justify={"center"}
         >
            <Paper
               radius="md"
               p="xl"
               maw={600}
               w={500}
               withBorder
               {...props}
            >
               <SupportiveLogo size={50} />
               {/* <Button fullWidth={true} size={"lg"} color={"#17494D"} my={16} onClick={handleZendeskSignup}>
                  Sign up with Zendesk
               </Button>
               <Divider label="OR" size={"sm"} /> */}
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
                        label="Zendesk Subdomain"
                        radius="md"
                        {...form.getInputProps("subdomain")}
                     />
                     <TextInput
                        required
                        size={"lg"}
                        label="Username"
                        radius="md"
                        {...form.getInputProps("username")}
                     />

                     <TextInput
                        required
                        size={"lg"}
                        label="Email"
                        placeholder="Email"
                        {...form.getInputProps("email")}
                        radius="md"
                     />

                     <PasswordInput
                        required
                        size={"lg"}
                        label="Password"
                        value={form.values.password}
                        {...form.getInputProps("password")}
                        radius="md"
                     />
                     <Checkbox
                        size={"lg"}
                        label={<Text lh={"xl"}>I accept <Anchor href="/privacy" target="_blank" underline="always">terms and conditions</Anchor></Text>}
                        {...form.getInputProps("terms", { type: "checkbox" })}
                     />
                     <Button
                        fullWidth={true}
                        size={"lg"}
                        type="submit"
                        radius="xl"

                     >
                        {loading ? (
                           <Loader
                              color={"white"}
                              size={"sm"}
                           />
                        ) : (
                           "Register"
                        )}
                     </Button>
                  </Stack>


                  <Anchor
                     my={16}
                     component="button"
                     type="button"
                     c="dimmed"
                     size="s"
                     onClick={() => toggle()}
                  >
                     "Already have an account? Login"
                  </Anchor>

               </form>
               {error && (
                  <Alert
                     my={16}
                     color={"red"}
                     radius={"md"}
                  >
                     {error}
                  </Alert>
               )}
            </Paper>
         </Flex>
         <Modal
         centered={true}
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
            title="Enter your Zendesk subdomain"
         >
            <TextInput
               label="Subdomain"
               placeholder="Enter your Zendesk subdomain"
               value={subdomain}
               onChange={(event) => setSubdomain(event.currentTarget.value)}
            />
            <Button onClick={handleSubdomainSubmit} mt="md">
               Continue
            </Button>
         </Modal>
      </Box>
   );
}
