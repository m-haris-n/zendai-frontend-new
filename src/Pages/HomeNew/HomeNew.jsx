import { Image, Container, Title, Button, Group, Text, List, ThemeIcon, rem, Box } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import classes from "./HomeNew.module.css"
import MainHeader from './components/MainHeader';
import { useNavigate } from 'react-router-dom';
import homeImage from "/Asset 9.png";

export function HomeNew() {

  const navigate = useNavigate();

  return (
    <>
      <MainHeader />
      <Container size="lg" h={"calc(100vh - 70px)"} display={"flex"} direction={"column"} justify={"center"}  >
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              <span className={classes.highlight}>AI-Powered</span> Support Ticket Analysis for Zendesk
            </Title>
            <Text mt="md" size={"lg"}>
              Supportive lets you chat with your Zendesk ticket data. Just type what you need and it'll parse the ticket data and get you the answer. That simple. No complex Zendesk reporting required.
            </Text>
            <Group mt={30}>
              <Button radius="xl" size="md" className={classes.control} onClick={() => navigate("/signup")}>
                Get started
              </Button>
              <Button variant="default" radius="xl" size="md" className={classes.control} onClick={() => navigate("/login")}>
                Log in
              </Button>
            </Group>
          </div>
          <Box className={""}>
            <Image src={homeImage} />
          </Box>
        </div>
      </Container>
    </>
  );
}