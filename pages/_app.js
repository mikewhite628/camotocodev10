import "../styles/globals.sass";
import Layout from "../components/layout";
import { AuthUserProvider } from "../context/authContext";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <AuthUserProvider>
        <Component {...pageProps} />
      </AuthUserProvider>
    </Layout>
  );
}

export default MyApp;
