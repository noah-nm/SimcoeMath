<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="5">
        <h1 class="text-center">Convert the Decimal Number to Octal</h1>

        <v-row class="mt-8">
          <v-col>
            <h3 class="text-center">
              Decimal Number:
              <strong class="text-blue">{{ decimalNumber }}</strong>
            </h3>
          </v-col>
        </v-row>

        <v-row class="mb-4 mt-7">
          <v-col>
            <v-text-field
              v-if="!reveal"
              v-model="userInput"
              label="Enter Octal Value"
              type="input"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              v-else-if="reveal"
              v-model="userInput"
              disabled
              label="Enter Octal Value"
              type="input"
              :rules="[rules.required]"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col class="d-flex" cols="auto">
            <v-btn
              class="mr-6 pr-6 pl-6"
              @click="generateDecimal"
              color="primary"
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
              <strong v-if="reveal">{{ decimalOctal }}</strong>
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
  name: "OctalGame",
  setup() {
    const decimalNumber = ref<number>(0);
    const userInput = ref<string>("");
    const result = ref<{ correct: boolean; message: string } | null>(null);
    const reveal = ref<boolean>(false);
    const decimalOctal = ref<string>("");

    const rules = {
      required: (v: any) => !!v || "Required.",
    };

    function generateDecimal() {
      const randomDecimal = Math.floor(Math.random() * 1000);
      decimalNumber.value = randomDecimal;
      userInput.value = "";
      decimalOctal.value = randomDecimal.toString(8);
      reveal.value = false;
      result.value = null;
    }

    function checkAnswer() {
      if (decimalNumber.value === 0 || userInput.value === "") return;

      if (userInput.value === decimalOctal.value) {
        result.value = { correct: true, message: "Correct!" };
      } else {
        result.value = { correct: false, message: `Incorrect` };
      }
    }

    function revealAnswer() {
      if (decimalNumber.value !== 0) {
        reveal.value = true;
      }
    }

    function handleAlertDismiss() {
      result.value = null;
    }

    onMounted(() => {
      generateDecimal();
      reveal.value = false;
    });

    return {
      decimalNumber,
      userInput,
      result,
      rules,
      reveal,
      decimalOctal,
      generateDecimal,
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
