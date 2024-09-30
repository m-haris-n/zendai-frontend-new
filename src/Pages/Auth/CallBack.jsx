import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { privIns } from "../../api/instances";
import axios from "axios";
import { Flex, Loader } from "@mantine/core";

const REDIRECT_URI =
    import.meta.env.VITE_ENV_TYPE == "dev"
        ? import.meta.env.VITE_REDIRECT_URI_DEV
        : import.meta.env.VITE_REDIRECT_URI_PROD;
const ZENDESK_CLIENT_ID = import.meta.env.VITE_ZENDESK_CLIENT_ID;
const ZENDESK_CLIENT_SECRET = import.meta.env.VITE_ZENDESK_CLIENT_SECRET;


const CallBack = () => {
    const loc = useLocation();
    const nav = useNavigate();

    useEffect(() => {
        async function callbackProcess() {
            // Extract query parameters from the URL
            const params = new URLSearchParams(loc.search);
            const authorizationCode = params.get("code"); // Get the "code" parameter from Zendesk
            const subdomain = localStorage.getItem("subdomain");
            if (authorizationCode) {
                // Handle the authorization code, e.g., send it to your server
                // console.log("Authorization Code: ", authorizationCode);

                // Perform actions with the authorization code (e.g., exchanging it for tokens)
                try {

                    const res = await privIns.put("/zendesk/oauth/callback", {
                        code: authorizationCode,
                    });
                    
                    // console.log("callback response:",res.data)
                    
                    nav("/chat");
                }
                catch (err) {
                    nav("/");
                    // console.log(err);
                }
            }
        }

        callbackProcess();
    }, [loc]);

    return (
        <Flex
            direction={"column"}
            w={"100%"}
            h={"90vh"}
            justify={"center"}
            align={"center"}
        >
            <Loader />
            Please wait...
        </Flex>
    );
};

export default CallBack;
