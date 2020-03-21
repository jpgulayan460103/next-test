import Head from 'next/head'
import { Provider } from 'react-redux'
import { useRouter } from 'next/router'
import store from '../store'
import Layouts from './../layouts/layouts'

const Post = () => {
  const router = useRouter()
  const { pid } = router.query
  console.log(router.query);
  
  return (
    <Provider store={store}>
        <Head>
          <title>Create Next App</title>
        </Head>
        <Layouts>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-4">
              Post: {pid}
            </div>
          </div>
        </div>
        </Layouts>
      </Provider>
  );
}

export default Post;
