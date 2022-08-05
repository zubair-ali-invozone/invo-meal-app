import Axios from "axios";
import {
    ADD_WEEKLY_MENU, ADMIN_INVOICES, ADMIN_MEAL_CANCEL_LIST, ALL_USERS, ALL_WEEKLY_MENUS,
    CHECK_SUBSCRIPTION,
    DESIGNATIONS,
    INVOICE, INVOICE_UPLOAD,
    LOGIN, MEAL_CANCEL, MEAL_CANCEL_LIST,
    PLANS,
    REGISTER,
    SUBSCRIBE_NOW,
    USER_WEEKLY_MENU, VERIFY_INVOICE
} from "./contants";

const API_PATH = "http://localhost:5000/api";

const SITE_DATA = process.env.REACT_APP_SITE_DATE;

const SITE_TOKEN = process.env.REACT_APP_SITE_TOKEN;

export const allDesignations = () => async (dispatch) => {
    dispatch({type: DESIGNATIONS.REQUEST});
    const headers = {"Content-Type": "application/json"};
    try {
        const {data} = await Axios.get(`${API_PATH}/designations`, {
            headers: headers,
        });
        dispatch({type: DESIGNATIONS.SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: DESIGNATIONS.FAIL, payload: error.message});
    }
};

export const register = (dataObj) => async (dispatch) => {
    dispatch({type: REGISTER.REQUEST});
    const headers = {"Content-Type": "application/json"};
    try {
        const {data} = await Axios.post(`${API_PATH}/register`, dataObj, {
            headers: headers,
        });
        localStorage.setItem(SITE_DATA, JSON.stringify(data.data));
        localStorage.setItem(SITE_TOKEN, JSON.stringify(data.accessToken));
        dispatch({type: REGISTER.SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: REGISTER.FAIL, payload: error});
    }
};

export const registerReset = () => async (dispatch) => {
    dispatch({type: REGISTER.RESET});
};

export const loginAction = (dataObj) => async (dispatch) => {
    dispatch({type: LOGIN.REQUEST});
    const headers = {"Content-Type": "application/json"};
    try {
        const {data} = await Axios.post(`${API_PATH}/login`, dataObj, {headers: headers});
        localStorage.setItem(SITE_DATA, JSON.stringify(data.data));
        localStorage.setItem(SITE_TOKEN, JSON.stringify(data.accessToken));
        dispatch({type: LOGIN.SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: LOGIN.FAIL, payload: error});
    }
};

export const loginReset = () => async (dispatch) => {
    dispatch({type: LOGIN.RESET});
};

export const loginFailReset = () => async (dispatch) => {
    dispatch({type: LOGIN.FAIL_RESET});
};

export const userWeeklyMenuAction = () => async (dispatch) => {
    const TOKEN = JSON.parse(localStorage.getItem("siteToken"));
    dispatch({type: USER_WEEKLY_MENU.REQUEST});
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
    };
    try {
        const {data} = await Axios.get(`${API_PATH}/user/weekly-menu`, {headers: headers});
        dispatch({type: USER_WEEKLY_MENU.SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: USER_WEEKLY_MENU.FAIL, payload: error});
    }
};

export const plans = () => async (dispatch) => {
    const TOKEN = JSON.parse(localStorage.getItem("siteToken"));
    dispatch({type: PLANS.REQUEST});
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
    };
    try {
        const {data} = await Axios.get(`${API_PATH}/user/plans`, {headers: headers});
        dispatch({type: PLANS.SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PLANS.FAIL, payload: error});
    }
};

export const checkSubscription = () => async (dispatch) => {
    const TOKEN = JSON.parse(localStorage.getItem("siteToken"));
    dispatch({type: CHECK_SUBSCRIPTION.REQUEST});
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
    };
    try {
        const {data} = await Axios.get(`${API_PATH}/user/check-subscription`, {headers: headers});
        dispatch({type: CHECK_SUBSCRIPTION.SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: CHECK_SUBSCRIPTION.FAIL, payload: error});
    }
};

export const checkSubscriptionReset = () => async (dispatch) => {
    dispatch({type: CHECK_SUBSCRIPTION.RESET});
};

export const subscribeNow = (dataObj) => async (dispatch) => {
    const TOKEN = JSON.parse(localStorage.getItem("siteToken"));
    dispatch({type: SUBSCRIBE_NOW.REQUEST});
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
    };
    try {
        const {data} = await Axios.post(`${API_PATH}/user/subscribe`, dataObj, {headers: headers});
        dispatch({type: SUBSCRIBE_NOW.SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: SUBSCRIBE_NOW.FAIL, payload: error});
    }
};

export const subscribeNowReset = () => async (dispatch) => {
    dispatch({type: SUBSCRIBE_NOW.RESET});
};

export const invoices = (dataObj) => async (dispatch) => {
    const TOKEN = JSON.parse(localStorage.getItem("siteToken"));
    dispatch({type: INVOICE.REQUEST});
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
    };
    try {
        const {data} = await Axios.post(`${API_PATH}/user/invoices`, dataObj, {headers: headers});
        dispatch({type: INVOICE.SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: INVOICE.FAIL, payload: error});
    }
};

export const invoiceUpload = (dataObj) => async (dispatch) => {
    const TOKEN = JSON.parse(localStorage.getItem("siteToken"));
    dispatch({type: INVOICE_UPLOAD.REQUEST});
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
    };
    try {
        const {data} = await Axios.post(`${API_PATH}/user/upload-payment-proof`, dataObj, {headers: headers});
        dispatch({type: INVOICE_UPLOAD.SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: INVOICE_UPLOAD.FAIL, payload: error});
    }
};

export const invoiceUploadReset = () => async (dispatch) => {
    const TOKEN = JSON.parse(localStorage.getItem("siteToken"));
    dispatch({type: INVOICE_UPLOAD.RESET});
};

export const cancelMealRequest = (dataObj) => async (dispatch) => {
    const TOKEN = JSON.parse(localStorage.getItem("siteToken"));
    dispatch({type: MEAL_CANCEL.REQUEST});
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
    };
    try {
        const {data} = await Axios.post(`${API_PATH}/user/cancel-meal`, dataObj, {headers: headers});
        dispatch({type: MEAL_CANCEL.SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: MEAL_CANCEL.FAIL, payload: error});
    }
};

export const cancelMealRequestReset = () => async (dispatch) => {
    dispatch({type: MEAL_CANCEL.RESET});
};

export const cancelMealList = () => async (dispatch) => {
    const TOKEN = JSON.parse(localStorage.getItem("siteToken"));
    dispatch({type: MEAL_CANCEL_LIST.REQUEST});
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
    };
    try {
        const {data} = await Axios.get(`${API_PATH}/user/cancel-meal-list`, {headers: headers});
        dispatch({type: MEAL_CANCEL_LIST.SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: MEAL_CANCEL_LIST.FAIL, payload: error});
    }
};

export const addWeeklyMenu = (dataObj) => async (dispatch) => {
    const TOKEN = JSON.parse(localStorage.getItem("siteToken"));
    dispatch({type: ADD_WEEKLY_MENU.REQUEST});
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
    };
    try {
        const {data} = await Axios.post(`${API_PATH}/admin/upload-weekly-menu`, dataObj, {headers: headers});
        dispatch({type: ADD_WEEKLY_MENU.SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: ADD_WEEKLY_MENU.FAIL, payload: error});
    }
};

export const addWeeklyMenuReset = () => async (dispatch) => {
    dispatch({type: ADD_WEEKLY_MENU.RESET});
};

export const allWeeklyMenus = (dataObj) => async (dispatch) => {
    const TOKEN = JSON.parse(localStorage.getItem("siteToken"));
    dispatch({type: ALL_WEEKLY_MENUS.REQUEST});
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
    };
    try {
        const {data} = await Axios.post(`${API_PATH}/admin/all-weekly-menus`, dataObj, {headers: headers});
        dispatch({type: ALL_WEEKLY_MENUS.SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: ALL_WEEKLY_MENUS.FAIL, payload: error});
    }
};

export const allUsers = (dataObj) => async (dispatch) => {
    const TOKEN = JSON.parse(localStorage.getItem("siteToken"));
    dispatch({type: ALL_USERS.REQUEST});
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
    };
    try {
        const {data} = await Axios.post(`${API_PATH}/admin/all-users`, dataObj, {headers: headers});
        dispatch({type: ALL_USERS.SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: ALL_USERS.FAIL, payload: error});
    }
};

export const adminInvoices = (dataObj) => async (dispatch) => {
    const TOKEN = JSON.parse(localStorage.getItem("siteToken"));
    dispatch({type: ADMIN_INVOICES.REQUEST});
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
    };
    try {
        const {data} = await Axios.post(`${API_PATH}/admin/all-invoices`, dataObj, {headers: headers});
        dispatch({type: ADMIN_INVOICES.SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: ADMIN_INVOICES.FAIL, payload: error});
    }
};

export const verifyInvoice = (dataObj) => async (dispatch) => {
    const TOKEN = JSON.parse(localStorage.getItem("siteToken"));
    dispatch({type: VERIFY_INVOICE.REQUEST});
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
    };
    try {
        const {data} = await Axios.post(`${API_PATH}/admin/verify-invoice`, dataObj, {headers: headers});
        dispatch({type: VERIFY_INVOICE.SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: VERIFY_INVOICE.FAIL, payload: error});
    }
};

export const verifyInvoiceReset = () => async (dispatch) => {
    dispatch({type: VERIFY_INVOICE.RESET});
};

export const mealCancelList = (dataObj) => async (dispatch) => {
    const TOKEN = JSON.parse(localStorage.getItem("siteToken"));
    dispatch({type: ADMIN_MEAL_CANCEL_LIST.REQUEST});
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
    };
    try {
        const {data} = await Axios.post(`${API_PATH}/admin/meal-users`, dataObj, {headers: headers});
        dispatch({type: ADMIN_MEAL_CANCEL_LIST.SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: ADMIN_MEAL_CANCEL_LIST.FAIL, payload: error});
    }
};

