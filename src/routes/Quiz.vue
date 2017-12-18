<template>
  <div>
    <div>
    <h2>{{quiz.name}}</h2>
    <h3>{{quiz.questions[questionIndex].text}}</h3>
    </div>
    <div>
      <v-text-field
        name="textareaStatement"
        label="SQL Statement"
        textarea
        v-model="quiz.questions[questionIndex].answer"
        id="textareaStatement"
      ></v-text-field>
    </div>
    <div>
      <v-btn fab dark color="pink" @click="run" fixed bottom right>
      <v-icon dark>play_arrow</v-icon>
    </v-btn>
    </div>
    <div>
      <sql-table :fields="sqlResult.fields" :rows="sqlResult.rows"></sql-table>
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

      sqlResult: {
        fields: ['Dessert (100g serving)', 'Calories', 'Fat (g)', 'Carbs (g)', 'Protein (g)', 'Sodium (mg)', 'Calcium (%)', 'Iron (%)'],
        rows: [
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%'],
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%'],
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%'],
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%'],
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%'],
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%'],
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%'],
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%'],
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%'],
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%'],
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%'],
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%'],
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%'],
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%'],
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%'],
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%'],
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%'],
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%'],
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%'],
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%'],
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%'],
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%'],
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%'],
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%'],
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%'],
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%'],
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%'],
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%'],
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%'],
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%'],
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%'],
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%'],
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%'],
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%'],
          ['Frozen Yogurt', 159, 6.0, 24, 4.0, 87, '14%', '1%']
        ]
      }
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
    }
  }
}
</script>

<style>
.editor {
  width: 600px;
  height: 800px;
}
#textareaStatement {
  resize: none;
  height: 300px;
}
</style>