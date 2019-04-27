<template>
    <div class="ml_page">
        <head-top goBack="配送地址修改"></head-top>
        <div class="ml_location">
            <label>配送地址:</label>
            <input
            min="7"
            max="48"
            type="text"
            class="ml_building"
            placeholder="XX"
            v-model="building"
            >
            <label>栋</label>
            <input
            type="text"
            class="ml_dormitory"
            placeholder="宿舍号"
            v-model="dorm"
            >
        </div>
        <input
        type="button"
        class="ml_btn"
        @click="ToModify"
        value="修改">
    </div>
</template>
<script>
import { Dialog } from 'vant'
import { setSessionStore, getSessionStore } from 'js/common.js'
import headTop from 'components/Header/Header.vue'

export default {
    name: 'ModifyLocation',
    data () {
        return {
            building: '',
            dorm: ''
        }
    },
    methods: {
        ToModify () {
            const params = {
                building: this.building,
                dorm: this.dorm
            }
            this.axios.get('/user/changeAddress', {
                params
            }).then((res) => {
                const data = res.data.data
                const oldUserInfo = JSON.parse(getSessionStore('user_info'))
                const newUserInfo = Object.assign(oldUserInfo, data)
                setSessionStore('user_info', JSON.stringify(newUserInfo))
                Dialog.alert({
                    message: '修改成功'
                })
                this.$router.push('/my')
            }).catch((err) => {
                Dialog.alert({
                    message: err
                })
            })
        }
    },
    components: {
        headTop
    }
}
</script>
<style lang="scss" scoped>
@import 'sass/mixin.scss';
@import 'sass/base.scss';
.ml_page {
    .ml_head {
        @include wh(100%, .5rem);
        display: flex;
        line-height: .5rem;
        background-color: $theme-color;
        color: #ffffff;
        .iconfont {
            margin-left: .1rem;
        }
        p {
            margin-left: .2rem;
        }
    }
    .ml_location {
        @include wm(80%);
        margin-top: .4rem;
        display: flex;
        line-height: .4rem;
        input {
            @include border-1px(#ccc);
            height: .4rem;
            padding-left: .1rem;
            @include borderRadius(.05rem);
        }
        .ml_building {
            margin-left: .1rem;
            margin-right: .1rem;
            width: 20%;
        }
        .ml_dormitory {
            margin-left: .1rem;
            width: 30%;
        }
    }
    .ml_btn {
        display: block;
        @include wm(80%);
        margin-top: .4rem;
        background-color: #ffffff;
        @include hl(.4rem);
        @include border-1px(#ccc);
        @include borderRadius(.05rem);
    }
}
</style>
<style scoped>
@import 'http://at.alicdn.com/t/font_1126811_vuxz6z1hwql.css';
</style>