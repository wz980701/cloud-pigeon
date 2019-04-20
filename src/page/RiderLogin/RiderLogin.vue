<template>
    <div class="rl_page">
        <router-link to="/index" class="rl_back" tag="div">
            <img src="../../common/images/index.svg" alt="index">
        </router-link>
        <transition name="rl-fade" mode="in-out">
            <div class="rl_box" v-show="showLogin">
                <header class="rl_head">
                    <div class="logo_wrapper">
                        <img src="../../common/images/logo.png" alt="logo">
                    </div>
                </header>
                <section class="rl_form">
                    <input
                    v-model.trim="$v.phone.$model"
                    type="text"
                    class="rl_phone"
                    placeholder="请输入手机号">
                    <span
                    v-if="!$v.phone.minLength"
                    class="form-group_message"
                    >
                    * 手机号为11位
                    </span>
                    <span
                    v-if="!$v.phone.numeric"
                    class="form-group_message"
                    >
                    * 请输入正确的手机号码
                    </span>
                    <span
                    v-if="!$v.phone.maxLength"
                    class="form-group_message"
                    >
                    * 手机号为11位
                    </span>
                    <input
                    v-model.trim="$v.password.$model"
                    type="password"
                    class="rl_name"
                    placeholder="请输入密码">
                    <span
                    v-if="!$v.password.minLength"
                    class="form-group_message"
                    >
                    * 密码不能少于6位
                    </span>
                    <input
                    type="button"
                    class="rl_loginBtn"
                    value="登录"
                    @click="ToLogin"
                    >
                    <router-link to="/riderRegist" tag="div" class="rl_regist">
                        Sign Up
                    </router-link>
                </section>
            </div>
        </transition>
    </div>
</template>
<script>
import { setSessionStore, setLocalStore } from 'js/common.js'
import { Dialog } from 'vant'
import { minLength, maxLength, numeric } from 'vuelidate/lib/validators'

export default {
    name: 'RiderLogin',
    data () {
        return {
            phone: '',
            password: '',
            role: 'delivery',
            showLogin: false
        }
    },
    validations: {
        phone: {
            minLength: minLength(11),
            maxLength: maxLength(11),
            numeric
        },
        password: {
            minLength: minLength(6)
        }
    },
    mounted () {
        this.showLogin = true
    },
    methods: {
        ToLogin () {
            const formdata = new FormData()
            formdata.append('phone', this.phone)
            formdata.append('password', this.password)
            formdata.append('role', this.role)
            this.axios.post('/login', formdata).then((res) => {
                const data = res.data.data
                setSessionStore('rider_info', JSON.stringify(data))
                setLocalStore('rider_token', data.token)
                Dialog.alert({
                    message: '登录成功'
                })
                this.$router.push('/riderOrder')
            }).catch(() => {
                Dialog.alert({
                    message: '登录失败，请重新登录'
                })
                this.$router.go(0)
            })
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'sass/mixin.scss';
@import 'sass/base.scss';
@import 'sass/common.scss';
.rl_page {
    padding-top: .6rem;
    @include wh(100%, 100%);
    background-color: $theme-color;
    .rl_back {
            position: absolute;
            left: .1rem;
            top: .1rem;
    }
    .rl_head {
        .logo_wrapper {
            @include wh(.8rem, .8rem);
            @include cl;
            position: relative;
            img {
                @include wh(100%, 100%);
                @include pi(0, 0);
            }
        }
    }
    .rl_form {
        width: 80%;
        margin-top: .5rem;
        @include cl;
        .form-group_message {
            font-size: .14rem;
            @include hl(.3rem);
            color: #ffffff;
            opacity: .5;
            margin-left: .1rem;
        }
        input {
            width: 100%;
            margin-top: .1rem;
            @include hl(.4rem);
            padding-left: .1rem;
            box-sizing: border-box;
            background-color: transparent;
            border: 1px solid $font-color;
            @include borderRadius(.05rem);
            @include ph ($font-color);
            opacity: .8;
            caret-color: $font-color;
            font-size: .14rem;
            color: #ffffff;
        }
        .rl_loginBtn {
            color: $font-color;
        }
        .rl_regist {
            text-align: center;
            color: $font-color;
            margin-top: .3rem;
            opacity: .8;
        }
    }
    .rl-fade-enter-active, .rl-fade-leave-active {
        transition: all 1s;
    }
    .rl-fade-enter, .rl-fade-leave-active {
        transform: translate3d(0, -50px, 0);
        opacity: 0;
    }
}
</style>
