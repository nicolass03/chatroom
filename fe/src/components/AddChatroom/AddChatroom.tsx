import { useMutation } from '@apollo/client'
import { Button, Form, Input, Spin } from 'antd'
import { CREATE_CHATROOM } from '../../graphql/mutations/CreateChatroom'
import { setActiveChatroom } from '../../redux/chatroomSlice';
import { useDispatch } from 'react-redux';

function AddChatroom() {

    const dispatch = useDispatch();
    const [createChatroom, { loading }] = useMutation(CREATE_CHATROOM);

    const handleCreateChatroom = async (values: any) => {        
        createChatroom({
            variables: {
                name: values.chatroom_name_form
            },
            onCompleted: (data) => {
                dispatch(setActiveChatroom(parseInt(data.createChatroom.id)))
            },
            onError: (err) => {
                console.log(err);
            },
            refetchQueries: ['GetUserChatrooms']
        })
    }

    // const layout = {
    //     labelCol: { span: 8 },
    //     wrapperCol: { span: 16 },
    //   };

    return (
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
                        <Input placeholder="Type something..." type='text'/>
                    </Form.Item>
                    <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add
                    </Button>

                </Form.Item>
                </Form>
        </Spin>
    )
}

export default AddChatroom
