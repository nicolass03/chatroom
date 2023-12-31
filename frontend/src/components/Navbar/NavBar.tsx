import { useDispatch, useSelector } from "react-redux"
import { Menu, MenuProps,  } from "antd"
import { LogoutOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { RootState } from "../../redux/store"
import { clearUser } from "../../redux/userSlice";
import { clearChatroom } from "../../redux/chatroomSlice";

import { LOGOUT } from "../../graphql/mutations/Logout";

const menuStyle: React.CSSProperties = {
    justifyContent: 'flex-end',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
    width: '100%',
}


function NavBar() {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const [logoutUser] = useMutation(LOGOUT, {
        onCompleted: () => {
            navigate('/login');
        }
    })
    const handleLogout = async () => {
        await logoutUser();
        dispatch(clearUser(), clearChatroom());
    }
    const items: MenuProps['items'] = [
        { label: user.username , key: 'user_menu', children: [
            { label: 'Logout', key: 'logout', icon: <LogoutOutlined/>, onClick: handleLogout },
        ]},
    ]

    return (
        <Menu mode="horizontal" items={items} selectable={false} style={menuStyle}>
            Navbar
        </Menu>
    )
}

export default NavBar

