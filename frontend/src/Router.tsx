import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import React from 'react';
import { observer, inject } from 'mobx-react';
import Page from '@/components/System/Page';
import AuthorizationPage from '@pages/AuthorizationPage/AuthorizationPage';
import NotFound from '@pages/System/NotFound';
import {StoresNames} from "@/stores/StoresNames";
import UserStore from "@/stores/UserStore";
import AdminPersonalAccount from "@pages/AdminPersonalAccount/AdminPersonalAccount";
import CarrierPersonalAccount from "@pages/CarrierPersonalAccount/CarrierPersonalAccount";
import ManagerPersonalAccount from '@pages/ManagerPersonalAccount/ManagerPersonalAccount';
import CreateOrderPage from "@pages/CreateOrderPage/CreateOrderPage";
import RouteSheet from "@pages/RoutePage/CreateRouteSheet";
import RoutePage from "@pages/RoutePage/RoutePage";
import CourierRoutePage from "@pages/CourierRoutePage/CourierRoutePage";
import PrintSheet from './components/print/PrintSheet';
import PrintOrder from './components/print/PrintOrder';

class Router extends React.Component {
  userStore: UserStore;
  constructor(props: any) {
    super(props);
    this.userStore = props[StoresNames.UserStore]
  }

  getPersonalAccountPage(routerProps: any) {
    if (!this.userStore.isLogin) {
      return <Redirect to="/authorization" />
    }
    let Component: JSX.Element;
    switch (this.userStore.user?.role) {
      case 'ADMIN':
        Component = AdminPersonalAccount;
        break;
      case 'MANAGER':
        Component = ManagerPersonalAccount;
        break;
      case 'COURIER':
        Component = CarrierPersonalAccount;
        break;
      default:
        this.userStore.isLogin = false;
        return null;
    }

    return this.getPage(routerProps, Component);
  }

  getPage(routerProps: any, Component: any) {
    return (
      <Page>
        <Component {...routerProps} />
      </Page>
    );
  }

  render() {
    if (!this.userStore.user) return null;
    return (
      <BrowserRouter>
        <Switch>
          {/*{*/}
          {/*  !this.userStore.isLogin*/}
          {/*  && <Redirect to="/authorization" />*/}
          {/*}*/}
          <Route path="/404">
            <NotFound />
          </Route>
          <Route path="/print-sheet/:id">
            <PrintSheet />
          </Route>
          {
            this.userStore.isLogin
            && <Redirect from="/authorization" to="/" />
          }
          <Route exact path="/" render={p => this.getPersonalAccountPage(p)} />
          {
            this.userStore.user.role === 'MANAGER'
            && (
              <>
                <Route path="/create-order" render={p => this.getPage(p, CreateOrderPage)}/>
                <Route path="/create-route-sheet" render={p => this.getPage(p, RouteSheet)}/>
                <Route path="/route/:id" render={p => this.getPage(p, RoutePage)} />
                <Route path="/order/:id" render={p => this.getPage(p, CreateOrderPage)}/>
                <Route path="/print-order/:id">
                  <PrintOrder />
                </Route>
              </>
            )
          }
          {
            this.userStore.user.role === 'COURIER'
            && (
              <>
                <Route path="/route/:id" render={p => this.getPage(p, CourierRoutePage)} />
              </>
            )
          }
          <Route path="/authorization">
            <AuthorizationPage />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default inject(StoresNames.UserStore, 'services')(observer(Router));
