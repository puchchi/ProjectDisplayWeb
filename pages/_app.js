import '../styles/global.css';
import { Provider } from 'react-redux';
import store from '../redux/store';

import HeadComp from '../components/HeadComp'

import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <>
      <HeadComp />
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
