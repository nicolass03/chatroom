import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Form, Input, Spin } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';

import { REGISTER } from '../../../graphql/mutations/Register';
import { setUser } from '../../../redux/userSlice';
import useErrorMessage from '../../../hooks/useErrorMessage';

function RegisterForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [registerUser, { loading }] = useMutation(REGISTER);
    const { setErrors, context } = useErrorMessage();

    const handleRegister = async (values: { username: string, email: string, password: string, confirmPassword: string }) => {
        setErrors('');
        registerUser({
            variables: {
                username: values.username,
                email: values.email,
                password: values.password.trim(),
                confirmPassword: values.confirmPassword.trim()
            },
            onCompleted: (data) => {
                if (data.register.errors) {
                    setErrors(data.register.errors);
                }
                dispatch(setUser(data.register.user));
                navigate('/');
            },
            onError: (err) => {
                const gqlError = err.graphQLErrors[0].extensions;

                if (gqlError?.email) {
                    setErrors(`${gqlError.email}`);
                } else if (gqlError?.password) {
                    setErrors(`${gqlError.password}`);
                } else if (gqlError?.confirmPassword) {
                    setErrors(`${gqlError.confirmPassword}`);
                } else if (gqlError?.username) {
                    setErrors(`${gqlError.username}`);
                } else if (gqlError?.originalError?.message) {
                    setErrors(`${gqlError.originalError.message}`);
                } else if (gqlError.message) {
                    setErrors(`${gqlError.message}`);
                }
            }
        })
    }

    return (
        <>
            {context}
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
        </>
    )
}

export default RegisterForm
