import '../styles/globals.css'
import { AppWrapper } from '../lib/state'

function MyApp({ Component, pageProps }) {
  return <AppWrapper>
    <Component {...pageProps} />
  </AppWrapper>
}

export default MyApp
