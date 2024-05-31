import {
  createAction,
  withMatcher,
} from '../../utils/reducer/reducer.utils';

export const checkUserSession = withMatcher(
  () => createAction('user/CHECK_USER_SESSION')
);

export const setCurrentUser = withMatcher(
  (user) =>
    createAction('user/SET_CURRENT_USER', user)
);

export const googleSignInStart = withMatcher(
  () => createAction('user/GOOGLE_SIGN_IN_START')
);

export const emailSignInStart = withMatcher(
  (email, password) =>
    createAction('user/EMAIL_SIGN_IN_START', { email, password })
);

export const signInSuccess = withMatcher(
  (user) =>
    createAction('user/SIGN_IN_SUCCESS', user)
);

export const signInFailed = withMatcher(
  (error) =>
    createAction('user/SIGN_IN_FAILED', error)
);

export const signUpStart = withMatcher(
  (email, password, displayName) =>
    createAction('user/SIGN_UP_START', {
      email,
      password,
      displayName,
    })
);

export const signUpSuccess = withMatcher(
  (user, additionalDetails) =>
    createAction('user/SIGN_UP_SUCCESS', { user, additionalDetails })
);

export const signUpFailed = withMatcher(
  (error) =>
    createAction('user/SIGN_UP_FAILED', error)
);

export const signOutStart = withMatcher(
  () => createAction('user/SIGN_OUT_START')
);

export const signOutSuccess = withMatcher(
  () => createAction('user/SIGN_OUT_SUCCESS')
);

export const signOutFailed = withMatcher(
  (error) =>
    createAction('user/SIGN_OUT_FAILED', error)
);
