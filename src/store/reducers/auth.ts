// action - state management
import { REGISTER, LOGIN, LOGOUT, UPDATE } from './actions';

// types
import { AuthProps, AuthActionProps } from 'types/auth';

// initial state
export const initialState: AuthProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

// ==============================|| AUTH REDUCER ||============================== //

const auth = (state = initialState, action: AuthActionProps) => {
  switch (action.type) {
    case REGISTER: {
      const { user } = action.payload!;
      return {
        ...state,
        user
      };
    }
    case LOGIN: {
      const { user } = action.payload!;
      return {
        ...state,
        isLoggedIn: true,
        isInitialized: true,
        user
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isInitialized: true,
        isLoggedIn: false,
        user: null
      };
    }

    case UPDATE: {
      const { user } = action.payload!;

      console.log('user', user)
      return {
        ...state,
        user: {
          ...state.user,
          ...user
        }
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default auth;
