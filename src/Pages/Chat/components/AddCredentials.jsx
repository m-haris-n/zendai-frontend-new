import { Button, Loader, Modal, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { privIns } from "../../../api/instances";
import { useNavigate } from "react-router-dom";

export default function AddCredentials({ modalOpened, modalstate }) {
  //STATES

  const nav = useNavigate();

  const [addCredLoad, setAddCredLoad] = useState(false);
  const [addCredErr, setAddCredErr] = useState(false);

  const credsForm = useForm({
    initialValues: {
      apikey: "",
      subdomain: "",
    },
    validate: {
      apikey: (val) => (val.length == 0 ? "Please enter API key" : null),
      subdomain: (val) => (val.length == 0 ? "Please enter Subdomain" : null),
    },
  });

  // Request Handlers

  const addCredsToUser = (vals) => {
    setAddCredErr(false);
    setAddCredLoad(true);
    // console.log(vals);

    const body = {
      subdomain: vals.subdomain,
      apikey: vals.apikey,
    };
    privIns
      .patch("/users/me", body)
      .then((res) => {
        // console.log(res);
        setAddCredLoad(false);
        nav(0);
      })
      .catch((err) => {
        // console.log(err);
        setAddCredLoad(false);
        setAddCredErr(true);
      });
  };

  return (
    <Modal
      opened={modalOpened}
      withCloseButton={false}
      radius={"md"}
      onClose={modalstate.close}
    >
      <Modal.Header>
        <Title order={3}>Add your Zendesk credentials</Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={credsForm.onSubmit((vals) => {
            addCredsToUser(vals);
          })}
        >
          <Text>
            You can't proceed without adding your Zendesk Credentials!
          </Text>
          <TextInput
            label={"Zendesk Subdomain"}
            description={'Your subdomain (without ".zendesk.com")'}
            my={"sm"}
            withAsterisk
            {...credsForm.getInputProps("subdomain")}
          />
          <TextInput
            label={"Zendesk API Key"}
            description={
              "API key that you generated from the Zendesk Admin Center"
            }
            my={"sm"}
            withAsterisk
            {...credsForm.getInputProps("apikey")}
          />
          <Button fullWidth={true} my={"md"} type={"submit"}>
            {addCredLoad === true ? (
              <>
                <p>Fetching Zendesk Tickets </p>
                <Loader
                  size={"sm"}
                  color={"white"}
                  // TODO: This was a temp style added by @jmoffatt32
                  // ------------------------------------------------
                  // This should likely be fixed to use the proper Mantine style
                  // utilized by the project.
                  style={{ marginInline: "1rem" }}
                />
              </>
            ) : (
              "Save"
            )}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
