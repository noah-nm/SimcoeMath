<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="5">
        <h1 class="text-center">Convert the hexadecimal number to decimal</h1>

        <v-row class="mt-8">
          <v-col>
            <h3 class="text-center">
              Hexadecimal Number:
              <strong class="text-blue">{{ hexadecimalNumber }}</strong>
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
            <v-btn class="mr-6 pr-6 pl-6" @click="generateHex" color="primary"
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
              <strong v-if="reveal">{{ hexadecimalDecimal }}</strong>
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
    const hexadecimalNumber = ref<string>("");
    const userInput = ref<number | null>(null);
    const result = ref<{ correct: boolean; message: string } | null>(null);
    const reveal = ref<boolean>(false);
    const hexadecimalDecimal = ref<number | null>(null);

    const rules = {
      required: (v: any) => !!v || "Required.",
    };

    function generateHex() {
      const randomHex = Array.from({ length: 5 }, () =>
        Math.floor(Math.random() * 16).toString(16),
      )
        .join("")
        .toUpperCase();
      hexadecimalNumber.value = randomHex;
      userInput.value = null;
      reveal.value = false;
      result.value = null;
    }

    function checkAnswer() {
      if (hexadecimalNumber.value === "" || userInput.value === null) return;

      const hexadecimalDecimal = parseInt(hexadecimalNumber.value, 16);
      if (userInput.value == hexadecimalDecimal) {
        result.value = { correct: true, message: "Correct!" };
      } else {
        result.value = {
          correct: false,
          message: `Incorrect. Please try again.`,
        };
      }

      console.log(hexadecimalDecimal);
      console.log(userInput.value);
      console.log(result.value);
    }

    function revealAnswer() {
      if (hexadecimalNumber.value !== "") {
        hexadecimalDecimal.value = parseInt(hexadecimalNumber.value, 16);
        reveal.value = true;
      }
    }

    function handleAlertDismiss() {
      result.value = null;
    }

    onMounted(() => {
      generateHex();
      reveal.value = false;
    });

    return {
      hexadecimalNumber,
      userInput,
      result,
      rules,
      reveal,
      hexadecimalDecimal,
      generateHex,
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
