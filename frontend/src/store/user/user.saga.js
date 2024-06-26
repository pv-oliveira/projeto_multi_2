import { takeLatest, put, all, call } from 'redux-saga/effects';
 
import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signUpFailed,
  signOutSuccess,
  signOutFailed,
} from './user.action';

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
} from '../../utils/firebase/firebase.utils';

export function* getSnapshotFromUserAuth(
  userAuth,
  additionalDetails
) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );

    if (userSnapshot) {
      yield put(
        signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
      );
    }
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signInWithEmail({
  payload: { email, password },
}) {
  try {
    const userCredential = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );

    if (userCredential) {
      const { user } = userCredential;
      yield call(getSnapshotFromUserAuth, user);
    }
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signUp({
  payload: { email, password, displayName },
}) {
  try {
    const userCredential = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );

    if (userCredential) {
      const { user } = userCredential;
      yield put(signUpSuccess(user, { displayName }));
    }
  } catch (error) {
    yield put(signUpFailed(error));
  }
}

export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error));
  }
}

export function* signInAfterSignUp({
  payload: { user, additionalDetails },
}) {
  yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* onGoogleSignInStart() {
  yield takeLatest('user/GOOGLE_SIGN_IN_START', signInWithGoogle);
}

export function* onCheckUserSession() {
  yield takeLatest('user/CHECK_USER_SESSION', isUserAuthenticated);
}

export function* onEmailSignInStart() {
  yield takeLatest('user/EMAIL_SIGN_IN_START', signInWithEmail);
}

export function* onSignUpStart() {
  yield takeLatest('user/SIGN_UP_START', signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest('user/SIGN_IN_SUCCESS', signInAfterSignUp);
}

export function* onSignOutStart() {
  yield takeLatest('user/SIGN_OUT_START', signOut);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
