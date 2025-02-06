import { lazy } from "react";

export default {
    routes: [
        {
            index: true,
            path: '/',
            name: 'index',
            title: 'index',
            element: lazy(() => import('../layouts/index')),
            routes: [
                {
                    index: true,
                    path: "/im",
                    name: "im",
                    title: "聊天消息",
                    element: lazy(() => import('../pages/chats')),
                    routes: [
                        {
                            index: true,
                            path: "/contacts",
                            name: "Contacts",
                            title: "推荐的代理",
                            element: lazy(() => import('../pages/chats/tabs/contacts')),
                        },
                        {
                            path: "/chats",
                            name: "Chats",
                            title: "对话",
                            element: lazy(() => import('../pages/chats/tabs/chats')),
                        },
                        {
                            path: "/settings",
                            name: "Settings",
                            title: "设置",
                            element: lazy(() => import('../pages/chats/tabs/settings')),
                        },
                        {
                            path: "/message",
                            name: "Message",
                            title: "消息",
                            element: lazy(() => import('../pages/chats/tabs/message')),
                        },
                    ],
                },
                {
                    path: "/mobile",
                    name: 'mobile',
                    title: 'Mobile',
                    element: lazy(() => import('../layouts/Mobil')),
                    routes: [
                        {
                            index: true,
                            path: "/list",
                            name: 'list',
                            title: 'List',
                            element: lazy(() => import('../pages/mobile/list')),
                        },
                        {
                            path: "/counter",
                            name: 'Counter',
                            title: 'Counter',
                            element: lazy(() => import('../pages/mobile/Counter')),
                        }
                    ]
                },
                {
                    path: "/user",
                    name: 'user',
                    title: 'User',
                    element: lazy(() => import('../pages/user')),
                    routes: [
                        {
                            index: true,
                            path: "/signup",
                            name: 'signup',
                            title: 'Signup',
                            element: lazy(() => import('../pages/user/signup')),
                        },
                        {
                            index: true,
                            path: "/register",
                            name: 'register',
                            title: 'Register',
                            element: lazy(() => import('../pages/user/register')),
                        },
                    ]
                }

            ]
        },
        {
            path: "*",
            name: '404',
            title: '404',
            element: lazy(() => import('../pages/error/404')),
        }
    ],

};
