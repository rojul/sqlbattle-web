<template>
  <div v-if="quiz" style="height: 100%">
    <h4>{{quiz.name}}</h4>
    <h2>Frage {{questionIndex + 1}} / {{quiz.questions.length}}: {{quiz.questions[questionIndex].question}}</h2>
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
      <div v-if="sqlResult" id="divOutput">
        <sql-table :fields="sqlResult.fields" :rows="sqlResult.rows"></sql-table>
      </div>
      <div>
        <v-btn fab dark color="pink" @click="run" fixed bottom right>
          <v-icon dark>play_arrow</v-icon>
        </v-btn>

        <v-speed-dial
          v-model="fab"
          fixed bottom left
          direction="right"
          transition="scale-transition"
        >
          <v-btn slot="activator" color="pink" dark fab hover v-model="fab">
            <v-icon>more_horiz</v-icon>
            <v-icon>close</v-icon>
          </v-btn>
          <v-btn fab dark small color="pink" @click="showAnswer">
            <v-icon dark>lightbulb_outline</v-icon>
          </v-btn>
          <v-btn fab dark small color="pink" @click="goToPreviousQuestion" v-show="questionIndex > 0">
            <v-icon dark>skip_previous</v-icon> 
          </v-btn>
          <v-btn fab dark small color="pink" @click="goToNextQuestion">
            <v-icon dark>skip_next</v-icon>
          </v-btn>
        </v-speed-dial>
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
      canRunStatement: true,

      sqlResult: undefined
    }
  },
  async created () {
    const quiz = await fetch(`/api/quizzes/${this.quizID}`)
    this.quiz = await quiz.json()
    this.page = this.questionIndex + 1
  },
  methods: {
    async run () {
      if (!this.canRunStatement) {
        return
      }

      this.canRunStatement = false
      const result = await fetch('/api/query', {
        method: 'POST',
        body: JSON.stringify({ db: this.quiz.db, sql: this.statement, answer: this.quiz.questions[this.questionIndex].answer })
      })

      this.result = await result.json()

      if (this.result.error) {
        alert(this.result.error)
      } else {
        this.sqlResult = this.result.result[0]
        if (this.result.correct) {
          setTimeout(() => alert('Well done! Solve the next Question!'), 0)
          this.statement = ''
          this.goToNextQuestion()
        }
      }
      this.canRunStatement = true
    },
    showAnswer () {
      alert(this.quiz.questions[this.questionIndex].answer)
    },
    goToNextQuestion () {
      if (this.questionIndex < this.quiz.questions.length - 1) {
        this.questionIndex++
      } else {
        alert('Congratulations! Quiz finished!')
        this.$router.replace('/')
      }
    },
    goToPreviousQuestion () {
      if (this.questionIndex > 0) {
        this.questionIndex--
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