<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="5">
        <h1 class="text-center">Convert the octal number to decimal</h1>

        <v-row class="mt-8">
          <v-col>
            <h3 class="text-center">
              Binary Number:
              <strong class="text-blue">{{ octalNumber }}</strong>
            </h3>
          </v-col>
        </v-row>

        <v-row class="mb-4 mt-7">
          <v-col>
            <v-text-field
              v-if="!reveal"
              v-model="userInput"
              label="Enter Decimal Value"
              type="input"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              v-else-if="reveal"
              v-model="userInput"
              disabled
              label="Enter Decimal Value"
              type="input"
              :rules="[rules.required]"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col class="d-flex" cols="auto">
            <v-btn
              class="mr-6 pr-6 pl-6"
              @click="generateBinary"
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
              <strong v-if="reveal">{{ octalDecimal }}</strong>
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
  name: "BinaryGame",
  setup() {
    const octalNumber = ref<string>("");
    const userInput = ref<number | null>(null);
    const result = ref<{ correct: boolean; message: string } | null>(null);
    const reveal = ref<boolean>(false);
    const octalDecimal = ref<number | null>(null);

    const rules = {
      required: (v: any) => !!v || "Required.",
    };

    function generateBinary() {
      const randomOctal = Array.from({ length: 5 }, () =>
        Math.floor(Math.random() * 8),
      ).join("");
      octalNumber.value = randomOctal;
      userInput.value = null;
      reveal.value = false;
      result.value = null;
    }

    function checkAnswer() {
      if (octalNumber.value === "" || userInput.value === null) return;

      const octalDecimal = parseInt(octalNumber.value, 8);
      if (userInput.value == octalDecimal) {
        result.value = { correct: true, message: "Correct!" };
      } else {
        result.value = {
          correct: false,
          message: `Incorrect. Please try again.`,
        };
      }

      console.log(octalDecimal);
      console.log(userInput.value);
      console.log(result.value);
    }

    function revealAnswer() {
      if (octalNumber.value !== "") {
        octalDecimal.value = parseInt(octalNumber.value, 8);
        reveal.value = true;
      }
    }

    function handleAlertDismiss() {
      result.value = null;
    }

    onMounted(() => {
      generateBinary();
      reveal.value = false;
    });

    return {
      octalNumber,
      userInput,
      result,
      rules,
      reveal,
      octalDecimal,
      generateBinary,
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
