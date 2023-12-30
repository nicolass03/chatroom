import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Button, Form, Input, Spin, message } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'

import { LOGIN } from '../../../graphql/mutations/Login';
import { login } from '../../../redux/userSlice';

function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [mutateLogin, { loading }] = useMutation(LOGIN);
    const [errors, setErrors] = useState<string>();
    const [messageApi, context] = message.useMessage();

    useEffect(() => {
        if (errors) {
            console.log(errors);
            messageApi.error(`${errors}`);
        }
    }, [errors, messageApi])

    interface FormValues {
        email: string;
        password: string;
    }

    const handleLogIn = async (values: FormValues) => {
        mutateLogin({
            variables: {
                email: values.email,
                password: values.password,
            },
            onCompleted: (data) => {
                dispatch(login(data.login.user));
                navigate('/');
            },
            onError: (err) => {
                const gqlError = err.graphQLErrors[0].extensions;
                if (gqlError?.email) {
                    setErrors(`${gqlError.email!}`);
                } else if (gqlError?.password) {
                    setErrors(`${gqlError.password!}`);
                } else if (gqlError?.originalError?.message) {
                    setErrors(`${gqlError.originalError.message}`);
                }
            }
        })
    }
    return (
        <>
            {context}
            <Spin spinning={loading}>
                <Form name="login_form" onFinish={handleLogIn}>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Email is required',
                            },
                        ]}>
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
        </>
    )
}

export default LoginForm
