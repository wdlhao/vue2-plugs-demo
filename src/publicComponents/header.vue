<template>
    <div>
        <header>
            <v-touch v-on:tap="$router.back(-1)">
                <i class="icon iconfont icon-return"></i>
            </v-touch>
            <h2>{{title}}</h2>
            <p v-if="rule">
                <router-link :to="rule.url"
                             v-if="rule.url">
                    {{rule.text}}
                </router-link>
                <v-touch v-on:tap="rule.fn" v-if="rule.fn">
                    {{rule.text}}
                </v-touch>
            </p>
        </header>
    </div>
</template>
<script>
export default {
    name: "Header",
    props: {
        title: String,
        rule: Object
    }
};
</script>
<style lang="less" scoped>
header {
    position: relative;
    height: 1.17rem;
    padding: 0 0.53rem;
    line-height: 1.17rem;
    color: #333;
    border-bottom:1px solid #EAEAEA;
    i {
        position: absolute;
        left: 0.53rem;
        width: 0.67rem;
        font-size: 0.4rem;
        font-weight: 700;
    }
    h2 {
        font-size: 0.48rem;
        text-align: center;
    }
    p {
        position: absolute;
        top: 0;
        right: 0.53rem;
        font-size: 0.4rem;
    }
}
</style>