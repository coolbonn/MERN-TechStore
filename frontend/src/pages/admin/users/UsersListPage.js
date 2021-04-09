import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, userDeleteAction } from '../../../actions/userActions'
import { Message } from '../../../components/Messages'
import Loader from '../../../components/Loader'
import { PaginateUser } from '../../../components/Paginate'

const UsersListPage = ({ match }) => {
  const pageNumber = match.params.pageNumber

  const dispatch = useDispatch()

  const allUsers = useSelector((state) => state.users)
  const { users, loading, error, pages } = allUsers

  const deleteUser = useSelector((state) => state.userDelete)
  const { success, error: errorDelete } = deleteUser

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(getAllUsers(pageNumber))
  }, [dispatch, success, pageNumber])

  const deleteUserHandler = (id) => {
    if (window.confirm('Are You Sure')) {
      dispatch(userDeleteAction(id))
    }
  }

  return (
    <>
      <Link to='/admin' className='go_back'>
        <i className='fas fa-arrow-circle-left'></i>
      </Link>
      <div className='users_container'>
        {success && <Message className='success'>Remove Successful</Message>}
        {errorDelete && <Message className='danger'>{errorDelete}</Message>}
        {loading && <Loader className='loader_container' />}
        {error && <Message className='danger'>{error}</Message>}
        {users && (
          <>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>AGE</th>
                  <th>CREATED AT</th>
                  <th>IS ADMIN</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              {users.map((user) => (
                <tbody key={user._id}>
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>{user.createdAt.substring(0, 10)}</td>
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
                        onClick={() => deleteUserHandler(user._id)}
                      ></i>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
            <PaginateUser pages={pages} isAdmin={true} />
          </>
        )}
      </div>
    </>
  )
}

export default UsersListPage
