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
                    placeholder="octal size"
                    hide-details
                    v-model="hexSize"
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
            Convert the hexadecimal number to binary
          </h1>

          <v-row class="mt-8">
            <v-col>
              <h3 class="text-center">
                Hexadecimal Number:
                <strong class="text-primary">{{ hexNumber }}</strong>
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
                @click="generateHex"
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
                <strong v-if="reveal">{{ hexNumber }}</strong>
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
  name: "HexToBinaryGame",
  setup() {
    const hexNumber = ref<string>("");
    const userInput = ref<string | null>(null);
    const result = ref<{ correct: boolean; message: string } | null>(null);
    const reveal = ref<boolean>(false);
    const binaryValue = ref<string | null>(null);
    const hexSize = ref<number>(4);

    function generateHex() {
      const randomHex = Array.from({ length: hexSize.value }, () =>
        Math.floor(Math.random() * 16).toString(16),
      )
        .join("")
        .toUpperCase();
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

    function applySettings() {
      if (hexSize.value > 0) {
        generateHex();
      }
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
      applySettings,
      hexSize,
    };
  },
});
</script>
