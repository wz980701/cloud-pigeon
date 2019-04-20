<template>
    <div>
        <div class="header">
            <div class="back" @click="RouteTo">
                <i class="iconfont icon-l_arrow"></i>
            </div>
            <div class="content-wrapper">
                <div class="avatar">
                    <img src="../../common/images/fourth.jpg" width="64" height="64">
                </div>
                <div class="content">
                    <div class="title">
                        <span class="name">第四食堂</span>
                    </div>
                    <div class="description">
                        云鸽专送 / 20分钟送达
                    </div>
                    <div class="supports">
                        <div class="supports_desc">
                            <img
                            class="img"
                            src="../../common/images/up_door.svg"
                            alt="up_door">
                            <span class="text">支持送货上门服务</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="background">
                <img src="../../common/images/fourth.jpg" width="100%" height="100%">
            </div>
        </div>
        <div class="tab">
            <div class="tab-item">
                配送时间： 午餐11-13点 晚餐17-20点 宵夜21-22点半
            </div>
        </div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
export default {
    name: 'Shop',
    methods: {
        RouteTo () {
            this.$router.push('/home')
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'sass/mixin.scss';
@import 'sass/base.scss';
.header {
    position: relative;
    background: rgba(7, 17, 27, 0.5);
    color: #ffffff;
    overflow: hidden;
    .back {
        @include pi(.07rem, .07rem);
        @include wh(.25rem, .25rem);
        z-index: 1;
    }
    .content-wrapper {
        position: relative;
        display: flex;
        padding: .24rem .12rem .18rem .5rem;
        font-size: .12rem;
        .avatar {
            img {
                border-radius: .02rem;
            }
        }
        .content {
            margin-left: .3rem;
            .title {
                margin: 0 0 .08rem 0;
                font-size: .16rem;
                .name {
                    margin-left: .2rem;
                    font-size: .16rem;
                    line-height: .18rem;
                    font-weight: bold;
                }
            }
            .description {
                font-size: .12rem;
                margin-bottom: .1rem;
            }
            .supports {
                position: relative;
                .img {
                    display: inline-block;
                    @include ct;
                }
                .text {
                    margin-left: .25rem;
                    line-height: .12rem;
                    font-size: .1rem;
                }
            }
        }
    }
    .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        filter: blur(.1rem);
        z-index: -1;
    }
}
.tab {
    display: flex;
    width: 100%;
    @include hl(.4rem);
    @include border-1px(rgba(7, 17, 27, 0.1));
    .tab-item {
        flex: 1;
        text-align: center;
        font-size: .12rem;
        a {
            display: block;
            font-size: .14rem;
            color: rgb(77, 85, 93);
        }
    }
}
</style>
