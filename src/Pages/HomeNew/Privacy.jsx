import { Anchor, Container, List, Stack, Text, Title } from "@mantine/core";
import MainHeader from "./components/MainHeader";

export default function Privacy() {
    return (
        <>
            <MainHeader />
            <Container
                size="lg"
                
                display={"flex"}
                justify={"center"}
            >
                <Stack justify={"center"} align={"center"} h={"100%"}>
                    <Title order={1} align={"center"} mt={"xl"}>
                        Privacy Policy
                    </Title>
                    <Text align="justify">
                        At Supportive, we understand the importance of your
                        privacy and are committed to protecting the data you
                        share with us. This Privacy Policy outlines how we
                        collect, use, and safeguard the information associated
                        with our AI-powered analytics services for customer
                        support tickets, specifically through Zendesk.

                        <br />
                        <br />
                        <Title order={3}>1. Data We Collect</Title>
                        At Supportive, protecting your data is our top priority.
                        We only collect the minimum amount of information
                        necessary to provide our services, and we take extensive
                        precautions to ensure that this data remains secure.
                        <br />
                        <strong>Zendesk Tickets:</strong>{" "}
                        When you use our service, we securely collect customer
                        support tickets from your Zendesk instance. These
                        tickets are carefully handled and transformed into a
                        safe, anonymized format that can be processed by our
                        generative AI system. The transformed data is stored
                        securely in our dedicated database, where we apply
                        industry-standard encryption and strict access controls
                        to safeguard it at all times.
                        <br />
                        <strong>Personal Information:</strong>{" "}
                        If you sign up using Zendesk, we also collect your email
                        address and name solely to create and manage your
                        account with us. We protect this information using
                        strong encryption, ensuring that your personal details
                        remain confidential and are never shared with
                        unauthorized parties.
                        <br />
                        <br />
                        <Title order={3}>2. How We Use Your Data</Title>

                        We use the data we collect to:

                        <List>
                            <List.Item>
                                Provide AI-powered analytics and insights based
                                on the customer support tickets from your
                                Zendesk instance.
                            </List.Item>
                            <List.Item>
                                Convert ticket data into a format that is
                                processed by our generative AI instance for
                                enhanced analytics.
                            </List.Item>
                            <List.Item>
                                Store the transformed data in our special
                                database to ensure efficient and reliable
                                analytics services.
                            </List.Item>
                            <List.Item>
                                Maintain your account and enable smooth access to
                                our services.
                            </List.Item>
                        </List>
                        <br />
                        <Title order={3}>3. Data Storage</Title>

                        All customer support tickets and personal data (email
                        and name) are securely stored in our dedicated database,
                        hosted on Amazon Web Services (AWS), a secure cloud
                        infrastructure provider. AWS is widely recognized for
                        its high-security standards and compliance with global
                        data protection regulations.
                        <br />
                        Transformed ticket data is stored securely in a special
                        database after it has been processed by our generative
                        AI system.
                        <br />
                        We do not store any sensitive information beyond the
                        data needed to provide our services.
                        <br />
                        <br />
                        <Title order={3}>4. Data Security</Title>

                        We take data security very seriously and implement the
                        following safeguards:
                            
                        <List>
                            <List.Item>
                                <b>Encryption:</b> Data is encrypted both at rest and in
                                transit to prevent unauthorized access.
                            </List.Item>
                            <List.Item>
                                <b>Access Control:</b> Only authorized personnel have access to
                                your data, and we follow strict protocols to ensure the
                                security of that access.
                            </List.Item>
                            <List.Item>
                                <b>Monitoring:</b> We continuously monitor our systems for any
                                suspicious activity and perform regular security checks
                                to maintain the integrity of our services.
                            </List.Item>
                        </List>
                        <br />
                        <Title order={3}>5. Data Retention</Title>

                        We retain your data only for as long as necessary to
                        provide our services. If you decide to terminate your
                        use of our service, we will delete your data from our
                        systems upon request, except where we are required to
                        retain it by law.
                        <br />
                        <br />
                        <Title order={3}>6. Third-Party Access</Title>

                        We do not sell, rent, or share your data with third
                        parties for their marketing purposes. We may only share
                        data with trusted service providers (such as AWS) who
                        assist in delivering our services, and these providers
                        are bound by strict data protection agreements.
                        <br />
                        <br />
                        <Title order={3}>7. Your Rights</Title>

                        You have the right to:

                        <List>
                            <List.Item>
                                Access the data we hold about you.
                            </List.Item>
                            <List.Item>
                                Request corrections to any inaccuracies.
                            </List.Item>
                            <List.Item>
                                Request the deletion of your data at any time.
                            </List.Item>
                        </List>

                        If you have any concerns or questions about how we handle your data, please contact us at{" "}
                        <Anchor href="mailto:alvi@getsupportiveapp.com" c={"blue"}>
                            alvi@getsupportiveapp.com
                        </Anchor>
                        <br />
                        <br />
                        <Title order={3}>8. Changes to this Policy</Title>

                        We may update this Privacy Policy from time to time. We
                        will notify you of any significant changes by posting
                        the revised policy on our website. Please review the
                        policy periodically to stay informed about how we
                        protect your data.
                        <br />
                        <br />
                        <Title order={3}>9. Contact Us</Title>

                        If you have any questions or concerns about this Privacy
                        Policy or your data, please reach out to us at{" "}
                        <Anchor href="mailto:alvi@getsupportiveapp.com" c={"blue"}>
                            alvi@getsupportiveapp.com
                        </Anchor>
                        <br />
                        By using our service, you agree to the terms of this
                        Privacy Policy.
                    </Text>
                    <br />
                    <br />
                </Stack>
            </Container>
        </>
    );
}
