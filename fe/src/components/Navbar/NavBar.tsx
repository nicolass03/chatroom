import { Menu, MenuProps,  } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { useMutation } from "@apollo/client";
import { LOGOUT } from "../../graphql/mutations/Logout";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/userSlice";
import { LogoutOutlined } from "@ant-design/icons";
import { clearChatroom } from "../../redux/chatroomSlice";

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
        dispatch(logout(), clearChatroom());
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

