<template>
    <a class="item-button" v-bind:href="href">{{ name }}</a>
</template>
  
<script>
export default {
    name: 'SidebarItem',
    props: {
        name: {
            type: String,
            required: true,
        },
        href: {
            type: String,
            required: true,
        },
    },
}
</script>  

<style>
@import '@/layouts/variables/Default.css';

.item-button {
    text-decoration: none;
    font-size: var(--sidebar-item-font-size);
    line-height: 30px;
    color: inherit;
}

.item-button:hover {
    color: rgb(155, 155, 155);
}
</style>