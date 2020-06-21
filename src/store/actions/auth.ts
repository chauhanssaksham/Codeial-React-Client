import { AnyAction } from "redux";
import { Dispatch } from "react";
import { AppActions, RootStateType, UserType } from "../../types";
import { getFormBody } from "../../helpers/utils";
import { APIUrls } from "../../helpers/URLs";
import axios from 'axios';

export const LOGIN_START = 'LOGIN_START';
export type LOGIN_START = typeof LOGIN_START;
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export type LOGIN_SUCCESS = typeof LOGIN_SUCCESS;
export const LOGIN_FAILED = 'LOGIN_FAILED';
export type LOGIN_FAILED = typeof LOGIN_FAILED;
export const SIGNUP_START = 'SIGNUP_START';
export type SIGNUP_START = typeof SIGNUP_START;
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export type SIGNUP_SUCCESS = typeof SIGNUP_SUCCESS;
export const SIGNUP_FAILED = 'SIGNUP_FAILED';
export type SIGNUP_FAILED = typeof SIGNUP_FAILED;
export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export type AUTHENTICATE_USER = typeof AUTHENTICATE_USER;
export const CLEAR_AUTH_ERRORS = 'CLEAR_AUTH_ERRORS'
export type CLEAR_AUTH_ERRORS = typeof CLEAR_AUTH_ERRORS;
export const LOG_OUT = 'LOG_OUT';
export type LOG_OUT = typeof LOG_OUT;

export interface startLoginAction extends AnyAction{
    type: LOGIN_START;
}
export interface loginSuccessAction extends AnyAction{
    type: LOGIN_SUCCESS,
    user: UserType 
}
export interface loginFailedAction extends AnyAction{
    type: LOGIN_FAILED,
    message: string
}
export interface startSingupAction extends AnyAction{
    type: SIGNUP_START;
}
export interface signupSuccessAction extends AnyAction{
    type: SIGNUP_SUCCESS,
    user: UserType
}
export interface signupFailedAction extends AnyAction{
    type: SIGNUP_FAILED,
    message: string
}
export interface authenticateUserAction extends AnyAction{
    type: AUTHENTICATE_USER,
    user: UserType
}
export interface logoutAction extends AnyAction{
    type: LOG_OUT
}
export interface clearAuthErrorsAction extends AnyAction{
    type: CLEAR_AUTH_ERRORS
}

export type AuthActionTypes = startLoginAction | loginFailedAction | loginSuccessAction | startSingupAction | signupFailedAction | signupSuccessAction | authenticateUserAction | logoutAction | clearAuthErrorsAction;


export function startLogin():startLoginAction{
    return {
        type: LOGIN_START
    }
}

export function loginSuccess(user: UserType):loginSuccessAction{
    return {
        type: LOGIN_SUCCESS,
        user: user
    }
}

export function loginFailed(msg: string):loginFailedAction{
    return {
        type: LOGIN_FAILED,
        message: msg
    }
}

export function startSignup():startSingupAction{
    return {
        type: SIGNUP_START
    }
}

export function signupSuccess(user: UserType):signupSuccessAction{
    return {
        type: SIGNUP_SUCCESS,
        user: user
    }
}

export function signupFailed(msg: string):signupFailedAction{
    return {
        type: SIGNUP_FAILED,
        message: msg
    }
}

export function authenticateUser(user: UserType):authenticateUserAction{
    return {
        type:AUTHENTICATE_USER,
        user
    }
}

export function logout():logoutAction{
    return {
        type: LOG_OUT
    }
}

export function clearAuthErrors():clearAuthErrorsAction{
    return {
        type: CLEAR_AUTH_ERRORS
    }
}


export function login(formBody: {email: string, password:string}):any{
    return (dispatch: Dispatch<AppActions>, getState: () => RootStateType) => {
        dispatch(startLogin());
        const url = APIUrls.login();
        axios.post(url, getFormBody(formBody), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if (response.data.success){
                localStorage.setItem('token', response.data.data.token);
                dispatch(loginSuccess(response.data.data.user));
                return;
            } else {
                dispatch(loginFailed(response.data.message));
            }
        }).catch(err => {
            dispatch(loginFailed(err.response.data.message));
        });
    }
}

export function signup(formBody: {name: string, email:string, password: string, confirm_password:string}):any{
    return (dispatch: Dispatch<AppActions>, getState: () => RootStateType) => {
        dispatch(startSignup());
        const url = APIUrls.signup();
        if (formBody.password !== formBody.confirm_password){
            dispatch(signupFailed("Passwords don't match"));
            return;
        }
        axios.post(url, getFormBody(formBody), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if (response.data.success){
                localStorage.setItem('token', response.data.data.token);
                dispatch(signupSuccess(response.data.data.user));
                return;
            } else {
                dispatch(signupFailed(response.data.message));
            }
        }).catch(err => {
            dispatch(signupFailed(err.response.data.message));
        });
    }
}