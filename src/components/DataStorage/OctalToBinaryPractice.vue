<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="5">
        <h1 class="text-center">Convert the Octal Number to Binary</h1>

        <v-row class="mt-8">
          <v-col>
            <h3 class="text-center">
              Octal Number:
              <strong class="text-blue">{{ octalNumber }}</strong>
            </h3>
          </v-col>
        </v-row>

        <v-row class="mb-4 mt-7">
          <v-col>
            <v-text-field
              v-if="!reveal"
              v-model="userInput"
              label="Enter Binary Value"
              type="input"
            ></v-text-field>
            <v-text-field
              v-else-if="reveal"
              v-model="userInput"
              disabled
              label="Enter Binary Value"
              type="input"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col class="d-flex" cols="auto">
            <v-btn class="mr-6 pr-6 pl-6" @click="generateOctal" color="primary"
              >New Number</v-btn
            >
            <v-btn class="mr-6" @click="checkAnswer" color="success"
              >Check Answer</v-btn
            >
            <v-btn color="primary" @click="revealAnswer">Reveal Answer</v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-alert
              v-if="result !== null"
              :type="result.correct ? 'success' : 'error'"
              closable
              @click:close="handleAlertDismiss"
            >
              {{ result.message }}
            </v-alert>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <h2 class="text-center">
              The Correct Answer is:
              <strong v-if="reveal">{{ octalBinary }}</strong>
            </h2>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "OctalToBinaryGame",
  setup() {
    const octalNumber = ref<string>("0");
    const userInput = ref<string>("");
    const result = ref<{ correct: boolean; message: string } | null>(null);
    const reveal = ref<boolean>(false);
    const octalBinary = ref<string>("");

    function generateOctal() {
      const randomOctal = Math.floor(Math.random() * 512).toString(8);
      octalNumber.value = randomOctal;
      userInput.value = "";
      octalBinary.value = parseInt(randomOctal, 8).toString(2);
      reveal.value = false;
      result.value = null;
    }

    function checkAnswer() {
      if (octalNumber.value === "0" || userInput.value === "") return;

      if (userInput.value === octalBinary.value) {
        result.value = { correct: true, message: "Correct!" };
      } else {
        result.value = { correct: false, message: `Incorrect` };
      }
    }

    function revealAnswer() {
      if (octalNumber.value !== "0") {
        reveal.value = true;
      }
    }

    function handleAlertDismiss() {
      result.value = null;
    }

    onMounted(() => {
      generateOctal();
      reveal.value = false;
    });

    return {
      octalNumber,
      userInput,
      result,
      reveal,
      octalBinary,
      generateOctal,
      checkAnswer,
      handleAlertDismiss,
      revealAnswer,
    };
  },
});
</script>

<style scoped>
.v-alert {
  margin-top: 1rem;
}
</style>
