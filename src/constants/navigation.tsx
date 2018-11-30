interface INavigation {
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
}

type INavigations = Array<INavigation>

export const LeftNavigation: INavigations = [
    {
        id: 'home',
        message: 'header_navigation_message_coin_to_coin',
        link: `/`,
        list: [],
    },  {
        id: 'trade',
        message: 'header_navigation_message_c_to_c',
        link: `/`,
        list: [],
    }, {
        id: 'innovative',
        message: 'header_navigation_message_active',
        link: `/`,
        list: [],
    }, {
        id: 'notice',
        message: 'header_navigation_message_notice',
        link: '',
        list: [],
    }, {
        id: 'help',
        message: 'header_navigation_message_help',
        link: '',
        list: [],
    },
];

export const RightNavigation: INavigations = [
    {
        id: 'assets',
        message: 'header_navigation_message_assets',
        link: `/`,
        list: [],
    },  {
        id: 'orders',
        message: 'header_navigation_message_orders',
        link: `/`,
        list: [],
    }, {
        id: 'signin',
        message: 'header_navigation_message_signin',
        link: `/`,
        list: [],
    }
];


// export default Navigation;
