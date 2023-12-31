import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Button, Form, Input, Spin } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'

import { LOGIN } from '../../../graphql/mutations/Login';
import { setUser } from '../../../redux/userSlice';
import useErrorMessage from '../../../hooks/useErrorMessage';

function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [mutateLogin, { loading }] = useMutation(LOGIN);
    const { setErrors, context } = useErrorMessage();

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
                dispatch(setUser(data.login.user));
                navigate('/');
            },
            onError: (err) => {
                const gqlError = err.graphQLErrors[0].extensions;
                console.log(gqlError);
                
                if (gqlError?.email) {
                    setErrors(`${gqlError.email!}`);
                } else if (gqlError?.password) {
                    setErrors(`${gqlError.password!}`);
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
