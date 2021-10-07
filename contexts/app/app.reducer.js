export const initialState = {
  isSticky: false,
  isSidebarSticky: true,
  logged: true
};

export function reducer(state, { type }) {
  switch (type) {
    case 'SET_STICKY':
      return {
        ...state,
        isSticky: true,
      };
    case 'REMOVE_STICKY':
      return {
        ...state,
        isSticky: false,
      };
    case 'SET_SIDEBAR_STICKY':
      return {
        ...state,
        isSidebarSticky: true,
      };
    case 'SET_LOGGED_IN':
      return {
        ...state,
        logged: true,
      };
    case 'SET_LOGGED_OUT':
      return {
        ...state,
        logged: false,
      };
    case 'REMOVE_SIDEBAR_STICKY':
      return {
        ...state,
        isSidebarSticky: false,
      };
    default: {
      throw new Error(`Unsupported action type: ${type}`);
    }
  }
}
