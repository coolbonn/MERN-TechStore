import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, userDeleteAction } from '../../../actions/userActions'
import { Message, AlertMessage } from '../../../components/Messages'
import Loader from '../../../components/Loader'
import { PaginateUser } from '../../../components/Paginate'

const UsersListPage = ({ match }) => {
  const pageNumber = match.params.pageNumber

  const [showAlert, setShowAlert] = useState(false)

  const dispatch = useDispatch()

  const allUsers = useSelector((state) => state.users)
  const { users, loading, error, pages, count } = allUsers

  const deleteUser = useSelector((state) => state.userDelete)
  const { success, error: errorDelete } = deleteUser

  useEffect(() => {
    dispatch(getAllUsers(pageNumber))
  }, [dispatch, success, pageNumber])

  const deleteUserHandler = (id) => {
    dispatch(userDeleteAction(id))
    window.location.reload()
  }

  return (
    <>
      <div className='product_list_nav'>
        <Link to='/admin' className='go_back'>
          <i className='fas fa-arrow-circle-left'></i>
        </Link>
        <div className='count'>
          <h3>Total Users: {count === 0 ? 0 : count}</h3>
        </div>
      </div>
      <div className='users_container'>
        {errorDelete && <Message className='danger'>{errorDelete}</Message>}
        {loading && <Loader className='loader_container' />}
        {error && <Message className='danger'>{error}</Message>}
        {users && (
          <>
            <table>
              <thead>
                <tr>
                  <th className='u_t_hide_id'>ID</th>
                  <th>NAME</th>
                  <th className='u_t_hide_email'>EMAIL</th>
                  <th className='u_t_hide_age'>AGE</th>
                  <th className='u_t_hide_crt'>CREATED AT</th>
                  <th>IS ADMIN</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              {users.map((user) => (
                <>
                  <tbody key={user._id}>
                    <tr>
                      <td className='u_t_hide_id'>{user._id}</td>
                      <td>{user.username}</td>
                      <td className='u_t_hide_email'>{user.email}</td>
                      <td className='u_t_hide_age'>{user.age}</td>
                      <td className='u_t_hide_crt'>
                        {user.createdAt.substring(0, 10)}
                      </td>
                      <td>
                        {user.isAdmin ? (
                          <i className='fas fa-check'></i>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                      </td>
                      <td>
                        <Link to={`/admin/user/${user._id}/edit`}>
                          <i className='far fa-edit'></i>
                        </Link>
                      </td>
                      <td>
                        <i
                          className='fas fa-trash-alt'
                          onClick={() => setShowAlert(true)}
                        ></i>
                      </td>
                    </tr>
                  </tbody>
                  {showAlert && (
                    <AlertMessage
                      text={'Are You Sure?'}
                      btnTxt={'Delete'}
                      onCancel={() => setShowAlert(false)}
                      onDelete={() => deleteUserHandler(user._id)}
                    />
                  )}
                </>
              ))}
            </table>
            <PaginateUser pages={pages} isAdmin={true} adminRoute={'users'} />
          </>
        )}
      </div>
    </>
  )
}

export default UsersListPage
