import '../styles/global.css'

import HeadComp from '../components/HeadComp'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <HeadComp />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
