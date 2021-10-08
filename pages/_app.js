import '../styles/global.css';
import { Provider } from 'react-redux';
import store from '../redux/store';

import HeadComp from '../components/HeadComp'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <HeadComp />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
