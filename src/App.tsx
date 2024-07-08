import {
  useRoutes,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { routes } from "./routes";
import { createContext, useContext, useEffect, useReducer } from "react";
import { ActionType, reducer } from "./Reducer";
// import { CustomTheme, ToastContainer } from "@lipihipi/rtc-ui-components";
import { rtcTheme } from "./theme";
// import { APP_URL, SITE_URL, SSO_URL } from "./constant";
const initialState = {
  state: {
    app_loading: true,
    customTheme: rtcTheme,
  },
  dispatch: () => {},
};
export const AppContext = createContext<{
  state: any;
  dispatch: any;
}>(initialState);

const Main = () => {
  const { dispatch } = useContext<any>(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const ssoToken = searchParams.get("ssoToken");
  useEffect(() => {
    // auto login user if token exists
    const token = localStorage.getItem("token");
    if (token) {
      // RtcAPI.setToken(token);
      // RtcAPI.user
      //   .me()
      //   .then(({ data }) => {
      //     dispatch({
      //       type: ActionType.GET_USER_SUCCESS,
      //       payload: data.data,
      //     });

      //     dispatch({
      //       type: ActionType.SET_APP_LOADING_FLAG,
      //       payload: false,
      //     });

      //     if (location) {
      //       navigate(location.pathname);
      //     }
      //   })
      //   .catch((err: any) => {
      //     dispatch({
      //       type: ActionType.SET_APP_LOADING_FLAG,
      //       payload: false,
      //     });
      //   });
    } else {
    // check if sso token exists in url

      if (ssoToken) {
        // RtcAPI.auth
        //   .verifySso({ ssoToken: ssoToken, appName: "ClientWeb" })
        //   .then((res: any) => {
        //     RtcAPI.user.me().then(({ data }: any) => {
        //       dispatch({
        //         type: ActionType.GET_USER_SUCCESS,
        //         payload: data.data,
        //       });
        //       dispatch({
        //         type: ActionType.SET_APP_LOADING_FLAG,
        //         payload: false,
        //       });
        //       navigate(location.pathname);
        //     });
        //   })
        //   .catch((err: any) => {
        //     window.location.href = SITE_URL;
        //   });
      } else {
          // window.location.href = `${SSO_URL}/login?serviceUrl=${APP_URL}`;
      }
    }
  }, []);

  const routing = useRoutes(routes);

  return <>{routing}</>;
};

const App = ({ config }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState.state);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {/* <CustomTheme customTheme={state?.customTheme}> */}
        <Main />
        {/* <ToastContainer />
      </CustomTheme> */}
    </AppContext.Provider>
  );
};

export default App;
