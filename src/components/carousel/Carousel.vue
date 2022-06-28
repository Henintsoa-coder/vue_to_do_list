<template>
    <div class="carousel">
        <slot></slot>
        <button class="carousel__nav carousel__next" @click.prevent="next">&gt;</button>
        <button class="carousel__nav carousel__prev" @click.prevent="prev">&lt;</button>
        <div class="carousel__pagination">
            <button v-for="n in slidesCount" :key=n @click="goTo(n-1)" :class="{ active: n-1 == index }"></button>
        </div>
    </div>
</template>

<script>
/* eslint-disable */ 
export default {
    data() {
        
        console.log(this.$children);

        return {
            index: 0,
            slides: [],
            direction: null
        }
    },
    mounted(){
        console.log(this.$children);
        this.slides = this.$children;
        this.slides.forEach((slide, i) => {
            slide.index = i;
        });    
    },
    computed:{
        slidesCount() {
            return this.slides.length;
        }
    },
    methods:{
        next(){
            this.index++;
            this.direction = 'right';
            
            if (this.index > this.slidesCount - 1) {
                this.index = 0;
            }
        },
        prev(){
            this.index--;
            this.direction = 'left';

            if (this.index < 0) {
                this.index = this.slidesCount -1;
            }
        },
        goTo(index){
            this.direction = this.index > index ? 'left':'right'; 
            this.index = index;
        }
    }
}
</script>

<style scoped>
.carousel {
    position: relative;
}

.carousel__nav {
    position: absolute;
    top:50%;
    left: 10px;
    width: 63px;
    height: 63px;
    background: rgba(0, 0, 0, 0.5);
    border: none;
    color:white;
    font-weight: bolder;
    font-size: 1rem;
}

.carousel__nav.carousel__next{
    left: auto;
    right: 10px;
}

.carousel__pagination {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    text-align:center;
}

.carousel__pagination button {
    display: inline-block;
    width: 10px;
    height: 15px;
    background-color: #000;
    opacity: 0.8;
    border-radius: 50%;
    margin: 0 5px;
    border: 2px solid #fff;
}

.carousel__pagination button.active {
    background-color:white;
}
</style>
