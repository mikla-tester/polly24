<template>
  <div>
    <div>
      lang: {{ lang }}
      {{ question.q }}
    </div>
    <BarsComponent v-bind:labels="question.a" v-bind:data="submittedAnswers"/>

    <span>{{ submittedAnswers }}</span>
  </div>
</template>

<script>
// @ is an alias to /src
import BarsComponent from '@/components/BarsComponent.vue';
import io from 'socket.io-client';
const socket = io(sessionStorage.getItem("dataServer"));

export default {
  name: 'ResultView',
  components: {
    BarsComponent
  },
  data: function () {
    return {
      lang: localStorage.getItem("lang") || "en",
      pollId: "",
      question: "",
      submittedAnswers: {}
    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    socket.on( "uiLabels", labels => this.uiLabels = labels );
    socket.on("submittedAnswersUpdate", update => this.submittedAnswers = update);
    socket.on("questionUpdate", update => this.question = update );
    socket.emit( "getUILabels", this.lang );
    socket.emit( "joinPoll", this.pollId );
  }
}
</script>
