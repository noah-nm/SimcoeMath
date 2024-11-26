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
                    v-model="decimalSize"
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
          <h1 class="text-center mr-6">Convert the decimal number to octal</h1>

          <v-row class="mt-8">
            <v-col>
              <h3 class="text-center">
                Decimal Number:
                <strong class="text-primary">{{ decimalNumber }}</strong>
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
              ></v-text-field>
              <v-text-field
                v-else-if="reveal"
                v-model="userInput"
                disabled
                label="Enter Octal Value"
                type="input"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col class="d-flex ml-7" cols="auto">
              <v-btn
                class="mr-6 pr-6 pl-6"
                @click="generateDecimal"
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
                <strong v-if="reveal">{{ decimalOctal }}</strong>
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
    const decimalNumber = ref<number>(0);
    const userInput = ref<string>("");
    const result = ref<{ correct: boolean; message: string } | null>(null);
    const reveal = ref<boolean>(false);
    const decimalOctal = ref<string>("");
    const decimalSize = ref<number>(3);

    function generateDecimal() {
      const min = Math.pow(10, decimalSize.value - 1);
      const max = Math.pow(10, decimalSize.value) - 1;

      const randomDecimal = Math.floor(Math.random() * (max - min + 1) + min);
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

    function applySettings() {
      if (decimalNumber.value > 0) {
        generateDecimal();
      }
    }

    onMounted(() => {
      generateDecimal();
      reveal.value = false;
    });

    return {
      decimalNumber,
      userInput,
      result,
      reveal,
      decimalOctal,
      generateDecimal,
      checkAnswer,
      handleAlertDismiss,
      revealAnswer,
      decimalSize,
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
