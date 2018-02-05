<template>
  <v-container fluid grid-list-md>
    <v-container v-if="loading">
      Daten werden geladen, bitte warten...
    </v-container>

    <v-layout row wrap v-else>
      <v-flex
        xs12 md6 lg4
        v-for="db in databases"
        :key="db.id"
      >
        <!-- <v-card flat tile :to="{name: 'Quiz', params: { quizID: quiz.id}}" class="quiz-card"> -->
        <v-card flat tile :to="{name: 'ConfigDB', params: { dbID: db.id}}" class="config-card">
          <v-card-text>{{db.id}}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      databases: undefined,
      quizzes: undefined
    }
  },
  async created () {
    this.loading = true
    this.databases = await this.getDatabases()
    this.quizzes = await this.getQuizzes()
    this.loading = false
  },
  methods: {
    async getQuizzes () {
      const quizzes = await fetch('/api/quizzes')
      const temp = await quizzes.json()
      return temp.quizzes
    },
    async getDatabases () {
      const databases = await fetch('/api/databases')
      const temp = await databases.json()
      return temp.databases
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.config-card {
  color: rgb(0, 0, 0) !important;
  text-align: center;
  /* background: linear-gradient(22deg, rgb(64, 0, 94), rgb(0, 255, 221)); */
  background: linear-gradient(43deg, #3cff00, #3cff00);
  margin: 0 10px;
  border: 1px solid black;
  border-radius: 5px;
}

.config-card div {
  height: 200px !important;
}

.config-card {
  font-size: 1.75em;
}

.config-card:hover div {
  background: rgba(0, 0, 0, 0.22);
  color: rgb(255, 255, 255) !important;
}
</style>