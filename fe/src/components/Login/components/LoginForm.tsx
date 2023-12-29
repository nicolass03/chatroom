/* eslint-disable @typescript-eslint/no-unused-vars */
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Form, Input, Spin } from 'antd'
import { LOGIN } from '../../../graphql/mutations/Login';
import { useMutation } from '@apollo/client';
// import { GraphQLErrorExtensions } from 'graphql';
// import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [mutateLogin, { loading, error }] = useMutation(LOGIN);

    const handleLogIn = async (values: any) => {
        mutateLogin({
            variables: {
                email: values.email,
                password: values.password,
            },
            onCompleted: (data) => {
                // if (data.login.errors) {
                // }
                dispatch(login(data.login.user));
                navigate('/');
            },
            onError: (err) => {
                console.log(err);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <Spin spinning={loading}>
            <Form
                name="login_form"
                onFinish={handleLogIn}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Email is required',
                        },
                    ]}
                >
                    <Input prefix={<MailOutlined />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Password is required',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit">
                        Log in
                    </Button>

                </Form.Item>
            </Form>
        </Spin>
    )
}

export default LoginForm
