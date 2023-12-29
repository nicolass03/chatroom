import { Card, Flex, Tabs } from "antd"
import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

const flexStyle: React.CSSProperties = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0
};

const tabSyle: React.CSSProperties = {
    width: '100%',
};

function Login() {

    const formTypes = ['login', 'register'];

    const [formType, setFormType] = useState(formTypes[0]);

    const tabItems = [
        {
            label: 'Login',
            key: 'login',
            children: <LoginForm />
        },
        {
            label: 'Register',
            key: 'register',
            children: <RegisterForm />
        }
    ]

    return (
        <Flex style={flexStyle}>
        <Card>
            <h2>Chatroom App</h2>
            <Tabs centered tabBarStyle={tabSyle} defaultActiveKey={formType} onChange={(key) => setFormType(key)} items={tabItems}>
            </Tabs>
        </Card>
        </Flex>
    )
}

export default Login
