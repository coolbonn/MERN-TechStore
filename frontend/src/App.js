import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import CartItemsPage from './pages/CartItemsPage'
import ShippingPage from './pages/ShippingPage'
import PmethodPage from './pages/PmethodPage'
import OrderPage from './pages/OrderPage'
import OrderDetailsPage from './pages/OrderDetailsPage'
import ProfilePage from './pages/ProfilePage'
import AdminPage from './pages/admin/AdminPage'
import UsersListPage from './pages/admin/users/UsersListPage'
import UserUpdatePage from './pages/admin/users/UserUpdatePage'
import OrderListPage from './pages/admin/orders/OrderListPage'
import ProductPage from './pages/admin/products/ProductsPage'
import ErrorPage from './pages/404'
import OauthUserProfilePage from './pages/OauthUserProfilePage'
import Footer from './components/Footer'

import CellPhonePage from './pages/CellPhonePage'
import CellPhoneDetailsPage from './pages/CellPhoneDetailsPage'
import CellListPage from './pages/admin/products/cells/CellListPage'
import CellCreate from './pages/admin/products/cells/CellCreate'
import CellEdit from './pages/admin/products/cells/CellEdit'

import TvsPage from './pages/tvsPage'
import TvDetailsPage from './pages/tvDetailsPage'
import TvListPage from './pages/admin/products/tvs/TvListPage'
import TvCreate from './pages/admin/products/tvs/TvCreate'
import TvEdit from './pages/admin/products/tvs/TvEdit'

import ComputerPage from './pages/ComputerPage'
import ComputerListPage from './pages/admin/products/computers/ComputerListPage'
import ComputerCreate from './pages/admin/products/computers/ComputerCreate'
import ComputerEdit from './pages/admin/products/computers/ComputerEdit'
import ComputerDetailsPage from './pages/computerDetailsPage'

import AccessoryPage from './pages/AccessoryPage'
import AccessoryListPage from './pages/admin/products/accessories/accessoryListPage'
import AccessoryCreate from './pages/admin/products/accessories/accessoryCreate'
import AccessoryDetailsPage from './pages/accessoryDetailsPage'
import AccessoryEdit from './pages/admin/products/accessories/accessoryEdit'

const App = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return (
    <Router>
      <Header />
      <main className='container'>
        <Switch>
          <Route path='/' component={HomePage} exact />
          <Route path='/order/:id' component={OrderDetailsPage} />
          <Route path='/shipping' component={ShippingPage} />
          <Route path='/p-method' component={PmethodPage} />
          <Route path='/order' component={OrderPage} exact />
          <Route path='/profile' component={ProfilePage} exact />
          <Route path='/profile/:id' component={OauthUserProfilePage} />

          {/* CellPhone Routes */}
          <Route path='/cellphones' component={CellPhonePage} exact />
          <Route
            path='/cellphones/page/:pageNumber'
            component={CellPhonePage}
            exact
          />
          <Route
            path='/cellphones/sort/:sortBy'
            component={CellPhonePage}
            exact
          />
          <Route
            path='/cellphones/search/:keyword'
            component={CellPhonePage}
            exact
          />
          <Route
            path='/cellphones/search/:keyword/page/:pageNumber'
            component={CellPhonePage}
          />
          <Route
            path='/cellphones/brand/:brand'
            component={CellPhonePage}
            exact
          />
          <Route
            path='/cellphones/brand/:brand/page/:pageNumber'
            component={CellPhonePage}
          />
          <Route path='/cellphones/:id' component={CellPhoneDetailsPage} />

          {/* Tv Routes */}
          <Route path='/tvs' component={TvsPage} exact />
          <Route path='/tvs/page/:pageNumber' component={TvsPage} exact />
          <Route path='/tvs/sort/:sortBy' component={TvsPage} exact />
          <Route path='/tvs/search/:keyword' component={TvsPage} exact />
          <Route
            path='/tvs/search/:keyword/page/:pageNumber'
            component={TvsPage}
          />
          <Route path='/tvs/brand/:brand' component={TvsPage} exact />
          <Route
            path='/tvs/brand/:brand/page/:pageNumber'
            component={TvsPage}
          />
          <Route path='/tvs/:id' component={TvDetailsPage} />

          {/* Computer Routes */}
          <Route path='/computers' component={ComputerPage} exact />
          <Route
            path='/computers/page/:pageNumber'
            component={ComputerPage}
            exact
          />
          <Route
            path='/computers/sort/:sortBy'
            component={ComputerPage}
            exact
          />
          <Route
            path='/computers/search/:keyword'
            component={ComputerPage}
            exact
          />
          <Route
            path='/computers/search/:keyword/page/:pageNumber'
            component={ComputerPage}
          />
          <Route
            path='/computers/brand/:brand'
            component={ComputerPage}
            exact
          />
          <Route
            path='/computers/brand/:brand/page/:pageNumber'
            component={ComputerPage}
          />
          <Route path='/computers/:id' component={ComputerDetailsPage} />

          {/* Accessory Routes */}
          <Route path='/accessories' component={AccessoryPage} exact />
          <Route
            path='/accessories/page/:pageNumber'
            component={AccessoryPage}
            exact
          />
          <Route
            path='/accessories/sort/:sortBy'
            component={AccessoryPage}
            exact
          />
          <Route
            path='/accessories/search/:keyword'
            component={AccessoryPage}
            exact
          />
          <Route
            path='/accessories/search/:keyword/page/:pageNumber'
            component={AccessoryPage}
          />
          <Route
            path='/accessories/brand/:brand'
            component={AccessoryPage}
            exact
          />
          <Route
            path='/accessories/brand/:brand/page/:pageNumber'
            component={AccessoryPage}
          />
          <Route path='/accessories/:id' component={AccessoryDetailsPage} />

          <Route path='/cart/:id?' component={CartItemsPage} />
          {userInfo && userInfo.isAdmin && (
            <>
              <Route path='/admin' component={AdminPage} exact />
              <Route path='/admin/users' component={UsersListPage} exact />
              <Route
                path='/admin/users/page/:pageNumber'
                component={UsersListPage}
              />
              <Route path='/admin/user/:id/edit' component={UserUpdatePage} />
              <Route path='/admin/orders' component={OrderListPage} />
              <Route path='/admin/products' component={ProductPage} />
              <Route
                path='/admin/product/cells'
                component={CellListPage}
                exact
              />
              <Route
                path='/admin/product/cells/page/:pageNumber'
                component={CellListPage}
              />
              <Route
                path='/admin/product/cells/create'
                component={CellCreate}
              />
              <Route
                path='/admin/product/cells/:id/edit'
                component={CellEdit}
              />

              <Route path='/admin/product/tvs' component={TvListPage} exact />
              <Route
                path='/admin/product/tvs/page/:pageNumber'
                component={TvListPage}
              />
              <Route path='/admin/product/tvs/create' component={TvCreate} />
              <Route path='/admin/product/tvs/:id/edit' component={TvEdit} />

              <Route
                path='/admin/product/computers'
                component={ComputerListPage}
                exact
              />
              <Route
                path='/admin/product/computers/page/:pageNumber'
                component={ComputerListPage}
                exact
              />
              <Route
                path='/admin/product/computers/create'
                component={ComputerCreate}
              />
              <Route
                path='/admin/product/computers/:id/edit'
                component={ComputerEdit}
              />

              <Route
                path='/admin/product/accessories'
                component={AccessoryListPage}
                exact
              />
              <Route
                path='/admin/product/accessories/page/:pageNumber'
                component={AccessoryListPage}
              />
              <Route
                path='/admin/product/accessories/create'
                component={AccessoryCreate}
              />
              <Route
                path='/admin/product/accessories/:id/edit'
                component={AccessoryEdit}
              />
            </>
          )}
          <Route component={ErrorPage} />
        </Switch>
      </main>
      <hr />
      <Footer />
    </Router>
  )
}

export default App
