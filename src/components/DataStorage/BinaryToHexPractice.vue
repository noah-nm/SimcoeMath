<template>
  <v-container fluid class="all">
    <v-row align="flex-start">
      <v-col class="settings-panel" cols="12" md="3">
        <v-expansion-panels>
          <v-expansion-panel
            title="Settings"
            text="Modify game settings"
            expand-icon="mdi-cog"
            collapse-icon="mdi-cog"
          >
            <v-expansion-panel-text>
              <v-row>
                <v-col>
                  <v-text-field
                    width="160"
                    placeholder="bit count"
                    hide-details
                    v-model="binarySize"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-btn
                    color="primary"
                    class="mt-3 ml-10"
                    @click="applySettings"
                  >
                    Apply</v-btn
                  >
                </v-col>
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>

      <v-col class="game" cols="12" md="6">
        <div class="centered-content">
          <h1 class="text-center mr-6">
            Convert the binary number to hexadecimal
          </h1>

          <v-row class="mt-8">
            <v-col>
              <h3 class="text-center">
                Binary Number:
                <strong class="text-blue">{{ binaryNumber }}</strong>
              </h3>
            </v-col>
          </v-row>

          <v-row class="mb-4 mt-7">
            <v-col>
              <v-text-field
                v-if="!reveal"
                v-model="userInput"
                label="Enter Hexadecimal Value"
                type="input"
              ></v-text-field>
              <v-text-field
                v-else-if="reveal"
                v-model="userInput"
                disabled
                label="Enter Hexadecimal Value"
                type="input"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col class="d-flex ml-7" cols="auto">
              <v-btn
                class="mr-6 pr-6 pl-6"
                @click="generateBinary"
                color="primary"
              >
                New Number
              </v-btn>
              <v-btn class="mr-6" @click="checkAnswer" color="success">
                Check Answer
              </v-btn>
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
            <v-col class="ml-6">
              <h2 class="text-center">
                The Correct Answer is:
                <strong v-if="reveal">{{ decimalHex }}</strong>
              </h2>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "OctalGame",
  setup() {
    const binaryNumber = ref<string>("");
    const userInput = ref<string | null>(null);
    const result = ref<{ correct: boolean; message: string } | null>(null);
    const reveal = ref<boolean>(false);
    const decimalHex = ref<string | null>(null);
    const binarySize = ref<number>(8);

    function generateBinary() {
      const randomBinary = Array.from({ length: binarySize.value }, () =>
        Math.round(Math.random()),
      ).join("");
      binaryNumber.value = randomBinary;
      decimalHex.value = parseInt(randomBinary, 2).toString(16).toUpperCase();
      userInput.value = "";
      reveal.value = false;
      result.value = null;
    }

    function checkAnswer() {
      if (binaryNumber.value === "" || userInput.value === "") return;

      if (userInput.value === decimalHex.value) {
        result.value = { correct: true, message: "Correct!" };
      } else {
        result.value = {
          correct: false,
          message: `Incorrect.`,
        };
      }
    }

    function revealAnswer() {
      if (binaryNumber.value !== "") {
        reveal.value = true;
      }
    }

    function handleAlertDismiss() {
      result.value = null;
    }

    function applySettings() {
      if (binarySize.value > 0) {
        generateBinary();
      }
    }

    onMounted(() => {
      generateBinary();
      reveal.value = false;
    });

    return {
      binaryNumber,
      userInput,
      result,
      reveal,
      decimalHex,
      generateBinary,
      checkAnswer,
      handleAlertDismiss,
      revealAnswer,
      binarySize,
      applySettings,
    };
  },
});
</script>

<style scoped>
.v-alert {
  margin-top: 1rem;
}
</style>
