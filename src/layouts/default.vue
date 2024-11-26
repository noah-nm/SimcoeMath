<template>
  <v-app>
    <v-navigation-drawer v-model="drawer">
      <template
        v-for="routeCategory in routeCategories"
        :key="routeCategory.header"
      >
        <sidebarHeader :name="routeCategory.header" />
        <v-item-group>
          <template v-for="route in routeCategory.routes" :key="route.name">
            <v-list-item>
              <sidebarIcon color="success" :icon="route.icon" />
              <sidebarItem
                color="success"
                :name="route.route.name"
                :href="route.route.path"
              />
            </v-list-item>
          </template>
        </v-item-group>
      </template>
    </v-navigation-drawer>

    <v-app-bar elevation="10">
      <v-app-bar-nav-icon @click="goBack">
        <v-icon>mdi-arrow-left-bold</v-icon>
      </v-app-bar-nav-icon>
      <v-app-bar-nav-icon @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-app-bar-nav-icon>
      <div>
        <v-img
          height="27"
          class="headerLogo"
          src="../assets/SimcoeMathLogoHeader.png
          "
        ></v-img>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import router from "../router/index.ts";
import sidebarIcon from "@/components/sidebar/sidebarIcon.vue";
import sidebarItem from "@/components/sidebar/sidebarItem.vue";
import sidebarHeader from "@/components/sidebar/sidebarHeader.vue";

export default {
  name: "DefaultLayout",
  components: { sidebarIcon, sidebarItem, sidebarHeader },
  data() {
    return {
      drawer: null,
      routes: router.getRoutes(),
    };
  },
  computed: {
    // Returns the routes with their respective categories
    // When adding more routes, be sure to add the route into the category here
    routeCategories() {
      const categories = [
        {
          header: "Simcoe Math",
          routes: [{ route: this.routes[0], icon: "mdi-home" }],
        },
        {
          header: "Categories",
          routes: [
            {
              route: this.routes[1],
              icon: "mdi-database",
            },
            {
              route: this.routes[2],
              icon: "mdi-triangle",
            },
          ],
        },
      ];

      return categories;
    },
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.headerLogo {
  padding-right: 160px;
  padding-left: 25px;
}
</style>
