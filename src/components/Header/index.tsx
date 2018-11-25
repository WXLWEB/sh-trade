import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { Select, Menu, Icon, Popover, Input, Badge, Button } from 'antd';
import classNames from 'classnames';
import { LeftNavigation, RightNavigation } from '@/constants/navigation';
import './index.less'
import logo from '@/assets/images/logo.png';

const Option = Select.Option;

interface IHeaderProps {
    readonly location: any;
    readonly hasAccount: boolean;
    // logout: any;
    // account: string;
    // product?: string;
    // showPopup: () => void;
    // showRegisterPopup: any;
    // isHome: boolean;
}
interface IHeaderState {
    menuVisible: boolean;
    isSubMenuOpen?: any;
    openSubMenu?: any;
    isTransparent?: boolean;
}

class Header extends React.Component<IHeaderProps, IHeaderState> {
    constructor(props: IHeaderProps, context: any) {
        super(props, context);
        this.state = {
          menuVisible: false,
        };
    }
      // static contextTypes = {
      //   router: PropTypes.object.isRequired,
      //   intl: PropTypes.object.isRequired,
      //   isMobile: PropTypes.bool.isRequired,
      // }

      componentDidMount() {
        const { intl, router } = this.context;
        console.log('context:', this.context)
      }

      handleShowMenu = () => {
        this.setState({
          menuVisible: true,
        });
      }

      handleHideMenu = () => {
        this.setState({
          menuVisible: false,
        });
      }

      onMenuVisibleChange = (visible) => {
        this.setState({
          menuVisible: visible,
        });
      }

      handleLangChange = () => {
        const { location: { pathname } } = this.props;
        const currentProtocol = `${window.location.protocol}//`;
        const currentHref = window.location.href.substr(currentProtocol.length);
      }

      public render() {
        const { menuVisible } = this.state;
        const { hasAccount } = this.props;
        // const { isMobile } = this.context;
        const isMobile = false;
        const menuMode = isMobile ? 'inline' : 'horizontal';
        const {
          location,
        } = this.props;
        const module = location.pathname.replace(/(^\/|\/$)/g, '').split('/').slice(0, -1).join('/');
        let activeMenuItem = module || 'home';
        if (activeMenuItem === 'components' || location.pathname === 'changelog') {
          activeMenuItem = 'docs/react';
        }
        // const { intl: { locale } } = this.context;
        const locale = 'zh-CN';
        const isZhCN = true;

        const headerClassName = classNames({
          clearfix: true,
        });

        const menu = [
          <Select
            defaultValue="简体中文"
            suffixIcon={<Icon type="caret-down" />}
            className="header-lang-button"
            style={{ width: 100 }}
            onChange={this.handleLangChange}>
            <Option value="zh-CN">简体中文</Option>
            <Option value="en-EN">English</Option>
          </Select>,
          <Menu className="menu-site" mode={menuMode} selectedKeys={[activeMenuItem]} id="nav" key="nav">
            {
              RightNavigation.map((item: any, i: number) => {
                if (hasAccount && (item.id === 'signup' || item.id === 'login')) {
                    return null;
                }
                return (!!item.link ?
                  <Menu.Item key={item.id}>
                    <Link to={item.link}>
                      <FormattedMessage id={item.message} />
                    </Link>
                  </Menu.Item> :
                  <Menu.Item key={item.id} id={item.id}>
                      <Link to={item.link}>
                          <FormattedMessage id={item.message} />
                      </Link>
                  </Menu.Item>
                )
              })
            }
          </Menu>,
        ];

        const searchPlaceholder = locale === 'zh-CN' ? '在 ant.design 中搜索' : 'Search in ant.design';
        return (
          <header id="header" className={headerClassName}>
            {isMobile && (
              <Popover
                overlayClassName="popover-menu"
                placement="bottomRight"
                content={menu}
                trigger="click"
                visible={menuVisible}
                arrowPointAtCenter
                onVisibleChange={this.onMenuVisibleChange}
              >
                <Icon
                  className="nav-phone-icon"
                  type="menu"
                  onClick={this.handleShowMenu}
                />
              </Popover>
            )}
            <div className="container">
              <div>
                <Link to='/' id="logo">
                  <img src={logo} />
                </Link>
                <Menu className="menu-site" mode={menuMode} selectedKeys={[activeMenuItem]} id="left-nav" key="nav">
                  {
                    LeftNavigation.map((item: any, i: number) => {
                      if (hasAccount && (item.id === 'signup' || item.id === 'login')) {
                          return null;
                      }
                      return (!!item.link ?
                        <Menu.Item key={item.id}>
                          <Link to={item.link}>
                            <FormattedMessage id={item.message} />
                          </Link>
                        </Menu.Item> :
                        <Menu.Item key={item.id} id={item.id}>
                            <Link to={item.link}>
                                <FormattedMessage id={item.message} />
                            </Link>
                        </Menu.Item>
                      )
                    })
                  }
                </Menu>
              </div>
              <div>
                 {!isMobile && menu}
               </div>
            </div>
          </header>
        );
      }
}

export default Header;
