import React, { useState } from "react";
import { Routes } from '../services/Routes'
import { useHistory } from "react-router-dom"
import { useMediaQuery } from 'react-responsive';
import { Row, Col, Layout, Menu, BackTop } from 'antd';
import {
    HomeOutlined,
    InfoCircleOutlined,
    TeamOutlined,
    VideoCameraOutlined,
    HistoryOutlined,
    UsergroupAddOutlined,
    UpOutlined
} from '@ant-design/icons';
import "../styles/main.scss";
import { FormattedMessage } from 'react-intl'
import { IntlProvider } from 'react-intl';
import TuluTitle from '../assets/images/tuluTitle.jpg'

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

export const Main = props => {
    const history = useHistory();
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
    const [sideBarCollapsed, setSideBarCollapsed] = useState(isMobile)

    const toggleSidebar = () => {
        setSideBarCollapsed(!sideBarCollapsed)
    };
    return (
        <IntlProvider >
            <Layout className="layout">
                <Header>
                    <Row><Col span={24}><span className="title">ALL AMERICAN TULU ASSOCIATION</span></Col></Row>
                    <Row><Col span={24}><img className="bannerImage" alt="Tulu Title" src={TuluTitle} /></Col></Row>
                </Header>

                <Layout className="site-layout">
                    <Sider collapsible collapsed={sideBarCollapsed} onCollapse={toggleSidebar} className="sidebar">
                        <Menu
                            defaultSelectedKeys={["home"]}
                            mode="inline"
                            style={{ height: '100%' }}
                            onSelect={val => {
                                history.push("/" + val.key)
                            }}>
                            <Menu.Item key="home" icon={<HomeOutlined />}>
                                <FormattedMessage id="Home" />
                            </Menu.Item>
                            <SubMenu key="aboutus" icon={<InfoCircleOutlined />} title="About Us">
                                <Menu.Item key="whoAreWe"><FormattedMessage id="Who Are We?" /></Menu.Item>
                                <Menu.Item key="byLaw"><FormattedMessage id="By-Law" /></Menu.Item>
                            </SubMenu>
                            <SubMenu key="committee" icon={<TeamOutlined />} title="Commitee">
                                <Menu.Item key="executiveBoard"><FormattedMessage id="Executive Board" /></Menu.Item>
                                <Menu.Item key="boardOfDirectors"><FormattedMessage id="Board Of Directors" /></Menu.Item>
                                <Menu.Item key="regionalAmbassadors"><FormattedMessage id="Regional Ambassadors" /></Menu.Item>
                                <Menu.Item key="advisors"><FormattedMessage id="Advisors" /></Menu.Item>
                            </SubMenu>
                            {/* <SubMenu key="getInvolved" icon={<InteractionOutlined />} title="Get Involved">
                                <Menu.Item key="charity"><FormattedMessage id="Charity" /></Menu.Item>
                                <Menu.Item key="voluntary"><FormattedMessage id="Voluntary" /></Menu.Item>
                                <Menu.Item key="sponsor"><FormattedMessage id="Sponsor" /></Menu.Item>
                                <Menu.Item key="donors"><FormattedMessage id="Donors" /></Menu.Item>
                                <Menu.Item key="ourPartners"><FormattedMessage id="Our Partners" /></Menu.Item>
                            </SubMenu> */}
                            <SubMenu key="activities" icon={<VideoCameraOutlined />} title="Activities">
                                {/* <Menu.Item key="events"><FormattedMessage id="Events" /></Menu.Item> */}
                                <Menu.Item key="mediaCoverage"><FormattedMessage id="Media Coverage" /></Menu.Item>
                                <Menu.Item key="newsletter"><FormattedMessage id="Newsletter" /></Menu.Item>
                            </SubMenu>
                            <SubMenu key="tulunaad" icon={<HistoryOutlined />} title="Tulunaad">
                                {/* <Menu.Item key="tuluHistory"><FormattedMessage id="Tulu History" /></Menu.Item> */}
                                <Menu.Item key="tuluLipi"><FormattedMessage id="Tulu Lipi" /></Menu.Item>
                                {/* <Menu.Item key="tuluForBegineers"><FormattedMessage id="Tulu For Begineers" /></Menu.Item>
                                <Menu.Item key="whosWho"><FormattedMessage id="Who's Who" /></Menu.Item>
                                <Menu.Item key="mythology"><FormattedMessage id="Mythology" /></Menu.Item>
                                <Menu.Item key="tradition"><FormattedMessage id="Tradition" /></Menu.Item>
                                <Menu.Item key="coastalwood"><FormattedMessage id="Coastalwood" /></Menu.Item>
                                <Menu.Item key="tuluLinks"><FormattedMessage id="Tulu Links" /></Menu.Item> */}
                            </SubMenu>
                            {/* <SubMenu key="resources" icon={<InteractionOutlined />} title="Resources">
                                <Menu.Item key="delicacies"><FormattedMessage id="Delicacies" /></Menu.Item>
                                <Menu.Item key="indianRestaurants"><FormattedMessage id="Indian Restaurants" /></Menu.Item>
                                <Menu.Item key="indianGroceries"><FormattedMessage id="Indian Groceries" /></Menu.Item>
                                <Menu.Item key="indianClothes"><FormattedMessage id="Indian Clothes" /></Menu.Item>
                                <Menu.Item key="musicTeachers"><FormattedMessage id="Music Teachers" /></Menu.Item>
                                <Menu.Item key="danceTeachers"><FormattedMessage id="Dance Teachers" /></Menu.Item>
                                <Menu.Item key="artTeachers"><FormattedMessage id="Art Teachers" /></Menu.Item>
                            </SubMenu> */}
                            {/* <SubMenu key="regionalKootas" icon={<CalendarOutlined />} title="Regional Kootas">
                                <Menu.Item key="boston"><FormattedMessage id="Boston" /></Menu.Item>
                                <Menu.Item key="california"><FormattedMessage id="California" /></Menu.Item>
                                <Menu.Item key="newYork"><FormattedMessage id="New York" /></Menu.Item>
                            </SubMenu> */}
                            <Menu.Item key="becomeAMember" icon={<UsergroupAddOutlined />}>
                                <FormattedMessage id="Become A Member" />
                            </Menu.Item>
                            <Menu.Item key="donate" icon={<UsergroupAddOutlined />}>
                                <FormattedMessage id="Want to Donate?" />
                            </Menu.Item>
                            {/*<Menu.Item key="checkMembers" icon={<UsergroupAddOutlined />}>
                                <FormattedMessage id="Check Members" />
                            </Menu.Item>
                            <Menu.Item key="contactUs" icon={<ContactsOutlined />}>
                                <FormattedMessage id="Contact Us" />
                            </Menu.Item> */}
                        </Menu>
                    </Sider>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            height: '100%',
                            width: 'fit-content'
                        }}>
                        <BackTop>
                            <div className="scrollUp"><UpOutlined /></div>
                        </BackTop>
                        <Routes />
                    </Content>
                </Layout>
            </Layout>
        </IntlProvider>
    )
}
