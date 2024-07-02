import { createContext, useEffect, useReducer, ReactElement, useState } from 'react';

// third-party
import { Chance } from 'chance';
import { jwtDecode } from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT, UPDATE } from 'store/reducers/actions';
import authReducer from 'store/reducers/auth';

// project-imports
import Loader from 'components/Loader';
import axios from 'utils/axios';
import { KeyedObject } from 'types/root';
import { AuthProps, JWTContextType } from 'types/auth';
import { forgotPasswordService, login as loginService, updateProfileService } from 'services/auth';
import { getCurrentUser } from 'services/user';
import Body from 'themes/overrides/Body';

const chance = new Chance();

// constant
const initialState: AuthProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

const verifyToken: (st: string) => boolean = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded: KeyedObject = jwtDecode(accessToken);

  /**
   * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
   */
  return decoded.exp > Date.now() / 1000;
};

const setSession = (accessToken?: string | null) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: { children: ReactElement }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken && verifyToken(accessToken)) {
          setSession(accessToken);
          const response = await getCurrentUser();
          // const { user } = response;
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user: response
            }
          });
        } else {
          dispatch({
            type: LOGOUT
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: LOGOUT
        });
      }
    };

    init();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await loginService({ email, password });
    const { accessToken, user } = response;
    setSession(accessToken);
    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        user
      }
    });
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    // todo: this flow need to be recode as it not verified
    const id = chance.bb_pin();
    const response = await axios.post('/api/account/register', {
      id,
      email,
      password,
      firstName,
      lastName
    });
    let users = response.data;

    if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
      const localUsers = window.localStorage.getItem('users');
      users = [
        ...JSON.parse(localUsers!),
        {
          id,
          email,
          password,
          name: `${firstName} ${lastName}`
        }
      ];
    }

    window.localStorage.setItem('users', JSON.stringify(users));
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  const resetPassword = async (email: string) => {
    const response = forgotPasswordService({ body: { email } });
    return response;
  };

  const updateProfile = async ({ body }: any) => {
    dispatch({
      type: UPDATE,
      payload: {
        isLoggedIn: true,
        user: body
      }
    });
    const response = await updateProfileService({ body: { ...body } });
    dispatch({
      type: UPDATE,
      payload: {
        isLoggedIn: true,
        user: response
      }
    });
  };

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>{children}</JWTContext.Provider>;
};

export default JWTContext;
