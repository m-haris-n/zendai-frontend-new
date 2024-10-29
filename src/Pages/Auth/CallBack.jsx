import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { privIns, pubIns } from "../../api/instances";
import { Flex, Loader } from "@mantine/core";
import { useAtom } from "jotai";
import { action } from "../../Atoms";

const CallBack = () => {
    const loc = useLocation();
    const nav = useNavigate();
    const actionState = localStorage.getItem("action");

    useEffect(() => {
        async function callbackProcess() {
            const params = new URLSearchParams(loc.search);
            const authorizationCode = params.get("code");
            const subdomain = localStorage.getItem("subdomain");
            const caller = actionState === "register" || actionState === "login" ? privIns : pubIns;

            if (authorizationCode && authorizationCode.length > 0) {
                try {
                    const res = await caller.put("/zendesk/oauth/callback", {
                        code: authorizationCode,
                        subdomain: subdomain,
                        action: actionState
                    });

                    console.log("Callback response:", res);
                    localStorage.setItem("action", "fetch");
                    if (actionState === "register" || actionState === "login") {
                        localStorage.setItem("token", res.data.access_token);
                        localStorage.setItem("userid", res.data.user.id);
                        localStorage.setItem("username", res.data.user.username);
                        localStorage.setItem("subdomain", res.data.user.subdomain);
                        localStorage.setItem("type", res.data.user.type);
                    }
                    nav("/chat");
                } catch (err) {
                    console.error("Error during callback process:", err);
                    nav("/");
                }
            } else {
                console.error("No authorization code found");
                nav("/");
            }
        }

        callbackProcess();
    }, [loc, nav, actionState]);

    return (
        <Flex
            direction="column"
            w="100%"
            h="90vh"
            justify="center"
            align="center"
        >
            <Loader />
            <p>Please wait...</p>
        </Flex>
    );
};

export default CallBack;
