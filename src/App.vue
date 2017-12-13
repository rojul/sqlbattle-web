<template>
  <v-app>
    <v-toolbar app><v-toolbar-title>SQL-Battle</v-toolbar-title></v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
</v-app>
</template>
<script>
export default {
  name: 'app'
}
</script>
<style>
a {
  text-decoration: none;
  color: inherit;
}
</style>
