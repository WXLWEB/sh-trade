import * as React from 'react';
interface ISideItems {
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

const ISideItems: ISideItems = [
    {
        id: '/',
        message: 'side_item_message_trade',
        list: [
            {
                id: 'eth_btc',
                isBelongHome: true,
                link: `/eth_btc`,
                message: 'ETH_BTC',
            },
            {
                id: 'bcc_btc',
                isBelongHome: true,
                link: `/bcc_btc`,
                message: 'BCC_BTC',
            },
        ],
    },
];

export default ISideItems;
