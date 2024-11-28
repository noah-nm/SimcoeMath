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
                    v-model="octalSize"
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
          <h1 class="text-center mr-6">Convert the octal number to binary</h1>

          <v-row class="mt-8">
            <v-col>
              <h3 class="text-center">
                Octal Number:
                <strong class="text-primary">{{ octalNumber }}</strong>
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
                @click="generateOctal"
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
                <strong v-if="reveal">{{ octalBinary }}</strong>
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
  name: "OctalToBinaryGame",
  setup() {
    const octalNumber = ref<string>("0");
    const userInput = ref<string>("");
    const result = ref<{ correct: boolean; message: string } | null>(null);
    const reveal = ref<boolean>(false);
    const octalBinary = ref<string>("");
    const octalSize = ref<number>(4);

    function generateOctal() {
      const randomOctal = Array.from({ length: octalSize.value }, () =>
        Math.floor(Math.random() * 8),
      ).join("");
      octalNumber.value = randomOctal;
      userInput.value = "";
      octalBinary.value = parseInt(randomOctal, 8).toString(2);
      reveal.value = false;
      result.value = null;
    }

    function checkAnswer() {
      if (octalNumber.value === "0" || userInput.value === "") return;

      if (userInput.value === octalBinary.value) {
        result.value = { correct: true, message: "Correct!" };
      } else {
        result.value = { correct: false, message: `Incorrect` };
      }
    }

    function revealAnswer() {
      if (octalNumber.value !== "0") {
        reveal.value = true;
      }
    }

    function handleAlertDismiss() {
      result.value = null;
    }

    function applySettings() {
      if (octalSize.value > 0) {
        generateOctal();
      }
    }

    onMounted(() => {
      generateOctal();
      reveal.value = false;
    });

    return {
      octalNumber,
      userInput,
      result,
      reveal,
      octalBinary,
      generateOctal,
      checkAnswer,
      handleAlertDismiss,
      revealAnswer,
      octalSize,
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
