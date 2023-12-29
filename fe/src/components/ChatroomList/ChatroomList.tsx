import { Card, Collapse, CollapseProps, List, Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store';
import { GET_USER_CHATROOMS } from '../../graphql/queries/GetUserChatrooms';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_CHATROOM } from '../../graphql/mutations/DeleteChatroom';
import AddChatroom from '../AddChatroom/AddChatroom';
import { CaretRightOutlined, DeleteOutlined } from '@ant-design/icons';
import { setActiveChatroom } from '../../redux/chatroomSlice';
import { Chatroom } from '../../gql/graphql';

const mainCardStyle: React.CSSProperties = {
  width: '19%',
  boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
  height: '100%'
}

const chatroomItemStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer'
}

const listStyle: React.CSSProperties = {
  marginTop: 10
}

function ChatroomList() {
  const userId = useSelector((state: RootState) => state.user.id);
  const activeChatroomId = useSelector((state: RootState) => state.chatroom.activeChatroomId);
  const dispatch = useDispatch();
  const { data, loading } = useQuery(GET_USER_CHATROOMS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      userId
    }
  });
  const [ deleteChatroom ] = useMutation(DELETE_CHATROOM, {
    variables: {
      chatroomId: activeChatroomId
    },
    refetchQueries: [{
      query: GET_USER_CHATROOMS,
      variables: {
        userId
      }
    }]
  });

  const handleSetActiveChatroom = (chatroomId: string) => {    
    dispatch(setActiveChatroom(parseInt(chatroomId)));
  }

  const handleDeleteChatroom = async (chatroomId: string) => {
    deleteChatroom({
      variables: {
        chatroomId: parseInt(chatroomId)
      },
      onCompleted: () => {
        console.log('deleted chatroom');
      },
    });
  }

  const collapseStyle: React.CSSProperties = {
    background: '#ffffff',
    borderRadius: 10,
    // border: 'none',
    // boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)'
  };
  
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Create chatroom',
      children: <AddChatroom />,
      style: collapseStyle
    }
  ];

  return (
    
    <Card style={mainCardStyle}>
      <Spin spinning={loading}>
        <Collapse expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />} bordered={false} items={items}  />              
        <List bordered style={listStyle}>
                {data?.getUserChatrooms.map((chatroom: Chatroom) => (
                    <List.Item key={chatroom.id} style={chatroomItemStyle} onClick={() => {handleSetActiveChatroom(chatroom.id!)}}>
                        {chatroom.name}
                        <DeleteOutlined onClick={() => handleDeleteChatroom(chatroom.id!)}/>
                    </List.Item>
                ))}
            </List>
    </Spin>
    </Card>
  )
}

export default ChatroomList
