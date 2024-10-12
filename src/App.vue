<template>
  <component :is="layout" />
</template>

<script>
import DefaultLayout from "@/layouts/default";

const fallbackLayout = "Default";

export default {
  name: "App",
  components: { DefaultLayout },
  computed: {
    layout() {
      const loadedLayout = this.$route?.meta?.layout || fallbackLayout;
      return `${loadedLayout}-layout`;
    },
  },
};
</script>
