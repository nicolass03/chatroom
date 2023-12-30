import { useMutation } from '@apollo/client'
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Button, Form, Input, Spin, message } from 'antd'

import { CREATE_CHATROOM } from '../../graphql/mutations/CreateChatroom'
import { setActiveChatroom } from '../../redux/chatroomSlice';

function AddChatroom() {

    const dispatch = useDispatch();
    const [createChatroom, { loading }] = useMutation(CREATE_CHATROOM);
    const [errors, setErrors] = useState<string>();
    const [messageApi, context] = message.useMessage();

    useEffect(() => {
        if (errors) {
            console.log(errors);
            messageApi.error(`${errors}`);
        }
    }, [errors, messageApi])

    const handleCreateChatroom = async (values: { chatroom_name_form: string }) => {
        createChatroom({
            variables: {
                name: values.chatroom_name_form
            },
            onCompleted: (data) => {
                dispatch(setActiveChatroom(parseInt(data.createChatroom.id)))
            },
            onError: (err) => {
                const gqlError = err.graphQLErrors[0].extensions;
                console.log(gqlError);
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
                }
            },
            refetchQueries: ['GetUserChatrooms']
        })
    }

    return (
        <>
        {context}
            <Spin spinning={loading}>
                <Form
                    layout='vertical'
                    name="create_chatroom_form"
                    initialValues={{ remember: true }}
                    onFinish={handleCreateChatroom}>
                    <Form.Item
                        label="Chatroom Name"
                        name="chatroom_name_form"
                        rules={[{ required: true, message: 'Please input a chatroom name' }]}>
                        <Input placeholder="Type something..." type='text' />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Add
                        </Button>

                    </Form.Item>
                </Form>
            </Spin>
        </>
    )
}

export default AddChatroom
