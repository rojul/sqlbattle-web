<template>
  <v-container fluid grid-list-md>
    <v-container v-if="loading">
      Daten werden geladen, bitte warten...
    </v-container>

    <v-layout row wrap fill-height v-else>
      <v-flex
        xs4
        v-for="quiz in quizzes"
        :key="quiz.id"
        fill-height
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
      quizzes: [
        {
          id: 1,
          name: 'Quiz 1'
        },
        {
          id: 2,
          name: 'Quiz 2'
        }
      ]
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
  height: 200px;
  line-height: 200px;
  color: white !important;
  text-align: center;
  background: linear-gradient(22deg, rgb(64, 0, 94), rgb(0, 255, 221));
  margin: 0 10px;
  border: 1px solid black;
  border-radius: 5px;
}

.quiz-card {
  font-size: 1.7em;
}

.quiz-card:hover div {
  background: rgba(255, 255, 255, 0.22);
  color: black !important;
}
</style>