import { OK, CREATED, UNPROCESSABLE_ENTITY } from "../util";

const state = {
    user: null,
    apiStatus: null,
    loginErrorMessages: null,
    registerErrorMessages: null
};

const getters = {
    check: state => !!state.user,
    username: state => (state.user ? state.user.name : "") //ログインユーザーの名前
};

// ミューテーションの第一引数は必ずステート
const mutations = {
    setUser(state, user) {
        state.user = user;
    },
    // 、ステートを更新するための setApiStatus
    setApiStatus(state, status) {
        state.apiStatus = status;
    },
    setLoginErrorMessages(state, messages) {
        state.loginErrorMessages = messages;
    },
    setRegisterErrorMessages(state, messages) {
        state.registerErrorMessages = messages;
    }
};

// 非同期処理
const actions = {
    async register(context, data) {
        context.commit("setApiStatus", null);
        const response = await axios.post("/api/register", data);

        if (response.status === CREATED) {
            context.commit("setApiStatus", true);
            context.commit("setUser", response.data);
            return false;
        }

        context.commit("setApiStatus", false);
        if (response.status === UNPROCESSABLE_ENTITY) {
            context.commit("setRegisterErrorMessages", response.data.errors);
        } else {
            context.commit("error/setCode", response.status, { root: true });
        }
    },

    async login(context, data) {
        // 最初はnull
        context.commit("setApiStatus", null);
        // API通信が成功した場合も失敗した場合もresponseにレスポンスオブジェクトを代入する
        const response = await axios
            .post("/api/login", data)
            .catch(err => err.response || err);

        if (response.status === OK) {
            // APIの呼び出しに成功したらtrue
            context.commit("setApiStatus", true); //true 渡す
            context.commit("setUser", response.data); //response.dataを渡す
            return false;
        }

        // APIの呼び出しに失敗したら
        context.commit("setApiStatus", false);
        if (response.status === UNPROCESSABLE_ENTITY) {
            context.commit("setLoginErrorMessages", response.data.errors);
        } else {
            context.commit("error/setCode", response.status, { root: true });
        }
    },
    // ログアウト処理（nullを渡す）
    async logout(context) {
        const response = await axios.post("/api/logout");
        context.commit("setUser", null);
    },
    async currentUser(context) {
        const response = await axios.get("/api/user");
        const user = response.data || null;
        context.commit("setUser", user);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
