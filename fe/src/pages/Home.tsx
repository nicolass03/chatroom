import { Flex, Layout } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import React from 'react'
import NavBar from '../components/Navbar/NavBar'
import AvailableChatroomsList from '../components/AvailableChatroomList/AvailableChatroomsList';
import ChatWindow from '../components/ChatWindow/ChatWindow';
import ChatroomList from '../components/ChatroomList/ChatroomList';

const layoutStyle: React.CSSProperties = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  padding: 10
};

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  // color: '#fff',
  height: '64px',
  // paddingInline: ,
  lineHeight: '64px',
  borderRadius: 10,
  // backgroundColor: '#4096ff',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  marginTop: 10,
  // color: '#fff',
  backgroundColor: 'D5D5D5',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
}

function Home() {
  return (
    <Flex>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <NavBar />
        </Header>
        <Content style={contentStyle}>
          <ChatroomList />
          <ChatWindow />
          <AvailableChatroomsList />
        </Content>
      </Layout>
    </Flex>
  )
}

export default Home
