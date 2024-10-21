<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="5">
        <h1 class="text-center">Convert the Hexadecimal Number to Binary</h1>

        <v-row class="mt-8">
          <v-col>
            <h3 class="text-center">
              Hexadecimal Number:
              <strong class="text-blue">{{ hexNumber }}</strong>
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
              <strong v-if="reveal">{{ binaryValue }}</strong>
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
  name: "HexToBinaryGame",
  setup() {
    const hexNumber = ref<string>("");
    const userInput = ref<string | null>(null);
    const result = ref<{ correct: boolean; message: string } | null>(null);
    const reveal = ref<boolean>(false);
    const binaryValue = ref<string | null>(null);

    function generateHex() {
      const randomHex = Math.floor(Math.random() * 0xffff)
        .toString(16)
        .toUpperCase()
        .padStart(4, "0");
      hexNumber.value = randomHex;
      binaryValue.value = parseInt(randomHex, 16).toString(2).padStart(16, "0");
      userInput.value = "";
      reveal.value = false;
      result.value = null;
    }

    function checkAnswer() {
      if (hexNumber.value === "" || userInput.value === "") return;

      if (userInput.value === binaryValue.value) {
        result.value = { correct: true, message: "Correct!" };
      } else {
        result.value = {
          correct: false,
          message: `Incorrect.`,
        };
      }
    }

    function revealAnswer() {
      if (hexNumber.value !== "") {
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
      hexNumber,
      userInput,
      result,
      reveal,
      binaryValue,
      generateHex,
      checkAnswer,
      handleAlertDismiss,
      revealAnswer,
    };
  },
});
</script>
