<template>
  <div v-if="quiz" style="height: 100%">
    <h4>{{quiz.name}}</h4>
    <h2>Frage: {{quiz.questions[questionIndex].question}}</h2>
    <div id="divBody">
      <div id="divInput">
        <v-text-field
          name="textareaStatement"
          label="SQL Statement"
          textarea
          v-model="statement"
          id="textareaStatement"
        ></v-text-field>
      </div>
      <div>
        <v-btn fab dark color="pink" @click="run" fixed bottom right>
        <v-icon dark>play_arrow</v-icon>
      </v-btn>
      </div>
      <div v-if="sqlResult" id="divOutput">
        <sql-table :fields="sqlResult.fields" :rows="sqlResult.rows"></sql-table>
      </div>
    </div>
  </div>
</template>
<script>
import SqlTable from '@/components/SqlTable'

export default {
  components: {
    SqlTable
  },
  props: {
    quizID: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      code: 'const noop = () => {}',
      quiz: undefined,
      questionIndex: 0,
      statement: '',
      result: undefined,

      sqlResult: undefined
    }
  },
  async created () {
    const quiz = await fetch(`/api/quizzes/${this.quizID}`)
    this.quiz = await quiz.json()
  },
  methods: {
    async run () {
      const result = await fetch('/api/query', {
        method: 'POST',
        body: JSON.stringify({ db: this.quiz.db, sql: this.statement })
      })

      this.result = await result.json()

      if (this.result.result.length > 0) {
        this.sqlResult = this.result.result[0]
      }
    },
    onKeydown (e) {
      if (!e.ctrlKey && !e.metaKey) {
        return
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        this.run()
      }
    }
  },
  mounted () {
    document.addEventListener('keydown', this.onKeydown)
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.onKeydown)
  }
}
</script>

<style>
#textareaStatement {
  resize: none;
  outline: none;
  border: none;
  padding: 0;
  margin: 0;
  font-family: monospace;
  width: 100%;
  height: 330px;
  overflow: auto;
  display: block;
  font-size: inherit;
}
#divInput {
  width: 100%;
  height: 50%;
  overflow: auto;
  position: absolute;
}
#divOutput {
  width: 100%;
  height: 50%;
  overflow: auto;
  position: absolute;
  bottom: 0;
}
#divBody {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>