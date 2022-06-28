<template>
    <transition :name="transition">
        <div v-show="visible">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
/* eslint-disable */ 

export default {
    data(){
        return {
            index: 0,
        }
    },
    computed: {
        transition(){
            if (this.$parent.direction) {
                return 'slide-' + this.$parent.direction;
            }
        },
        visible(){
            return this.index === this.$parent.index; 
        }
    }
}
</script>

<style scoped>
/* SLIDE RIGHT */
.slide-right-enter-active {
    animation: slideRightIn 0.5s;
}

.slide-right-leave-active {
    animation: slideRightOut 0.5s;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    width: 100%;
}

@keyframes slideRightIn {
    from{transform: translateX(100%);}

    to {transform: translateX(0);}
}

@keyframes slideRightOut {
    from{transform: translateX(0);}

    to {transform: translateX(-100%);}
}

/* SLIDE LEFT */
.slide-left-enter-active {
    animation: slideLeftIn .5s;
}

.slide-left-leave-active {
    animation: slideLeftOut .5s;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    width: 100%;
}

@keyframes slideLeftIn {
    from{transform: translateX(-100%);}

    to {transform: translateX(0);}
}

@keyframes slideLeftOut {
    from{transform: translateX(0);}

    to {transform: translateX(100%);}
}
</style>
