import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Button, Form, Input, Spin } from 'antd';
import { GraphQLErrorExtensions } from 'graphql';
import { REGISTER } from '../../../graphql/mutations/Register';
import { useDispatch } from 'react-redux';
import { register } from '../../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function RegisterForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState<GraphQLErrorExtensions>({})
    const [registerUser, { loading }] = useMutation(REGISTER);

    const handleRegister = async (values: any) => {
        setErrors({});
        registerUser({
            variables: {
                username: values.username,
                email: values.email,
                password: values.password.trim(),
                confirmPassword: values.confirmPassword.trim()
            },
            onCompleted: (data) => {
                console.log(data);
                
                if (data.register.errors) {
                    setErrors(data.register.errors);
                }
                setErrors({});
                dispatch(register(data.register.user));
                navigate('/');
            }
        }).catch((err) => {
            console.log(err);
            setErrors(err.graphQLErrors);
        })
    }

    return (
        <Spin spinning={loading}>

            <Form
                name="register_form"
                onFinish={handleRegister}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Username is required',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Email is required',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Email" />
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
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Confirm password is required',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Confirm password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>

                </Form.Item>
            </Form>
        </Spin>
    )
}

export default RegisterForm
