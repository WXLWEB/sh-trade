export interface INavigation {
    [index: number]: {
        id: string;
        message: string;
        link?: string;
        list: {
            [index: number]: {
                id: string;
                isBelongHome: boolean;
                isTrade: boolean;
                tradeUrl?: string;
                link: string;
                message: string;
            }
        };
    };
}

const Navigation: INavigation = [
    {
        id: 'simple',
        message: 'header_navigation_message_simple',
        link: `/`,
        list: [],
    }, {
        id: 'profess',
        message: 'header_navigation_message_professional',
        link: `/fullscreen`,
        list: [],
    }, {
        id: 'login',
        message: 'header_navigation_message_signin',
        link: '',
        list: [],
    }, {
        id: 'signup',
        message: 'header_navigation_message_sign_up',
        link: '',
        list: [],
    },
];

export default Navigation;
