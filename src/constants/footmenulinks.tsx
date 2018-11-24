interface IFooterMenuLinks {
    [index: number]: {
        id: string;
        message: string;
        link?: string;
        list: {
            [index: number]: {
                id: string;
                isBelongHome: boolean;
                link: string;
                message: string;
            }
        };
    };
}

const FooterMenuLinks: IFooterMenuLinks = [
    {
        id: 'fee',
        message: 'footer_navigation_message_fee',
        link: `/fees`,
        list: [],
    }, {
        id: 'developer',
        message: 'footer_navigation_message_developer',
        link: `/apidocs`,
        list: [
            {
                id: 'jobs',
                isBelongHome: false,
                link: `/jobs/index-en.html`,
                message: 'footer_navigation_message_jobs',
            },
        ],
    }, {
        id: 'network',
        message: 'footer_navigation_message_network',
        list: [
            {
                id: 'btcc',
                isBelongHome: false,
                link: '/',
                message: 'footer_navigation_message_network_btcc',
            }, {
                id: 'minpool',
                isBelongHome: false,
                link: '/',
                message: 'footer_navigation_message_resources_minpool',
            },
        ],
    },
];

export default FooterMenuLinks;
