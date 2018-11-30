import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { Select, Menu, Icon, Popover } from 'antd';
import classNames from 'classnames';
import * as AuthActions from '@/store/actions/auth';
import { LeftNavigation, RightNavigation } from '@/constants/navigation';
import './index.less'
import logo from '@/assets/images/logo.png';

const Option = Select.Option;

interface IHeaderProps {
    readonly location: any;
    // readonly hasAccount: boolean;
    // logout: any;
    // account: string;
    // product?: string;
    readonly showLoginPopup: () => void;
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

      onMenuVisibleChange = (visible: boolean) => {
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
        const { account } = this.props;
        const hasAccount = !!account.get('mobile');
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
              RightNavigation.map((item: any) => {
                if (hasAccount && (item.id === 'signin')) {
                    return (
                      <Menu.Item key={item.id} id={item.id}>
                          <Link to={''}>
                              {account.mobile}
                          </Link>
                      </Menu.Item>
                    );
                } else if (item.id === 'signin' || item.id === 'signup') {
                  return (
                    <Menu.Item key={item.id} onClick={this.props.showLoginPopup}>
                      <Link to={''}>
                        <FormattedMessage id={item.message} />
                      </Link>
                    </Menu.Item>)
                }
                return (
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
                    LeftNavigation.map((item: any) => {
                      if (hasAccount && (item.id === 'signup' || item.id === 'login')) {
                          return <span key={item.id}></span>;
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

function mapStateToProps(state: any) {
  return {
    socket: state.socket,
    lang: state.locales.get('lang'),
    account: state.account,
  };
}


function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(Object.assign({}, AuthActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
