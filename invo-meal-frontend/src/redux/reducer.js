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

const allDesignationsDefState = {
    allDesignationsLoading: false,
    allDesignationsData: [],
};

export const allDesignationsReducer = (state = allDesignationsDefState, action) => {
    switch (action.type) {
        case DESIGNATIONS.REQUEST:
            return {
                allDesignationsLoading: true,
                allDesignationsData: [],
            };
        case DESIGNATIONS.SUCCESS:
            return {
                allDesignationsLoading: false,
                allDesignationsData: action.payload,
            };
        case DESIGNATIONS.FAIL:
            return {
                allDesignationsLoading: false,
                allDesignationsError: action.payload,
            };
        default:
            return state;
    }
};

const registerDefState = {
    registerLoading: false,
    registerData: {},
};

export const registerReducer = (state = registerDefState, action) => {
    switch (action.type) {
        case REGISTER.REQUEST:
            return {
                registerLoading: true,
                registerData: {},
            };
        case REGISTER.SUCCESS:
            return {
                registerLoading: false,
                registerData: action.payload,
            };
        case REGISTER.FAIL:
            return {
                registerLoading: false,
                registerError: action.payload,
            };
        case REGISTER.RESET:
            return {
                ...registerDefState,
            };
        default:
            return state;
    }
};

const loginDefState = {
    loginLoading: false,
    loginData: {},
};

export const loginReducer = (state = loginDefState, action) => {
    switch (action.type) {
        case LOGIN.REQUEST:
            return {
                loginLoading: true,
                loginData: {},
            };
        case LOGIN.SUCCESS:
            return {
                loginLoading: false,
                loginData: action.payload,
            };
        case LOGIN.FAIL:
            return {
                loginLoading: false,
                loginError: action.payload,
            };
        case LOGIN.RESET:
            return {
                ...loginDefState,
            };
        case LOGIN.FAIL_RESET:
            return {
                loginLoading: false,
                loginError: null
            };
        default:
            return state;
    }
};

const usersDefState = {
    weeklyMenuLoading: false,
    weeklyMenuData: null,
    weeklyMenuError: null,

    planLoading: false,
    planData: null,
    planError: null,

    checkSubscriptionLoading: false,
    checkSubscriptionData: null,
    checkSubscriptionError: null,

    subscribeNowLoading: false,
    subscribeNowData: null,
    subscribeNowError: null,

    invoiceLoading: false,
    invoiceData: null,
    invoiceError: null,

    invoiceUploadLoading: false,
    invoiceUploadData: null,
    invoiceUploadError: null,

    mealCancelLoading: false,
    mealCancelData: null,
    mealCancelError: null,

    mealCancelListLoading: false,
    mealCancelListData: null,
    mealCancelListError: null,
};

export const usersReducer = (state = usersDefState, action) => {
    switch (action.type) {
        case USER_WEEKLY_MENU.REQUEST:
            return {
                ...state,
                weeklyMenuLoading: true,
                weeklyMenuData: null,
                weeklyMenuError: null,
            };
        case USER_WEEKLY_MENU.SUCCESS:
            return {
                ...state,
                weeklyMenuLoading: false,
                weeklyMenuData: action.payload,
                weeklyMenuError: null,
            };
        case USER_WEEKLY_MENU.FAIL:
            return {
                ...state,
                weeklyMenuLoading: false,
                weeklyMenuData: null,
                weeklyMenuError: action.payload,
            };

        case PLANS.REQUEST:
            return {
                ...state,
                planLoading: true,
                planData: null,
                planError: null,
            };
        case PLANS.SUCCESS:
            return {
                ...state,
                planLoading: false,
                planData: action.payload,
                planError: null,
            };
        case PLANS.FAIL:
            return {
                ...state,
                planLoading: false,
                planData: null,
                planError: action.payload,
            };

        case CHECK_SUBSCRIPTION.REQUEST:
            return {
                ...state,
                checkSubscriptionLoading: true,
                checkSubscriptionData: null,
                checkSubscriptionError: null,
            };
        case CHECK_SUBSCRIPTION.SUCCESS:
            return {
                ...state,
                checkSubscriptionLoading: false,
                checkSubscriptionData: action.payload,
                checkSubscriptionError: null,
            };
        case CHECK_SUBSCRIPTION.FAIL:
            return {
                ...state,
                checkSubscriptionLoading: false,
                checkSubscriptionData: null,
                checkSubscriptionError: action.payload,
            };
        case CHECK_SUBSCRIPTION.RESET:
            return {
                ...state,
                checkSubscriptionLoading: false,
                checkSubscriptionData: null,
                checkSubscriptionError: null,
            };

        case SUBSCRIBE_NOW.REQUEST:
            return {
                ...state,
                subscribeNowLoading: true,
                subscribeNowData: null,
                subscribeNowError: null,
            };
        case SUBSCRIBE_NOW.SUCCESS:
            return {
                ...state,
                subscribeNowLoading: false,
                subscribeNowData: action.payload,
                subscribeNowError: null,
            };
        case SUBSCRIBE_NOW.FAIL:
            return {
                ...state,
                subscribeNowLoading: false,
                subscribeNowData: null,
                subscribeNowError: action.payload,
            };
        case SUBSCRIBE_NOW.RESET:
            return {
                ...state,
                subscribeNowLoading: false,
                subscribeNowData: null,
                subscribeNowError: null,
            };

        case INVOICE.REQUEST:
            return {
                ...state,
                invoiceLoading: true,
                invoiceData: null,
                invoiceError: null,
            };
        case INVOICE.SUCCESS:
            return {
                ...state,
                invoiceLoading: false,
                invoiceData: action.payload,
                invoiceError: null,
            };
        case INVOICE.FAIL:
            return {
                ...state,
                invoiceLoading: false,
                invoiceData: null,
                invoiceError: action.payload,
            };

        case INVOICE_UPLOAD.REQUEST:
            return {
                ...state,
                invoiceUploadLoading: true,
                invoiceUploadData: null,
                invoiceUploadError: null,
            };
        case INVOICE_UPLOAD.SUCCESS:
            return {
                ...state,
                invoiceUploadLoading: false,
                invoiceUploadData: action.payload,
                invoiceUploadError: null,
            };
        case INVOICE_UPLOAD.FAIL:
            return {
                ...state,
                invoiceUploadLoading: false,
                invoiceUploadData: null,
                invoiceUploadError: action.payload,
            };
        case INVOICE_UPLOAD.RESET:
            return {
                ...state,
                invoiceUploadLoading: false,
                invoiceUploadData: null,
                invoiceUploadError: null,
            };

        case MEAL_CANCEL.REQUEST:
            return {
                ...state,
                mealCancelLoading: true,
                mealCancelData: null,
                mealCancelError: null,
            };
        case MEAL_CANCEL.SUCCESS:
            return {
                ...state,
                mealCancelLoading: false,
                mealCancelData: action.payload,
                mealCancelError: null,
            };
        case MEAL_CANCEL.FAIL:
            return {
                ...state,
                mealCancelLoading: false,
                mealCancelData: null,
                mealCancelError: action.payload,
            };
        case MEAL_CANCEL.RESET:
            return {
                ...state,
                mealCancelLoading: false,
                mealCancelData: null,
                mealCancelError: null,
            };

        case MEAL_CANCEL_LIST.REQUEST:
            return {
                ...state,
                mealCancelListLoading: true,
                mealCancelListData: null,
                mealCancelListError: null,
            };
        case MEAL_CANCEL_LIST.SUCCESS:
            return {
                ...state,
                mealCancelListLoading: false,
                mealCancelListData: action.payload,
                mealCancelListError: null,
            };
        case MEAL_CANCEL_LIST.FAIL:
            return {
                ...state,
                mealCancelListLoading: false,
                mealCancelListData: null,
                mealCancelListError: action.payload,
            };
        default:
            return state;
    }
};

const adminDefState = {
    addMenuLoading: false,
    addMenuData: null,
    addMenuError: null,

    allMenusLoading: false,
    allMenusData: null,
    allMenusError: null,

    allUsersLoading: false,
    allUsersData: null,
    allUsersError: null,

    adminInvoicesLoading: false,
    adminInvoicesData: null,
    adminInvoicesError: null,

    verifyInvoiceLoading: false,
    verifyInvoiceData: null,
    verifyInvoiceError: null,

    adminCancelMealLoading: false,
    adminCancelMealData: null,
    adminCancelMealError: null,
};

export const adminReducer = (state = adminDefState, action) => {
    switch (action.type) {
        case ADD_WEEKLY_MENU.REQUEST:
            return {
                ...state,
                addMenuLoading: true,
                addMenuData: null,
                addMenuError: null,
            };
        case ADD_WEEKLY_MENU.SUCCESS:
            return {
                ...state,
                addMenuLoading: false,
                addMenuData: action.payload,
                addMenuError: null,
            };
        case ADD_WEEKLY_MENU.FAIL:
            return {
                ...state,
                addMenuLoading: false,
                addMenuData: null,
                addMenuError: action.payload,
            };
        case ADD_WEEKLY_MENU.RESET:
            return {
                ...state,
                addMenuLoading: false,
                addMenuData: null,
                addMenuError: null,
            };

        case ALL_WEEKLY_MENUS.REQUEST:
            return {
                ...state,
                allMenusLoading: true,
                allMenusData: null,
                allMenusError: null,
            };
        case ALL_WEEKLY_MENUS.SUCCESS:
            return {
                ...state,
                allMenusLoading: false,
                allMenusData: action.payload,
                allMenusError: null,
            };
        case ALL_WEEKLY_MENUS.FAIL:
            return {
                ...state,
                allMenusLoading: false,
                allMenusData: null,
                allMenusError: action.payload,
            };

        case ALL_USERS.REQUEST:
            return {
                ...state,
                allUsersLoading: true,
                allUsersData: null,
                allUsersError: null,
            };
        case ALL_USERS.SUCCESS:
            return {
                ...state,
                allUsersLoading: false,
                allUsersData: action.payload,
                allUsersError: null,
            };
        case ALL_USERS.FAIL:
            return {
                ...state,
                allUsersLoading: false,
                allUsersData: null,
                allUsersError: action.payload,
            };

        case ADMIN_INVOICES.REQUEST:
            return {
                ...state,
                adminInvoicesLoading: true,
                adminInvoicesData: null,
                adminInvoicesError: null,
            };
        case ADMIN_INVOICES.SUCCESS:
            return {
                ...state,
                adminInvoicesLoading: false,
                adminInvoicesData: action.payload,
                adminInvoicesError: null,
            };
        case ADMIN_INVOICES.FAIL:
            return {
                ...state,
                adminInvoicesLoading: false,
                adminInvoicesData: null,
                adminInvoicesError: action.payload,
            };

        case VERIFY_INVOICE.REQUEST:
            return {
                ...state,
                verifyInvoiceLoading: true,
                verifyInvoiceData: null,
                verifyInvoiceError: null,
            };
        case VERIFY_INVOICE.SUCCESS:
            return {
                ...state,
                verifyInvoiceLoading: false,
                verifyInvoiceData: action.payload,
                verifyInvoiceError: null,
            };
        case VERIFY_INVOICE.FAIL:
            return {
                ...state,
                verifyInvoiceLoading: false,
                verifyInvoiceData: null,
                verifyInvoiceError: action.payload,
            };
        case VERIFY_INVOICE.RESET:
            return {
                ...state,
                verifyInvoiceLoading: false,
                verifyInvoiceData: null,
                verifyInvoiceError: null
            };

        case ADMIN_MEAL_CANCEL_LIST.REQUEST:
            return {
                ...state,
                adminCancelMealLoading: true,
                adminCancelMealData: null,
                adminCancelMealError: null,
            };
        case ADMIN_MEAL_CANCEL_LIST.SUCCESS:
            return {
                ...state,
                adminCancelMealLoading: false,
                adminCancelMealData: action.payload,
                adminCancelMealError: null,
            };
        case ADMIN_MEAL_CANCEL_LIST.FAIL:
            return {
                ...state,
                adminCancelMealLoading: false,
                adminCancelMealData: null,
                adminCancelMealError: action.payload,
            };
        default:
            return state;
    }
};