import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import CellPhonePage from './pages/CellPhonePage'
import CellPhoneDetailsPage from './pages/CellPhoneDetailsPage'
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
import CellListPage from './pages/admin/products/cells/CellListPage'
import CellCreate from './pages/admin/products/cells/CellCreate'
import CellEdit from './pages/admin/products/cells/CellEdit'
import Footer from './components/Footer'
import OauthUserProfilePage from './pages/OauthUserProfilePage'
import TvsPage from './pages/tvsPage'
import TvDetailsPage from './pages/tvDetailsPage'
import TvListPage from './pages/admin/products/tvs/TvListPage'
import TvCreate from './pages/admin/products/tvs/TvCreate'
import TvEdit from './pages/admin/products/tvs/TvEdit'

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

          {/* CellPhones Routes */}
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

          {/* Tvs Routes */}
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
