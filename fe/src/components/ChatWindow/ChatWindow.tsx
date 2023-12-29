import { Button, Card, Empty, Flex, Input, Space } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { GET_CHATROOM_MESSAGES } from '../../graphql/queries/GetChatroomMessages';
import { Message } from '../../gql/graphql';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { SendOutlined } from '@ant-design/icons';
import BubbleMessage from '../BubbleMessage/BubbleMessage';
import { SEND_MESSAGE } from '../../graphql/mutations/SendMessage';
import { NEW_MESSAGE_SUBSCRIPTION } from '../../graphql/subscriptions/NewMessage';

const mainCardStyle: React.CSSProperties = {
    width: '59%',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
    height: '100%',
}

const emptyFlexStyle: React.CSSProperties = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}

const messagesFlexStyle: React.CSSProperties = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    overflowY: 'scroll',
    padding: 10
}

function ChatWindow() {
    const activeChatroomId = useSelector((state: RootState) => {
        return state.chatroom.activeChatroomId});
    const userId = useSelector((state: RootState) => state.user.id);
    const { data, loading, error } = useQuery(GET_CHATROOM_MESSAGES, {
        fetchPolicy: 'network-only',
        variables: {
            chatroomId: activeChatroomId
        }
    });

    const [sendMessage, { data: sendMessageData }] = useMutation(SEND_MESSAGE)
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);

    const { data: psData, loading: psLoading, error: psError } = useSubscription(NEW_MESSAGE_SUBSCRIPTION, {
        variables: {
            chatroomId: activeChatroomId
        }
    });

    useEffect(() => {        
        if (data?.getChatroomMessages) {
            setMessages(data.getChatroomMessages);
        }
    }, [data?.getChatroomMessages])

    const handleSendMessage = async () => {
        await sendMessage({
            variables: {
                chatroomId: activeChatroomId,
                userId,
                message
            },
            onCompleted: () => {
                console.log('message sent');
            },
            onError: (err) => {
                console.log(err);
            }
        })
        setMessage('');
    }

    useEffect(() => {
        if (psData?.newMessage) {
            if (!messages.find((m) => m.id === psData.newMessage?.id)) {
                setMessages((prevMessages) => [...prevMessages, psData.newMessage!])
            }
        }
    }, [psData?.newMessage, messages])

    const onPressEnter = (e: any) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    }

    return (
        <Card style={mainCardStyle} bodyStyle={{ height: '96%' }}>
            {messages.length > 0 ?
                <Flex vertical style={messagesFlexStyle}>
                    {messages.map((message: Message) => {                        
                        const sender = message!.user!.id! === userId ? null : message!.user!.username;                        
                        return (
                            <BubbleMessage key={message.id} message={message.message!} sender={sender} />
                        )
                    })}
                </Flex>
                :
                <Flex vertical style={emptyFlexStyle}>
                    <Empty style={emptyFlexStyle} description='No messages' />
                </Flex>}
            <Space.Compact style={{ width: '100%' }}>
                <Input placeholder="Send a message..." value={message} onChange={(e) => setMessage(e.currentTarget.value)} onKeyDown={onPressEnter}/>
                <Button type="primary" onClick={handleSendMessage}><SendOutlined /></Button>
            </Space.Compact>
        </Card>
    )
}

export default ChatWindow
