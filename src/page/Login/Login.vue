<template>
    <div class="l_page">
        <router-link to="/index" class="l_back" tag="div">
            <img src="../../common/images/index.svg" alt="index">
        </router-link>
        <transition name="rl-fade" mode="in-out">
            <div class="l_box" v-show="showLogin">
                <header class="l_head">
                    <div class="logo_wrapper">
                        <img src="../../common/images/logo.png" alt="logo">
                    </div>
                </header>
                <section class="l_form">
                    <input
                    autofocus
                    v-model.trim="$v.formdata.phone.$model"
                    type="text"
                    class="l_phone"
                    placeholder="请输入手机号">
                    <span
                    v-if="!$v.formdata.phone.minLength"
                    class="form-group_message"
                    >
                    * 手机号为11位
                    </span>
                    <span
                    v-if="!$v.formdata.phone.numeric"
                    class="form-group_message"
                    >
                    * 请输入正确的手机号码
                    </span>
                    <span
                    v-if="!$v.formdata.phone.maxLength"
                    class="form-group_message"
                    >
                    * 手机号为11位
                    </span>
                    <input
                    v-model.trim="$v.formdata.password.$model"
                    type="password"
                    class="l_name"
                    placeholder="请输入密码">
                    <span
                    v-if="!$v.formdata.password.minLength"
                    class="form-group_message"
                    >
                    * 密码不能少于6位
                    </span>
                    <input
                    type="button"
                    class="l_loginBtn"
                    value="登录"
                    @click="ToLogin"
                    >
                    <router-link
                    v-if="formdata.role === 'user'"
                    to="/studentRegist"
                    tag="div"
                    class="l_regist">
                        Sign Up
                    </router-link>
                    <router-link
                    v-else
                    ref="signUp"
                    to="/riderRegist"
                    tag="div"
                    class="l_regist">
                        Sign Up
                    </router-link>
                </section>
            </div>
        </transition>
    </div>
</template>
<script>
import { Dialog } from 'vant'
import { minLength, maxLength, numeric, required } from 'vuelidate/lib/validators'
import { setSessionStore, setLocalStore, getFormdata, setCookie, hideMenu } from 'js/common.js'
import { login, getOpenid } from 'js/api.js'
import { RES_OK, LOST_ID } from 'js/config.js'

export default {
    name: 'StudentLogin',
    data () {
        return {
            formdata: {
                role: 'user',
                phone: '',
                password: '',
            },
            path: '/home',
            showLogin: false
        }
    },
    validations: {
        formdata: {
            phone: {
                minLength: minLength(11),
                maxLength: maxLength(11),
                numeric,
                required
            },
            password: {
                minLength: minLength(6),
                required
            }
        }
    },
    created () {
        hideMenu()
        if (this.$route.path.split('/')[1] !== 'studentLogin') {    //判断是用户登录还是骑手登录
            this.formdata.role = 'delivery'
            this.path = '/riderOrder'
        }
    },
    mounted () {
        this.showLogin = true
    },
    methods: {
        ToLogin () {
            if (this.$v.$invalid) { //如果没按要求格式填写，则报错
                Dialog.alert({
                    message: '请正确填写账号密码'
                })
            } else {
                const formdata = getFormdata(this.formdata)
                    login(formdata).then((res) => {
                        this.getRes(res)
                    }).catch(() => {
                        this.getFail()
                    })
            }
        },
        getRes (res) {
            const code = res.data.code
            if (code === RES_OK) {   //当code不为0，即登录不成功时，报错
                this.getSuc(res)
            } else if (code === LOST_ID) {
                Dialog.alert({
                    message: '请从服务号菜单登录'
                })
            } else {
                Dialog.alert({
                    message: '账号或密码有误'
                })
            }
        },
        getSuc (res) {
            const data = res.data.data
            this.getStore(data)
            Dialog.alert({
                message: '登录成功'
            })
            this.$router.push(this.path)
        },
        getFail () {
            Dialog.alert({
                message: '登录失败'
            })
        },
        getStore (data) {
            if (this.formdata.role === 'user') {
                setSessionStore('user_info', JSON.stringify(data))
                setLocalStore('user_token', data.token)
                setCookie('user_token', data.token, 30)
            } else {
                setSessionStore('rider_info', JSON.stringify(data))
                setLocalStore('rider_token', data.token)
                setCookie('rider_token', data.token, 30)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'sass/mixin.scss';
@import 'sass/base.scss';
@import 'sass/common.scss';
.l_page {
    padding-top: .6rem;
    @include wh(100%, 100%);
    background-color: $theme-color;
    .l_back {
            position: absolute;
            left: .1rem;
            top: .1rem;
    }
    .l_head {
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
    .l_form {
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
        .l_loginBtn {
            color: $font-color;
        }
        .l_regist {
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
