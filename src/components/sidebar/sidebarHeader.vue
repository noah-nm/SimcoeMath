<template>
    <li class="sidebar-header">
        {{ name }}
    </li>
</template>
  
<script>
export default {
    name: 'SidebarHeader',
    props: {
        name: {
            type: String,
            required: true,
        },
    },
}
</script>  

<style>
.sidebar-header {
    color: grey;
    display: flex;
    align-items: center;
    flex: 1;
    flex-grow: 1;
    font-weight: bold;
    margin-bottom: 5px;
    margin-left: 15px;
    margin-top: 15px;
  }
</style>