import * as React from 'react';
import { List } from 'immutable';
import * as classNames from 'classnames';

import './App.less';

// import logo from '@/app/assets/images/logo.png';

interface IHeaderProps {
    logoBlack: any;
    logoWhite: any;
    Navigation: any;
    pathname: string;
    hasAccount: boolean;
    logout: any;
    account: string;
    product?: string;
    showPopup: () => void;
    showRegisterPopup: any;
    isHome: boolean;
}
interface IHeaderState {
    isMenuOpen?: any;
    isSubMenuOpen?: any;
    openSubMenu?: any;
    isTransparent?: boolean;
}

class Header extends React.Component<IHeaderProps, IHeaderState> {
    constructor(props: IHeaderProps, context: any) {
        super(props, context);
        this.state = {
            isMenuOpen: false,
            isSubMenuOpen: false,
            openSubMenu: List(),
            isTransparent: false,
        };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.toggleSubMenu = this.toggleSubMenu.bind(this);
        this.showSubMenu = this.showSubMenu.bind(this);
    }

    toggleMenu() {
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
    }

    toggleSubMenu() {
        this.setState({ isSubMenuOpen: !this.state.isSubMenuOpen });
    }

    showSubMenu(index: number) {
        const i = this.state.openSubMenu.indexOf(index);
        if (i === -1) {
            this.setState({ openSubMenu: this.state.openSubMenu.push(index) });
            return;
        }
        this.setState({ openSubMenu: this.state.openSubMenu.remove(i) });
    }

    render() {
        const { logoWhite, logoBlack, Navigation, hasAccount, logout, account, showPopup, showRegisterPopup, pathname, product } = this.props;
        const { isMenuOpen, openSubMenu } = this.state;
        const transparent = pathname === '/' && this.state.isTransparent && this.props.isHome ? true : false;
        return (
            <header className={
                classNames({
                    header: true,
                    white: !transparent,
                    transparent: transparent,
                })
            }>
                <div className='container'>
                    // <div className='menuBar'>
                    //     <MenuIcon onClick={this.toggleMenu} isMenuOpen={this.state.isMenuOpen} />
                    // </div>
                    <div
                        className={classNames({
                            navigation: true,
                            isOpen: this.state.isMenuOpen,
                            isSubMenuOpen: this.state.isSubMenuOpen,
                        })}
                    >
                        <ul>
                            {
                                Navigation.map((items, i) => {
                                    if (hasAccount && (items.id === 'signup' || items.id === 'login')) {
                                        return null;
                                    }
                                    return (!!items.link ?
                                      <li key={items.id} id={items.id}>
                                          <a href={items.link}>
                                              <FormattedMessage id={items.message} />
                                          </a>
                                      </li> :
                                      <li key={items.id} id={items.id} onClick={items.id === 'login' ? showPopup : showRegisterPopup}>
                                          <a>
                                              <FormattedMessage id={items.message} />
                                          </a>
                                      </li>
                                    )
                                })
                            }
                            {
                                hasAccount &&
                                <li className='info' onClick={this.showSubMenu.bind(null, -1)}>
                                    <a>
                                        <span>{account}</span>
                                    </a>
                                    <ul className='subMenu' style={isMenuOpen ? { display: (openSubMenu.indexOf(-1) !== -1) ? 'block' : 'none' } : {}}>
                                        <li>
                                            <a href={env.DEPOSIT_WITHDRAW_URL}>
                                                <FormattedMessage id='header_navigation_message_account_home' />
                                            </a>
                                        </li>
                                        <li>
                                            <a onClick={logout}>
                                                <FormattedMessage id='header_button_logout' />
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
