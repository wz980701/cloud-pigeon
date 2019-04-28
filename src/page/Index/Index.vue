<template>
    <div class="index_page">
        <transition name="index_head-fade" mode="in-out">
            <header class="index_head" v-show="showIndex">
                <div class="logo_wrapper">
                    <img src="../../common/images/logo.png" alt="logo" class="index_logo margin">
                </div>
                <h1>CLOUD PIGEON</h1>
            </header>
        </transition>
        <transition name="index_content-fade" mode="in-out">
            <section class="index_content" v-show="showIndex">
                <div class="rider" @click="getRider">
                    <div class="rider_head">
                        <img src="../../common/images/rider.svg" alt="Rider">
                    </div>
                    <p>云鸽</p>
                </div>
                <p class="index_or">or</p>
                <div class="student" @click="getStudent">
                    <div class="student_head">
                        <img src="../../common/images/student.svg" alt="student">
                    </div>
                    <p>学生</p>
                </div>
            </section>
        </transition>
    </div>
</template>
<script>
import { getLocalStore, setSessionStore, getSessionStore, isEmpty } from 'js/common.js'
import { login } from 'js/api.js'
import { Dialog } from 'vant'

export default {
    name: 'Index',
    data () {
        return {
            showIndex: false
        }
    },
    mounted () {
        this.showIndex = true
    },
    methods: {
        getRider () {
            if (!getLocalStore('rider_token')) { //初次登录没有token，则跳到注册页
                Dialog.alert({
                    message: '请先注册账号',
                })
                this.$router.push('/riderRegist')
            } else {
                    const formdata = new FormData()
                    formdata.append('role', 'delivery'),
                    formdata.append('token', getLocalStore('rider_token'))
                    login(formdata).then((res) => {
                        const data = res.data.data
                        setSessionStore('rider_info', JSON.stringify(data))
                        if (isEmpty(JSON.parse(getSessionStore('rider_info')))) { //如果rider_info为空，则重新登录
                            Dialog.alert({
                            message: '账号已过期，请重新登录'
                        })
                        this.$router.push('/riderLogin')
                        } else {
                            this.$router.push('/riderOrder')
                        }
                    }).catch(() => {
                        Dialog.alert({
                            message: '账号已过期，请重新登录'
                        })
                    })
            }
        },
        getStudent () {
            if (!getLocalStore('user_token')) {
                Dialog.alert({
                    message: '请先注册账号'
                })
                this.$router.push('/studentRegist')
            } else {
                const formdata = new FormData()
                formdata.append('role', 'user'),
                formdata.append('token', getLocalStore('user_token'))
                login(formdata).then((res) => {
                    const data = res.data.data
                    setSessionStore('user_info', JSON.stringify(data))
                    if (isEmpty(JSON.parse(getSessionStore('user_info')))) {
                        Dialog.alert({
                        message: '账号已过期，请重新登录'
                    })
                    this.$router.push('/studentLogin')
                    } else {
                        this.$router.push('/home')
                    }
                }).catch(() => {
                    Dialog.alert({
                        message: '账号已过期，请重新登录'
                    })
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'sass/mixin.scss';
@import 'sass/base.scss';
body {
    .index_page {
    @include fj(center);
    @include wh(100%, 100%);
    background-color: $theme-color;
    color: $font-color;
    .index_head {
        @include ls(.05rem);
        margin: {
            top: .8rem;
        }
        font-size: .12rem;
        .logo_wrapper {
            @include wh(.8rem, .8rem);
            @include cl;
            position: relative;
            margin-bottom: .2rem;
            img {
                @include wh(100%, 100%);
                @include pi(0, 0);
            }
        }
    }
    .index_content {
    width: 60%;
    @include center;
    @include fj();
    margin-top: .2rem;
    .rider, .student {
        text-align: center;
        cursor: pointer;
        transition: all .8s;
        .rider_head, .student_head {
            width: .8rem;
            height: .8rem;
            border: 1px solid $font-color;
            @include borderRadius(50%);
            img {
                width: 70%;
                height: 70%;
                display: block;
                margin-top: 15%;
                margin-left: 15%;
            }
        }
        p {
            margin-top: .1rem;
            font-size: .16rem;
        }
    }
    .index_or {
        @include center;
        @include sc(.3rem, $font-color);
        font-size: .18rem;
    }
}
    .index_head-fade-enter-active, .index_head-fade-leave-active {
        transition: all 1s;
    }
    .index_head-fade-enter, .index_head-fade-leave-active {
        transform: translate3d(0, -50px, 0);
        opacity: 0;
    }
    .index_content-fade-enter-active, .index_content-fade-leave-active {
        transition: opacity 2s;
    }
    .index_content-fade-enter, .index_content-fade-leave-active {
        opacity: 0;
    }
}
}
</style>