<template>
    <footer class="footer">
        <button v-if="isLogin" class="button button--link" @click="logout">
            Logout
        </button>
        <!-- 画面遷移が発生しない。（コンポーネントによる切り替えが発生。） -->
        <RouterLink v-else class="button button--link" to="/login">
            Login / Register
        </RouterLink>
    </footer>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
    computed: {
        ...mapState({
            apiStatus: state => state.auth.apiStatus
        }),
        ...mapGetters({
            isLogin: "auth/check"
        })
    },
    methods: {
        async logout() {
            // 非同期のアクションの処理が完了してからトップへ移動（Promiseの解決を待ってから）
            await this.$store.dispatch("auth/logout");
            if (this.apiStatus) {
                // 異なるURLへ遷移する
                this.$router.push("/login");
            }
        }
    }
};
</script>
