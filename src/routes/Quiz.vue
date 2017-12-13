<template>
  <div>
    <div>
    <h2>{{quiz.name}}</h2>
    <h3>{{quiz.questions[questionIndex].text}}</h3>
    </div>
    <div>
      <textarea rows="20" cols="150" v-model="quiz.questions[questionIndex].answer">
      </textarea>
    </div>
    <div>
      <button @click="run">
        Ausführen
      </button>
    </div>
  </div>
</template>
<script>

export default {
  components: {
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
      questionIndex: 0
    }
  },
  created () {
    this.quiz = {
      name: 'Quiz 1',
      questions: [
        {
          text: 'Selektiere alles',
          answer: 'Select *'
        }
      ]
    }
  },
  methods: {
    run () {
      alert('dieser Code ist hässlich!!!')
    }
  }
}
</script>

<style>
.editor {
  width: 600px;
  height: 800px;
}
</style>