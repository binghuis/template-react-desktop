import Logo from '@/assets/logo-sm.png';
import BreadcrumbPlus from '@/components/breadcrumbs-plus';
import Icon from '@/components/icon';
import MenuBar from '@/components/menu-bar';
import { BreadcrumbRoutes } from '@/constant/breadcrumb-routes';
import { MenuBarItems } from '@/constant/menu-bar-items';
import { PublicPaths } from '@/constant/public-paths';
import { ThemeContext } from '@/context/theme';
import useBoolean from '@/hooks/use-boolean';
import iHttp from '@/service/http';
import { useAuthStore } from '@/store/auth';
import { Button, Layout, Watermark, theme } from 'antd';

import { useContext, useEffect } from 'react';
import { Outlet, matchPath, useLocation, useNavigate } from 'react-router-dom';

const App = () => {
  useEffect(() => {
    iHttp.joke();
  }, []);
  const { useToken } = theme;

  const { user } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useToken();
  const collapse = useBoolean();
  const { toggleTheme, isDark } = useContext(ThemeContext);

  if (PublicPaths.some((path) => matchPath(path, location.pathname))) {
    return <Outlet />;
  }
  const { Header, Content, Footer, Sider } = Layout;

  return (
    <Layout className="w-screen h-screen">
      <Sider
        width={256}
        style={{ background: token.colorBgContainer }}
        className='border-r px-2'
        trigger={null}
        collapsible
        collapsed={collapse.state}
      >
        <div
          className={'h-12 cursor-pointer border-b flex items-center'}
          onClick={() => {
            navigate('/');
          }}
        >
          <img src={Logo} className='h-full' alt="" />
          {!collapse.state && <span className='text-lg'>测试项目</span>}
        </div>
        <div className='collapsed-button' onClick={collapse.toggle}>
          {collapse.state ? (
            <Icon type='right1' size={18} />
          ) : (
            <Icon type='left1' size={18} />
          )}
        </div>

        <MenuBar items={MenuBarItems} className='border-r-0 ' />
      </Sider>

      <Layout>
        <Header
          className="h-12 flex items-center justify-end px-4 border-b"
          style={{ background: token.colorBgContainer }}
        >
          <div
            onClick={toggleTheme}
            className='cursor-pointer opacity-60 hover:opacity-95 duration-300'
          >
            {isDark ? <Icon type='sun' /> : <Icon type='moon_' />}
          </div>
        </Header>
        <Content className="overflow-y-auto py-1 px-2 min-h-min">
          <Watermark content={`${user?.id}`}>
            <BreadcrumbPlus routes={BreadcrumbRoutes} />
            <Outlet />
          </Watermark>
        </Content>
        <Footer className="text-center text-gray-400 text-xs p-1">
          Made with ❤️ by @binghuis
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
