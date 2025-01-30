import { TabBar } from 'antd-mobile';
import {
    AppOutline,
    MessageFill,
    UserOutline
} from 'antd-mobile-icons';
import { JSX, useEffect, useLayoutEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from "react-router";
import config from '../../configs';
import styles from './styles.module.scss';

interface TabItem {
    path: string;
    name: string;
    title: string;
    element: unknown;
    index?: boolean;
}

export default function Home() {
    const { routes } = config;
    const location = useLocation();
    const { pathname } = location
    const navigate = useNavigate();
    const [tabs, setTabs] = useState<TabItem[]>([]);

    const setRouteActive = (value: string) => {
        console.log("value=========", value);

        navigate(value);
    }

    useLayoutEffect(() => {
        // const route = routes[0].filter(item => item.path === "/im")[0].routes;
        const route = routes.filter((route) => {
            if (route.path === "/") {
                if (route.routes) {
                    return route.routes.filter(item => item.path === "/im")[0];
                }
            }
        })[0].routes;



        const tabs = route?.[0].routes.map((route) => ({
            ...route,
            path: `/im/${route.path}`,
        })) || [];

        // const tabs = route?.[0].routes || [];

        console.log("====222000===", tabs);

        setTabs(tabs);
    }, [routes]);

    useEffect(() => {
        if (pathname === "/im") {
            navigate("/im/contacts");
        }
    }, [pathname, navigate])


    const getIcon = (path: string, type: string) => {
        const iocns = {
            "/im/contacts": <AppOutline />,
            "/im/chats": <MessageFill />,
            "/im/settings": <UserOutline />
        } as Record<string, JSX.Element>

        const badges = {
            "/im/contacts": "5",
            "/im/chats": "99+",
        } as Record<string, string>

        const types = {
            icon: iocns[path],
            badge: badges[path]
        } as Record<string, JSX.Element | string>
        return types[type];
    }

    return (
        <>
            <div className={styles.body}>
                <Outlet />
            </div>


            <div className={styles.bottom}>
                <TabBar safeArea activeKey={pathname} onChange={value => setRouteActive(value)}>
                    {tabs.map(item => {
                        return (
                            <TabBar.Item
                                key={item.path}
                                icon={getIcon(item.path, "icon")}
                                title={item.title}
                                badge={getIcon(item.path, "badge")}
                            />
                        )
                    })}
                </TabBar>
            </div>
        </>
    )
}

