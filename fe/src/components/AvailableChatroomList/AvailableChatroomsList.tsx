import { Card, List, Spin } from 'antd'
import { ADD_USER_TO_CHATROOM } from '../../graphql/mutations/AddUserToChatroom'
import { useMutation, useQuery } from '@apollo/client'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { GET_AVAILABLE_CHATROOMS } from '../../graphql/queries/GetAvailableChatrooms'
import { UserAddOutlined } from '@ant-design/icons'
import { Chatroom } from '../../gql/graphql'

const mainCardStyle: React.CSSProperties = {
    width: '19%',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
    height: '100%'
  }

  const chatroomItemStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

function AvailableChatroomsList() {
  const userId = useSelector((state: RootState) => state.user.id);
  const { data, loading } = useQuery(GET_AVAILABLE_CHATROOMS, {
    fetchPolicy: 'network-only',
    variables: {
      userId
    }
  });
    const [addUserToChatroom, { loading: loadingAddUser }] =  useMutation(ADD_USER_TO_CHATROOM)

    const handleAddUserToChatroom = async (chatroomId:string) => {
        addUserToChatroom({
            variables: {
                chatroomId: parseInt(chatroomId),
                userId
            },
            onCompleted: () => {
                console.log('added user to chatroom');
            },
            onError: (err) => {
                console.log(err);
            },
            refetchQueries: ['GetAvailableChatrooms', 'GetUserChatrooms']
        })
    }
  return (
      <Card style={mainCardStyle}>
        <Spin spinning={loading || loadingAddUser}>
            <h2>Available Chatrooms</h2>
            <List bordered>
                {data?.getAvailableChatrooms.map((chatroom: Chatroom) => {
                    return (
                     <List.Item key={chatroom.id} style={chatroomItemStyle}>
                        {chatroom.name}
                        <UserAddOutlined onClick={() => handleAddUserToChatroom(chatroom.id!)}/>
                    </List.Item>
                )})}
            </List>
        </Spin>
      </Card>
  )
}

export default AvailableChatroomsList
