<template>
  <v-container fluid grid-list-md>
    <v-container v-if="loading">
      Daten werden geladen, bitte warten...
    </v-container>

    <v-layout row wrap v-else>
      <v-flex
        xs12 md6 lg4
        v-for="quiz in quizzes"
        :key="quiz.id"
      >
        <v-card flat tile :to="{name: 'Quiz', params: { quizID: quiz.id}}" class="quiz-card">
          <v-card-text>{{quiz.name}}</v-card-text>
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
      quizzes: undefined
    }
  },
  async created () {
    this.loading = true
    this.quizzes = await this.getQuizzes()
    this.loading = false
  },
  methods: {
    async getQuizzes () {
      const quizzes = await fetch('/api/quizzes')
      const temp = await quizzes.json()
      return temp.quizzes
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.quiz-card {
  color: white !important;
  text-align: center;
  /* background: linear-gradient(22deg, rgb(64, 0, 94), rgb(0, 255, 221)); */
  background: linear-gradient(43deg, #ff0000, #ff0000);
  margin: 0 10px;
  border: 1px solid black;
  border-radius: 5px;
}

.quiz-card div {
  height: 200px !important;
}

.quiz-card {
  font-size: 1.75em;
}

.quiz-card:hover div {
  background: rgba(255, 255, 255, 0.22);
  color: black !important;
}
</style>