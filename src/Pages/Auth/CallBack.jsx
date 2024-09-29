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

const requestWithForm = (authorizationCode, subdomain) => {
    // Create a form element
    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", `https://${subdomain}.zendesk.com/oauth/tokens`);

    // Create hidden input fields for each parameter in the request

    // client_id
    var clientIdInput = document.createElement("input");
    clientIdInput.setAttribute("type", "hidden");
    clientIdInput.setAttribute("name", "client_id");
    clientIdInput.setAttribute("value", ZENDESK_CLIENT_ID); // Replace with your actual client ID
    form.appendChild(clientIdInput);

    // client_secret
    var clientSecretInput = document.createElement("input");
    clientSecretInput.setAttribute("type", "hidden");
    clientSecretInput.setAttribute("name", "client_secret");
    clientSecretInput.setAttribute("value", ZENDESK_CLIENT_SECRET); // Replace with your actual client secret
    form.appendChild(clientSecretInput);

    // grant_type
    var grantTypeInput = document.createElement("input");
    grantTypeInput.setAttribute("type", "hidden");
    grantTypeInput.setAttribute("name", "grant_type");
    grantTypeInput.setAttribute("value", "authorization_code");
    form.appendChild(grantTypeInput);

    // code (authorization code)
    var codeInput = document.createElement("input");
    codeInput.setAttribute("type", "hidden");
    codeInput.setAttribute("name", "code");
    codeInput.setAttribute("value", authorizationCode); // The authorization code obtained from Zendesk
    form.appendChild(codeInput);

    // redirect_uri
    var redirectUriInput = document.createElement("input");
    redirectUriInput.setAttribute("type", "hidden");
    redirectUriInput.setAttribute("name", "redirect_uri");
    redirectUriInput.setAttribute("value", REDIRECT_URI); // Your app's redirect URI
    form.appendChild(redirectUriInput);

    // scope (if needed)
    var scopeInput = document.createElement("input");
    scopeInput.setAttribute("type", "hidden");
    scopeInput.setAttribute("name", "scope");
    scopeInput.setAttribute("value", "tickets:read");
    form.appendChild(scopeInput);

    // Append the form to the document body and submit it
    document.body.appendChild(form);
    form.submit();
};

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
