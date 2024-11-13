import {
    Button,
    Card,
    Container,
    Divider,
    Grid,
    Group,
    Image,
    List,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import MainHeader from "./components/MainHeader";
import { IconCheck, IconCircleCheck } from "@tabler/icons-react";

export default function Pricing() {
    return (
        <>
            <MainHeader />
            <Container
                size="lg"
                mih={"calc(100vh - 70px)"}
                display={"flex"}
                justify={"center"}
            >
                <Stack justify={"center"} align={"center"} h={"100%"}>
                    <Title order={1} align={"center"} mt={"xl"}>
                        Pricing Plans
                    </Title>
                    <Grid
                        justify={"center"}
                        w={"100%"}
                        h={"100%"}
                        align={"center"}
                    >
                        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                            <Card
                                p={"xl"}
                                shadow={"sm"}
                                h={"450px"}
                                className={"flex flex-col justify-between"}
                            >
                                <div>
                                    <Title order={2}>Free Plan</Title>
                                    <Divider
                                        my={"lg"}
                                        w={"100px"}
                                        size={"md"}
                                    />
                                    <Text variant={"text"} size={"lg"} fw={600}>
                                        What you pay
                                    </Text>
                                    <List icon={<IconCheck size={16} />}>
                                        <List.Item>$0</List.Item>
                                    </List>
                                    <Text
                                        variant={"text"}
                                        size={"lg"}
                                        fw={600}
                                        mt={"sm"}
                                    >
                                        What you get
                                    </Text>
                                    <List icon={<IconCheck size={16} />}>
                                        <List.Item>10 queries</List.Item>
                                        <List.Item>
                                            No credit card required
                                        </List.Item>
                                    </List>
                                    <Text
                                        mt={"lg"}
                                        size={"sm"}
                                        align={"justify"}
                                    >
                                        Get 10 free credits to test our
                                        AI-powered analytics, with no credit
                                        card required. Ideal for small teams or
                                        businesses who want to explore our
                                        features risk-free.
                                    </Text>
                                </div>
                                <Button
                                    mt={"lg"}
                                    size={"md"}
                                    radius={"xl"}
                                    onClick={() => navigate("/signup")}
                                >
                                    Get started
                                </Button>
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                            <Card
                                p={"xl"}
                                shadow={"sm"}
                                h={"450px"}
                                className={"flex flex-col justify-between"}
                            >
                                <div>
                                    <Title order={2}>Growth Plan</Title>
                                    <Divider
                                        my={"lg"}
                                        w={"100px"}
                                        size={"md"}
                                    />
                                    <Text variant={"text"} size={"lg"} fw={600}>
                                        What you pay
                                    </Text>
                                    <List icon={<IconCheck size={16} />}>
                                        <List.Item>$499 per month</List.Item>
                                    </List>
                                    <Text
                                        variant={"text"}
                                        size={"lg"}
                                        fw={600}
                                        mt={"sm"}
                                    >
                                        What you get
                                    </Text>
                                    <List icon={<IconCheck size={16} />}>
                                        <List.Item>
                                            400 queries per month
                                        </List.Item>
                                        <List.Item>
                                            $99 for every 100 extra queries
                                        </List.Item>
                                    </List>
                                    <Text
                                        mt={"lg"}
                                        size={"sm"}
                                        align={"justify"}
                                    >
                                        Perfect for growing businesses that need
                                        more insights without breaking the bank.
                                        Easily scale with affordable add-ons as
                                        your needs increase.
                                    </Text>
                                </div>

                                <Button
                                    size={"md"}
                                    radius={"xl"}
                                    variant={"outline"}
                                >
                                    Contact Sales
                                </Button>
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                            <Card
                                p={"xl"}
                                shadow={"sm"}
                                h={"450px"}
                                className={"flex flex-col justify-between"}
                            >
                                <div>
                                    <Title order={2}>Unlimited Plan</Title>
                                    <Divider
                                        my={"lg"}
                                        w={"100px"}
                                        size={"md"}
                                    />
                                    <Text variant={"text"} size={"lg"} fw={600}>
                                        What you pay
                                    </Text>
                                    <List icon={<IconCheck size={16} />}>
                                        <List.Item>$999 per month</List.Item>
                                    </List>
                                    <Text
                                        variant={"text"}
                                        size={"lg"}
                                        fw={600}
                                        mt={"sm"}
                                    >
                                        What you get
                                    </Text>
                                    <List icon={<IconCheck size={16} />}>
                                        <List.Item>Unlimited queries</List.Item>
                                    </List>
                                    <br />
                                    <Text
                                        mt={"lg"}
                                        size={"sm"}
                                        align={"justify"}
                                    >
                                        Perfect for high-volume businesses that
                                        rely on consistent and in-depth customer
                                        support analytics. No limits, no
                                        worries. Enjoy unlimited access to our
                                        powerful AI analytics engine
                                    </Text>
                                </div>
                                <Button
                                    mt={"lg"}
                                    size={"md"}
                                    radius={"xl"}
                                    variant={"outline"}
                                >
                                    Contact Sales
                                </Button>
                            </Card>
                        </Grid.Col>
                    </Grid>
                </Stack>
            </Container>
        </>
    );
}
