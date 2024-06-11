<template>
    <v-icon class="sidebar-icon">
        {{ icon }}
    </v-icon>
</template>
  
<script>
export default {
    name: 'SidebarIcon',
    props: {
        icon: {
            type: String,
            required: true,
        },
    },
}
</script>  

<style>
.sidebar-icon {
  margin-right: 20px;
  margin-bottom: 5px;
}
</style>