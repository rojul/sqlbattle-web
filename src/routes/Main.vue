<template>
  <v-container fluid grid-list-md>
    <v-container v-if="loading">
      Daten werden geladen, bitte warten...
    </v-container>

    <v-layout row wrap v-else>
      <v-flex
        xs4
        v-for="quiz in quizzes"
        :key="quiz.id"
      >
        <v-card flat tile :to="{name: 'Quiz', params: { quizID: quiz.id}}">
          <v-card-media
            :src="`https://unsplash.it/150/300?image=${Math.floor(Math.random() * 100) + 1}`"
            height="150px"
          >
          <v-card-text>{{quiz.name}}</v-card-text>
          </v-card-media>
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
.quiz {
  width: 200px;
  height: 200px;
  line-height: 200px;
  text-align: center;
  display: inline-block;
  background: #4444bb;
  margin: 0 10px;
  border: 1px solid black;
  border-radius: 5px;
  color: white;
}

.quiz:hover {
  background: #72a0ea;
  color: black;
}

.quiz div {
  font-size: 1.5em;
}
</style>