<template>
    <div class="rg_page">
        <router-link to="/index" class="rg_back" tag="div">
            <img src="../../common/images/index.svg" alt="index">
        </router-link>
        <transition name="rg-fade" mode="in-out">
            <div class="rg_box" v-show="showRegist">
                <header class="rg_head">
                    <div class="logo_wrapper">
                        <img src="../../common/images/logo.png" alt="logo">
                    </div>
                </header>
                <section class="rg_form">
                    <input
                    v-model.trim="$v.formdata.name.$model"
                    type="text"
                    class="rg_name"
                    placeholder="请输入姓名">
                    <span
                    v-if="!$v.formdata.name.required"
                    class="form-group_message"
                    >
                    * 必须输入姓名
                    </span>
                    <span
                    v-if="!$v.formdata.name.minLength"
                    class="form-group_message"
                    >
                    * 请输入真实姓名
                    </span>
                    <input
                    v-model.trim="$v.formdata.sid.$model"
                    type="text"
                    class="rg_studentNum"
                    placeholder="请输入学号">
                    <span
                    v-if="!$v.formdata.sid.required"
                    class="form-group_message"
                    >
                    * 必须输入学号
                    </span>
                    <span
                    v-if="!$v.formdata.sid.minLength"
                    class="form-group_message"
                    >
                    * 学号为10位
                    </span>
                    <span
                    v-if="!$v.formdata.sid.maxLength"
                    class="form-group_message"
                    >
                    * 学号为10位
                    </span>
                    <input
                    v-model.trim="$v.formdata.phone.$model"
                    type="text"
                    class="rg_phone"
                    placeholder="请输入手机号">
                    <span
                    v-if="!$v.formdata.phone.minLength"
                    class="form-group_message"
                    >
                    * 手机号为11位
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
                    class="rg_name"
                    placeholder="请输入密码">
                    <span
                    v-if="!$v.formdata.password.minLength"
                    class="form-group_message"
                    >
                    * 密码不能少于6位
                    </span>
                    <input
                    type="button"
                    class="rg_registBtn"
                    value="注册"
                    @click="ToRegist"
                    >
                    <router-link to="/riderLogin" tag="div" class="rg_login">
                        Sign In
                    </router-link>
                </section>
            </div>
        </transition>
    </div>
</template>
<script>
import { Dialog } from 'vant'
import { required, minLength, maxLength, numeric } from 'vuelidate/lib/validators'
import { getFormdata } from 'js/common.js'
import { regist } from 'js/api.js'

export default {
    name: 'RiderRegist',
    data () {
        return {
            formdata: {
                name: '',
                phone: '',
                password: '',
                sid: '',
                role: 'delivery'
            },
            showRegist: false
        }
    },
    validations: {
        formdata: {
            name: {
                required,
                minLength: minLength(2)
            },
            sid: {
                required,
                minLength: minLength(10),
                maxLength: maxLength(10)
            },
            phone: {
                minLength: minLength(11),
                maxLength: maxLength(11),
                numeric
            },
            password: {
                minLength: minLength(6)
            }
        }
    },
    mounted () {
        this.showRegist = true
    },
    methods: {
        ToRegist () {
            if (this.$v.$invalid) {
                this.ToRemind('请正确填写信息')
            } else {
                const formdata = getFormdata(this.formdata)
                regist(formdata).then((res) => {
                    this.getRes(res)
                }).catch(() => {
                    this.getFail()
                })
            }
        },
        getRes (res) {
            const code = res.data.code
            if (code !== 0) {
                Dialog.alert({
                    message: '该手机号已被注册'
                })
            } else {
                this.getSuc()
            }
        },
        getSuc () {
            this.ToRemind('注册成功,请耐心等待后台审核')
            this.$router.push('/index')
        },
        getFail () {
            this.ToRemind('注册失败，请重新注册')
        },
        ToRemind (text) {
            Dialog.alert({
                message: text
            })
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'sass/mixin.scss';
@import 'sass/base.scss';
@import 'sass/common.scss';
.rg_page {
    padding-top: .6rem;
    // @include wh(100%, 100%);
    min-height: 100%;
    background-color: $theme-color;
    .rg_back {
            position: absolute;
            left: .1rem;
            top: .1rem;
    }
    .rg_head {
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
    .rg_form {
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
        .rg_code_box {
            display: flex;
            padding-left: 0;
            width: 100%;
            .rg_code {
                width: 50%;
                margin-right: 10%;
            }
            .rg_codeBtn {
                width: 40%;
                color: $font-color;
            }
        }
        .rg_registBtn {
            color: $font-color;
        }
        .rg_login {
            text-align: center;
            color: $font-color;
            margin-top: .3rem;
            opacity: .8;
        }
    }
    .rg-fade-enter-active, .rg-fade-leave-active {
        transition: all 1s;
    }
    .rg-fade-enter, .rg-fade-leave-active {
        transform: translate3d(0, -50px, 0);
        opacity: 0;
    }
}
</style>
