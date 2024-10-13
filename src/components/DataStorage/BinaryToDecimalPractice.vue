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
          <h1 class="text-center mr-6">Convert the binary number to decimal</h1>

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
                <strong v-if="reveal">{{ binaryDecimal }}</strong>
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
    const binaryNumber = ref<string>("");
    const userInput = ref<number | null>(null);
    const result = ref<{ correct: boolean; message: string } | null>(null);
    const reveal = ref<boolean>(false);
    const binaryDecimal = ref<number | null>(null);
    const binarySize = ref<number>(8);

    const rules = {
      required: (v: any) => !!v || "Required.",
    };

    function generateBinary() {
      let randomBinary = "";

      // Ensure the new binary number is different from the previous one
      do {
        randomBinary = Array.from({ length: binarySize.value }, () =>
          Math.round(Math.random()),
        ).join("");
      } while (randomBinary === binaryNumber.value);

      binaryNumber.value = randomBinary;
      userInput.value = null;
      reveal.value = false;
      result.value = null;
    }

    function checkAnswer() {
      if (binaryNumber.value === "" || userInput.value === null) return;

      const binaryDecimalValue = parseInt(binaryNumber.value, 2);
      if (userInput.value == binaryDecimalValue) {
        result.value = { correct: true, message: "Correct!" };
      } else {
        result.value = {
          correct: false,
          message: "Incorrect. Please try again.",
        };
      }
    }

    function revealAnswer() {
      if (binaryNumber.value !== "") {
        binaryDecimal.value = parseInt(binaryNumber.value, 2);
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
    });

    return {
      binaryNumber,
      userInput,
      result,
      rules,
      reveal,
      binaryDecimal,
      generateBinary,
      checkAnswer,
      handleAlertDismiss,
      revealAnswer,
      applySettings,
      binarySize,
    };
  },
});
</script>

<style scoped>
.v-alert {
  margin-top: 1rem;
}
</style>
