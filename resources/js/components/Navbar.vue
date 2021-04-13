<template>
    <nav class="navbar">
        <!-- 画面遷移が発生しない。（コンポーネントの切り替えが発生しない） -->
        <RouterLink class="navbar__brand" to="/">
            Vuesplash
        </RouterLink>
        <div class="navbar__menu">
            <div v-if="isLogin" class="navbar__item">
                <button class="button">
                    <i class="icon ion-md-add"></i>
                    Submit a photo
                </button>
            </div>
            <span v-if="isLogin" class="navbar__item">
                {{ username }}
            </span>
            <!-- ログインしてない時 -->
            <div v-else class="navbar__item">
                <!-- 画面遷移が発生しない。（コンポーネントの切り替えが発生しない） -->
                <RouterLink class="button button--link" to="/login">
                    Login / Register
                </RouterLink>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    computed: {
        isLogin() {
            return this.$store.getters["auth/check"];
        },
        username() {
            return this.$store.getters["auth/username"];
        }
    }
};
</script>
