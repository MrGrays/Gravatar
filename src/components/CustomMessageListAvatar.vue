<template>
    <div
        :style="{
            'background-color': colour
        }"
        :data-nick="message.nick"
        class="kiwi-messagelist-avatar"
    >
        <img
        :src="avatar"
        v-if="avatar"
        class="kiwi-messagelist-avatar"
        >
        {{ avatar ? '' : message.nick[0] }}
    </div>
</template>

<script>

'kiwi public';

export default {
    props: ['message'],
    computed: {
        avatar() {
            return this.message.user ?
                this.message.user.avatar :
                '';
        },
        colour() {
            return (this.message.user && !this.message.user.avatar) ?
                this.message.user.getColour() :
                '';
        }
    },
};

</script>

<style>

.kiwi-messagelist-avatar {
    text-transform: uppercase;
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    font-weight: 600;
    color: #fff;
    margin-top: 3px;
}

</style>
