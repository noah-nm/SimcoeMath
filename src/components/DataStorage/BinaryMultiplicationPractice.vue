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
            Find the result of the binary multiplication
          </h1>

          <v-row class="mt-8">
            <v-col>
              <h3 class="text-center">
                <strong class="text-blue">{{ binaryNumber1 }}</strong>
                ×
                <strong class="text-blue">{{ binaryNumber2 }}</strong>
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
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                v-else-if="reveal"
                v-model="userInput"
                disabled
                label="Enter Binary Value"
                type="input"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col class="d-flex ml-7" cols="auto">
              <v-btn
                class="mr-6 pr-6 pl-6"
                @click="performMultiplication"
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
                <strong v-if="reveal">{{
                  multiplicationResult?.toString(2)
                }}</strong>
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
    const multiplicationResult = ref<number | null>(null);
    const binarySize1 = ref<number>(4);
    const binarySize2 = ref<number>(4);

    const rules = {
      required: (v: any) => !!v || "Required.",
      binary: (v: string) =>
        /^[01]+$/.test(v) || "Input must be a binary number (0 or 1)",
    };

    function performMultiplication() {
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

      multiplicationResult.value =
        (binaryDecimal1.value || 0) * (binaryDecimal2.value || 0);
    }

    function checkAnswer() {
      if (multiplicationResult.value === null || userInput.value === null)
        return;

      const userDecimal = parseInt(userInput.value, 2);
      if (userDecimal == multiplicationResult.value) {
        result.value = { correct: true, message: "Correct!" };
      } else {
        result.value = {
          correct: false,
          message: `Incorrect. Please try again.`,
        };
      }

      console.log(multiplicationResult.value);
      console.log(userDecimal);
      console.log(result.value);
    }

    function revealAnswer() {
      if (multiplicationResult.value !== null) {
        reveal.value = true;
      }
    }

    function handleAlertDismiss() {
      result.value = null;
    }

    function applySettings() {
      if (binarySize1.value > 0 && binarySize2.value > 0) {
        performMultiplication();
      }
    }

    onMounted(() => {
      performMultiplication();
      reveal.value = false;
    });

    return {
      binaryNumber1,
      binaryNumber2,
      userInput,
      result,
      rules,
      reveal,
      multiplicationResult,
      performMultiplication,
      checkAnswer,
      handleAlertDismiss,
      revealAnswer,
      binarySize1,
      binarySize2,
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
