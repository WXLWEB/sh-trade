import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { Select, Menu, Icon, Popover } from 'antd';
import classNames from 'classnames';
import Filter from '@/Filter';
import * as AuthActions from '@/store/actions/auth';
import * as LocaleActions from '@/store/actions/locales';
import { LeftNavigation, RightNavigation } from '@/constants/navigation';
import './index.less'
import logo from '@/assets/images/logo.png';

const Option = Select.Option;

interface IHeaderProps {
    readonly location: any;
    readonly actions: any;
    readonly lang: string;
    readonly account: any;
    readonly showLoginPopup: () => void;
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

      handleLangChange = (value: string) => {
        const { actions } = this.props;
        actions.changeLang(value);
      }

      public render() {
        const { menuVisible } = this.state;
        const { account, lang } = this.props;
        const hasAccount = !!account.get('mobile');
        // const { isMobile } = this.context;
        const isMobile = false;
        const menuMode = isMobile ? 'inline' : 'horizontal';
        const {
          location,
        } = this.props;
        const module = location.pathname.replace(/(^\/|\/$)/g, '').split('/').slice(0, -1).join('/');
        let activeMenuItem = module || 'home';
        const headerClassName = classNames({
          clearfix: true,
        });

        const menu = [
          <Select
            value={lang}
            key={0}
            suffixIcon={<Icon type="caret-down" />}
            className="header-lang-button"
            style={{ width: 100 }}
            onChange={this.handleLangChange}>
            <Option value="zh" key="zh">简体中文</Option>
            <Option value="en" key="en">English</Option>
          </Select>,
          <Menu key={1} className="menu-site" mode={menuMode} selectedKeys={[activeMenuItem]} id="nav" key="nav">
            {
              RightNavigation.map((item: any) => {
                if (hasAccount && (item.id === 'signin')) {
                    return (
                      <Menu.Item key={item.id} id={item.id}>
                          <Link to={''}>
                              <Filter value={account.mobile} keyname="mobile"/>
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
    actions: bindActionCreators(Object.assign({}, AuthActions, LocaleActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
