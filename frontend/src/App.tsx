import React from 'react';
import Router from '@/Router';
import NetworkService from '@/services/NetworkService';
import { StoresNames } from '@/stores/StoresNames';
import { Provider } from 'mobx-react';
import LoaderStore from '@/stores/LoaderStore';
import ErrorWindow from '@/components/System/ErrorWindow';
import Loader from '@/components/System/Loader';
import { MuiThemeProvider } from '@material-ui/core';
import AuthService from '@/services/AuthService';
import ProductService from '@/services/ProductService';
import SocketService from "@/services/SocketService";
import theme from './styles/muiTheme';
import ProductStore from './stores/ProductStore';
import OrderStore from './stores/OrderStore';
import UserStore from './stores/UserStore';
import OrganizationStore from './stores/OrganizationStore';
import ResponsibleStore from './stores/ResponsibleStore';
import UserListStore from './stores/UserListStore';
import PointStore from './stores/PointStore';
import RouteStore from './stores/RouteStore';

import UserService from "@/services/UserService";
import PointService from "@/services/PointService";
import OrganizationService from "@/services/OrganizationService";
import ResponsibleService from "@/services/ResponsibleService";
import OrderService from "@/services/OrderService";
import RouteService from "@/services/RouteService";
import StatsService from "@/services/StatsService";

class App extends React.Component {
  stores: {[key: string]: any};

  services: {[key: string]: any};

  constructor(props: {}) {
    super(props);

    const endpoint = process.env.ENDPOINT;

    const loaderStore = new LoaderStore();
    const userStore = new UserStore();
    const socketService = new SocketService(endpoint);
    const productStore = new ProductStore();
    const userListStore = new UserListStore();
    const organizationStore = new OrganizationStore();
    const responsibleStore = new ResponsibleStore();
    const pointStore = new PointStore();
    const orderStore = new OrderStore();
    const routeStore = new RouteStore();

    const networkService = new NetworkService(endpoint);
    networkService.setToken(localStorage.getItem('token') || null);
    const authService = new AuthService(networkService, userStore, loaderStore, socketService);
    const productService = new ProductService(networkService, productStore, loaderStore);
    const userService = new UserService(networkService, userListStore);
    const organizationService = new OrganizationService(networkService, organizationStore);
    const responsibleService = new ResponsibleService(networkService, responsibleStore);
    const pointService = new PointService(networkService, pointStore);
    const orderService = new OrderService(networkService, orderStore);
    const routeService = new RouteService(networkService, routeStore);
    const statsService = new StatsService(networkService);

    this.stores = {
      [StoresNames.LoaderStore]: loaderStore,
      [StoresNames.UserStore]: userStore,
      [StoresNames.UserListStore]: userListStore,
      [StoresNames.OrganizationStore]: organizationStore,
      [StoresNames.ResponsibleStore]: responsibleStore,
      [StoresNames.ProductStore]: productStore,
      [StoresNames.PointStore]: pointStore,
      [StoresNames.OrderStore]: orderStore,
      [StoresNames.RouteStore]: routeStore,
      [StoresNames.URL]: endpoint,
    };

    this.services = {
      networkService,
      authService,
      productService,
      userService,
      organizationService,
      responsibleService,
      pointService,
      orderService,
      routeService,
      statsService
    };
  }

  componentDidMount() {
    this.services.authService.authentication();
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider {...this.stores} services={this.services}>
          <ErrorWindow />
          <Loader>
            <Router />
          </Loader>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
