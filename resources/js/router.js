import Vue from "vue";
import VueRouter from "vue-router";

// ページコンポーネントをインポートする
import PhotoList from "./pages/PhotoList.vue";
import Login from "./pages/Login.vue";

import store from "./store";

import SystemError from "./pages/errors/System.vue";

// VueRouterプラグインを使用する
// これによって<RouterView />コンポーネントなどを使うことができる
Vue.use(VueRouter);

// パスとコンポーネントのマッピング（定義）
const routes = [
    {
        path: "/",
        component: PhotoList
    },
    {
        path: "/login",
        component: Login,
        // ルートにアクセスされてページコンポーネントが切り替わる直前に呼び出される関数
        beforeEnter(to, from, next) {
            // ログイン状態をチェック、ログインしていれば/（トップページに遷移）
            if (store.getters["auth/check"]) {
                next("/");
            } else {
                // ログインしていなければ、ログインへ飛ぶ
                next();
            }
        }
    },
    {
        path: "/500",
        component: SystemError
    }
];

// VueRouterインスタンスを作成する
const router = new VueRouter({
    mode: "history",
    routes
});

// VueRouterインスタンスをエクスポートする
// app.jsでインポートするため
export default router;
