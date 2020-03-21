import Head from 'next/head'
import Headers from '../../components/Headers'
import Menus from '../../components/Menus'
import LoginForm from '../../components/LoginForm'
import { Provider } from 'react-redux'
import store from '../../store'
import { useRouter } from 'next/router'

const Posts = () => {
  const router = useRouter()
  const { pid } = router.query
  return (
    <Provider store={store}>
        <Head>
          <title>Create Next App</title>
        </Head>
        <Headers />
        <Menus />
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <LoginForm />
              Posts: {pid}
            </div>
          </div>
        </div>
      </Provider>
  );
}

export default Posts;
