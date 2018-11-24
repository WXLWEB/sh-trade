import * as React from 'react';
import { List } from 'immutable';
import { FormattedMessage } from 'react-intl';
import * as classNames from 'classnames';

// import logo from '@/app/assets/images/logo.png';

interface IHeaderProps {
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

    public toggleMenu() {
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
    }

    public toggleSubMenu() {
        this.setState({ isSubMenuOpen: !this.state.isSubMenuOpen });
    }

    public showSubMenu(index: number) {
        const i = this.state.openSubMenu.indexOf(index);
        if (i === -1) {
            this.setState({ openSubMenu: this.state.openSubMenu.push(index) });
            return;
        }
        this.setState({ openSubMenu: this.state.openSubMenu.remove(i) });
    }

    public render() {
        const { Navigation, hasAccount, logout, account, showPopup, showRegisterPopup, pathname } = this.props;
        const { isMenuOpen, openSubMenu } = this.state;
        const transparent = pathname === '/' && this.state.isTransparent && this.props.isHome ? true : false;
        return (
            <header className={
                classNames({
                    header: true,
                    white: !transparent,
                })
            }>
                <div className='container'>
                    {/* <div className='menuBar'>
                        <MenuIcon onClick={this.toggleMenu} isMenuOpen={this.state.isMenuOpen} />
                    </div> */}
                    <div
                        className={classNames({
                            navigation: true,
                            isOpen: this.state.isMenuOpen,
                            isSubMenuOpen: this.state.isSubMenuOpen,
                        })}
                    >
                        <ul>
                            {
                                Navigation.map((items: any) => {
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
                                            <a href='/'>
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
