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
                    v-model="binarySize1"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    width="160"
                    placeholder="bit count"
                    hide-details
                    v-model="binarySize2"
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
            Find the result of the binary addition
          </h1>

          <v-row class="mt-8">
            <v-col>
              <h3 class="text-center">
                <strong class="text-primary">{{ binaryNumber1 }}</strong>
                +
                <strong class="text-primary">{{ binaryNumber2 }}</strong>
                = ?
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
            <v-col class="d-flex ml-7" cols="auto">
              <v-btn
                class="mr-6 pr-6 pl-6"
                @click="performAddition"
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
                :type="result.correct ? 'green' : 'error'"
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
                <strong v-if="reveal">{{ additionResult?.toString(2) }}</strong>
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
  name: "BinaryGame",
  setup() {
    const binaryNumber1 = ref<string>("");
    const binaryNumber2 = ref<string>("");
    const userInput = ref<string | null>(null);
    const result = ref<{ correct: boolean; message: string } | null>(null);
    const reveal = ref<boolean>(false);
    const binaryDecimal1 = ref<number | null>(null);
    const binaryDecimal2 = ref<number | null>(null);
    const additionResult = ref<number | null>(null);
    const binarySize1 = ref<number>(4);
    const binarySize2 = ref<number>(4);

    function performAddition() {
      const randomBinary1 = Array.from({ length: binarySize1.value }, () =>
        Math.round(Math.random()),
      ).join("");
      const randomBinary2 = Array.from({ length: binarySize2.value }, () =>
        Math.round(Math.random()),
      ).join("");
      binaryNumber1.value = randomBinary1;
      binaryNumber2.value = randomBinary2;

      binaryDecimal1.value = parseInt(binaryNumber1.value, 2);
      binaryDecimal2.value = parseInt(binaryNumber2.value, 2);

      userInput.value = null;
      reveal.value = false;
      result.value = null;

      additionResult.value =
        (binaryDecimal1.value || 0) + (binaryDecimal2.value || 0);
    }

    function checkAnswer() {
      if (additionResult.value === null || userInput.value === null) return;

      const userDecimal = parseInt(userInput.value, 2);

      if (userDecimal == additionResult.value) {
        result.value = { correct: true, message: "Correct!" };
      } else {
        result.value = {
          correct: false,
          message: `Incorrect. Please try again.`,
        };
      }

      console.log(additionResult.value);
      console.log(userDecimal);
      console.log(result.value);
    }

    function revealAnswer() {
      if (additionResult.value !== null) {
        reveal.value = true;
      }
    }

    function handleAlertDismiss() {
      result.value = null;
    }

    function applySettings() {
      if (binarySize1.value > 0 && binarySize2.value > 0) {
        performAddition();
      }
    }

    onMounted(() => {
      performAddition();
      reveal.value = false;
    });

    return {
      binaryNumber1,
      binaryNumber2,
      userInput,
      result,
      reveal,
      additionResult,
      performAddition,
      checkAnswer,
      handleAlertDismiss,
      revealAnswer,
      applySettings,
      binarySize1,
      binarySize2,
    };
  },
});
</script>

<style scoped>
.v-alert {
  margin-top: 1rem;
}
</style>
