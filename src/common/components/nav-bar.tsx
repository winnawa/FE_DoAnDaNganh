import styled from 'styled-components'
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { ReactNode, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { logoUrl } from '../constants';
import {Typography} from 'antd'
const {Text} = Typography

interface LogoContainerProps{
    logoUrl: string;
}
const LogoContainer = styled.div<LogoContainerProps>`
    background-image: ${(props)=>(`url(${props.logoUrl})`)};
    background-size: cover;
    background-position: center;
    background-repeat:  no-repeat;
    width: 44px;
    height: 44px;
    margin: 0px 10px;
`

const NavBarHolder = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 12px;
    border-bottom: solid;
    border-width: 1px;
    border-color: rgba(5, 5, 5, 0.06);
`

const GroupElement = styled.div`
    display: flex;
    .ant-menu-horizontal{
        border-bottom: none !important;
    }
`

const UserDisplay = styled.div`
    padding-right: 20px;
`

const CustomizedMenu: React.FC<MenuProps> = styled(Menu)`
   
` 

export interface Topic{
    content: string,
    icon: ReactNode,
    path: string
}

interface NavBarPropsType{
    topics: Topic[],
}

export const NavBar:React.FC<NavBarPropsType> = (props)=>{

    const navigate = useNavigate()

    const [current, setCurrent] = useState(props?.topics[0]? props.topics[0].path : '');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
        navigate(`/${e.key}`)
    };

    const items: MenuProps['items'] = props.topics.map((topic)=>({
        label : topic.content,
        key: topic.path,
        icon: topic.icon
    }))
    return(
        <NavBarHolder>
            <GroupElement>
                <LogoContainer logoUrl={logoUrl}/>
                <CustomizedMenu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} defaultSelectedKeys= {[current]}/>
            </GroupElement>
            <GroupElement>
                <UserDisplay>
                    <Text>Welcome to smart home !!!</Text>
                </UserDisplay>
            </GroupElement>
        </NavBarHolder>
    )
}