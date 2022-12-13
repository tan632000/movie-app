import { Provider, useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import store from "../redux/index";
import Head from "next/head";
import Script from "next/script";
import "../styles/globals.css";
import "../styles/color.css";

const AppWrapper = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <MyApp Component={Component} pageProps={pageProps} />
    </Provider>
  );
};

function MyApp({ Component, pageProps }: any) {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <>
      <Provider store={store}>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
          <script
            defer
            type="text/javascript"
            src="https://www.gstatic.com/charts/loader.js"
          />
          <script src="https://code.createjs.com/1.0.0/createjs.min.js"></script>
          <title>Movie App</title>
        </Head>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.2.0-beta1/js/bootstrap.min.js" />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default AppWrapper;
