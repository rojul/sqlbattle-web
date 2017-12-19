<template>
  <v-app>
    <v-toolbar app>
      <v-btn icon v-show="$route.name !== 'Main'" @click="$router.replace('/')" absolute>
          <v-icon dark>arrow_back</v-icon>
        </v-btn>
      <v-toolbar-title style="width: 100%" class="text-xs-center">
        <router-link to="/">SQL-Battle</router-link>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid style="height: 100%">
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
</v-app>
</template>
<script>
export default {
  name: 'app',
  methods: {
    log (log) {
      debugger
    }
  }
}
</script>
<style>
a {
  text-decoration: none;
  color: inherit;
}
</style>
