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
          <h1 class="text-center mr-6">Convert the decimal number to binary</h1>

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
                <strong v-if="reveal">{{ decimalBinary }}</strong>
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
    const decimalNumber = ref<number>(0);
    const userInput = ref<string>("");
    const result = ref<{ correct: boolean; message: string } | null>(null);
    const reveal = ref<boolean>(false);
    const decimalBinary = ref<string>("");
    const binarySize = ref<number>(8);

    const rules = {
      required: (v: any) => !!v || "Required.",
    };

    function generateDecimal() {
      let randomDecimal;
      const bitLength = Math.floor(Math.random() * binarySize.value) + 1;
      const maxDecimal = Math.pow(2, bitLength) - 1;

      do {
        randomDecimal = Math.floor(Math.random() * (maxDecimal + 1));
      } while (randomDecimal === decimalNumber.value);

      decimalNumber.value = randomDecimal;
      userInput.value = "";
      decimalBinary.value = randomDecimal.toString(2);
      reveal.value = false;
      result.value = null;
    }

    function checkAnswer() {
      if (decimalNumber.value === 0 || userInput.value === "") return;

      const trimmedUserInput = userInput.value.replace(/^0+/, "");
      const trimmedDecimalBinary = decimalBinary.value.replace(/^0+/, "");

      if (userInput.value == decimalBinary.value) {
        result.value = { correct: true, message: "Correct!" };
      } else {
        result.value = {
          correct: false,
          message: `Incorrect. Please try again.`,
        };
      }

      console.log(decimalBinary);
      console.log(userInput.value);
      console.log(result.value);
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
      if (binarySize.value > 0) {
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
      rules,
      reveal,
      decimalBinary,
      generateDecimal,
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
