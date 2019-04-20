<template>
    <div class="sg_page">
        <router-link to="/index" class="sg_back" tag="div">
            <img src="../../common/images/index.svg" alt="index">
        </router-link>
        <transition name="rg-fade" mode="in-out">
            <div class="sg_box" v-show="showRegist">
                <header class="sg_head">
                    <div class="logo_wrapper">
                        <img src="../../common/images/logo.png" alt="logo">
                    </div>
                </header>
                <section class="sg_form">
                    <input
                    autofocus
                    v-model.trim="$v.name.$model"
                    type="text"
                    class="sg_name"
                    placeholder="请输入姓名"
                    >
                    <span
                    v-if="!$v.name.required"
                    class="form-group_message"
                    >
                    * 必须输入姓名
                    </span>
                    <span
                    v-if="!$v.name.minLength"
                    class="form-group_message"
                    >
                    * 请输入真实姓名
                    </span>
                    <input
                    v-model.trim="$v.sid.$model"
                    type="text"
                    class="sg_studentNum"
                    placeholder="请输入学号">
                    <span
                    v-if="!$v.sid.required"
                    class="form-group_message"
                    >
                    * 必须输入学号
                    </span>
                    <span
                    v-if="!$v.sid.minLength"
                    class="form-group_message"
                    >
                    * 学号为10位
                    </span>
                    <span
                    v-if="!$v.sid.maxLength"
                    class="form-group_message"
                    >
                    * 学号为10位
                    </span>
                    <input
                    v-model.trim="$v.phone.$model"
                    type="text"
                    class="sg_phone"
                    placeholder="请输入手机号">
                    <span
                    v-if="!$v.phone.minLength"
                    class="form-group_message"
                    >
                    * 手机号为11位
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
                    class="sg_name"
                    placeholder="请输入密码">
                    <span
                    v-if="!$v.password.minLength"
                    class="form-group_message"
                    >
                    * 密码不能少于6位
                    </span>
                    <div class="sg_location">
                        <label>配送地址:</label>
                        <input
                        min="7"
                        max="48"
                        type="text"
                        class="sg_building"
                        placeholder="XX"
                        v-model.trim="$v.building.$model"
                        >
                        <label>栋</label>
                        <input
                        type="text"
                        class="sg_dormitory"
                        placeholder="宿舍号"
                        v-model.trim="$v.dorm.$model"
                        >
                    </div>
                    <span
                    v-if="!$v.building.required"
                    class="form-group_message"
                    >
                    * 必须填写地址
                    </span>
                    <span
                    v-if="!$v.building.minValue"
                    class="form-group_message"
                    >
                    * 请输入正确地址
                    </span>
                    <span
                    v-if="!$v.building.maxValue"
                    class="form-group_message"
                    >
                    * 请输入正确地址
                    </span>
                    <span
                    v-if="!$v.dorm.minLength"
                    class="form-group_message"
                    >
                    * 请输入正确地址
                    </span>
                    <span
                    v-if="!$v.dorm.maxLength"
                    class="form-group_message"
                    >
                    * 请输入正确地址
                    </span>
                    <input
                    type="submit"
                    class="sg_registBtn"
                    value="注册"
                    @click="ToRegist"
                    >
                    <router-link to="/studentLogin" tag="div" class="sg_login">
                        Sign In
                    </router-link>
                </section>
            </div>
        </transition>
    </div>
</template>
<script>
import { Dialog } from 'vant'
import { setLocalStore, getLocalStore, setSessionStore } from 'js/common.js'
import { required, minLength, maxLength, numeric, minValue, maxValue } from 'vuelidate/lib/validators'

export default {
    name: 'StudentRegist',
    data () {
        return {
            name: '',
            phone: '',
            password: '',
            studentName: '',
            sid: '',
            role: 'user',
            building: '',
            dorm: '',
            showRegist: false
        }
    },
    validations: {
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
        },
        building: {
            required,
            minValue: minValue(7),
            maxValue: maxValue(48)
        },
        dorm: {
            required,
            minLength: 3,
            maxLength: 3,
            numeric
        }
    },
    mounted () {
        this.showRegist = true
    },
    methods: {
        ToRegist () {
            const formdata = new FormData()
            formdata.append('role', this.role)
            formdata.append('name', this.name)
            formdata.append('sid', this.sid)
            formdata.append('phone', this.phone)
            formdata.append('password', this.password)
            formdata.append('building', this.building)
            formdata.append('dorm', this.dorm)
            this.axios.post('/register', formdata).then((res) => {
                // this.ToRemind('注册成功')
                setLocalStore('user_token', res.data.data.token)
                this.ToLogin()
            }).catch(() => {
                // this.ToRemind('注册失败，请重新注册')
                // this.$router.go(0)
            })
        },
        ToRemind (text) {
            Dialog.alert({
                message: text
            })
        },
        ToLogin () {
            const formdata = new FormData()
            formdata.append('token', getLocalStore('user_token'))
            formdata.append('role', this.role)
            this.axios.post('/login', formdata).then((res) => {
                const data = res.data.data
                setSessionStore('user_info', JSON.stringify(data))
                console.log(data)
                this.$router.push('/home')
            })
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'sass/mixin.scss';
@import 'sass/base.scss';
@import 'sass/common.scss';
.sg_page {
    padding-top: .6rem;
    @include wh(100%, 100%);
    background-color: $theme-color;
    .sg_back {
            position: absolute;
            left: .1rem;
            top: .1rem;
    }
    .sg_head {
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
    .sg_form {
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
            color: $font-color;
        }
        .sg_registBtn {
            color: $font-color;
        }
        .sg_login {
            text-align: center;
            color: $font-color;
            margin-top: .3rem;
            opacity: .8;
        }
        .sg_location {
            display: flex;
            color: $font-color;
            opacity: .8;
            line-height: .6rem;
            .sg_building {
                margin-left: .1rem;
                margin-right: .1rem;
                width: 20%;
            }
            .sg_dormitory {
                margin-left: .1rem;
                width: 30%;
            }
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
