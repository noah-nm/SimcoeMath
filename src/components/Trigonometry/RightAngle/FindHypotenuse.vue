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
                    label="min side length"
                    width="160"
                    placeholder="min side length"
                    hide-details
                    v-model="this.minSideLength"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    label="max side length"
                    width="160"
                    placeholder="max side length"
                    hide-details
                    v-model="this.maxSideLength"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-btn
                    color="primary"
                    class="mt-3 ml-10"
                    @click="this.applySettings"
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
          <h1 class="text-center">Find the Hypotenuse of the Triangle</h1>
          <h3 class="test-center font-italic">
            Round to the nearest hundredth
          </h3>

          <v-row justify="center">
            <v-col class="text-center ml-16">
              <!-- Triangle Visual -->
              <svg
                :width="svgWidth"
                :height="svgHeight"
                viewBox="-100 -100 200 200"
                class="triangle-svg"
              >
                <!-- Base line -->
                <line
                  :x1="-scaledA / 2 - 15"
                  :y1="scaledB / 2"
                  :x2="scaledA / 2 - 15"
                  :y2="scaledB / 2"
                  stroke="white"
                  stroke-width="2"
                />
                <text
                  :x="0 - 10"
                  :y="scaledB / 2 + 30"
                  fill="white"
                  text-anchor="middle"
                  font-size="12"
                >
                  a = {{ this.sideA.toFixed(2) }}
                </text>

                <!-- Vertical line -->
                <line
                  :x1="scaledA / 2 - 15"
                  :y1="scaledB / 2"
                  :x2="scaledA / 2 - 15"
                  :y2="-(scaledB / 2)"
                  stroke="white"
                  stroke-width="2"
                />
                <text
                  :x="scaledA / 2 + 20"
                  :y="5"
                  fill="white"
                  text-anchor="middle"
                  font-size="12"
                >
                  b = {{ this.sideB.toFixed(2) }}
                </text>

                <!-- Hypotenuse line -->
                <line
                  :x1="-scaledA / 2 - 15"
                  :y1="scaledB / 2"
                  :x2="scaledA / 2 - 15"
                  :y2="-(scaledB / 2)"
                  stroke="#800020"
                  stroke-width="2"
                />
              </svg>
            </v-col>
          </v-row>

          <v-row class="mb-4 mt-7">
            <v-col>
              <v-text-field
                v-if="!this.reveal"
                v-model="userInput"
                label="Enter Hypotenuse"
                type="input"
              ></v-text-field>
              <v-text-field
                v-if="this.reveal"
                disabled
                label="Enter Hypotenuse"
                type="input"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col class="d-flex" cols="auto">
              <v-btn
                color="primary"
                class="mr-6 pr-6 pl-6"
                @click="this.generateTriangle()"
                >New Triangle</v-btn
              >
              <v-btn class="mr-6" color="success" @click="this.checkAnswer"
                >Check Answer</v-btn
              >
              <v-btn color="primary" @click="this.revealAnswer"
                >Reveal Answer</v-btn
              >
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-alert
                v-if="this.result != null"
                :type="this.result.correct ? 'green' : 'error'"
                closable
                @click:close="this.handleAlertDismiss()"
              >
                {{ this.result.message }}
              </v-alert>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="ml-6">
              <h2 class="text-center" v-if="reveal">
                The Correct Answer is:
                <strong>{{ this.sideC.toFixed(2) }}</strong>
              </h2>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FindHypotenuse",
  data() {
    return {
      // proportional sides used in triangle visual generation
      sideAProportional: 0,
      sideBProportional: 0,
      sideCProportional: 0,
      sideA: 0,
      sideB: 0,
      sideC: 0,
      minSideLength: 1,
      maxSideLength: 100,
      userInput: "",
      result: null as { correct: boolean; message: string } | null,
      reveal: false,
      MIN_SIDE_LENGTH_PROPORTIONAL: 1, // Minimum side length used for svg proportions
      MAX_SIDE_LENGTH_PROPORTIONAL: 10, // Maximum side length used for svg proportions
      SCALE_FACTOR: 10, // control scaling
      svgWidth: 600,
      svgHeight: 500,
    };
  },
  computed: {
    scaledA(): number {
      return this.sideAProportional * this.SCALE_FACTOR;
    },
    scaledB(): number {
      return this.sideBProportional * this.SCALE_FACTOR;
    },
  },
  methods: {
    generateTriangle() {
      // generate sides used in svg proportions
      this.sideAProportional =
        Math.random() *
          (this.MAX_SIDE_LENGTH_PROPORTIONAL -
            this.MIN_SIDE_LENGTH_PROPORTIONAL) +
        this.MIN_SIDE_LENGTH_PROPORTIONAL;
      this.sideBProportional =
        Math.random() *
          (this.MAX_SIDE_LENGTH_PROPORTIONAL -
            this.MIN_SIDE_LENGTH_PROPORTIONAL) +
        this.MIN_SIDE_LENGTH_PROPORTIONAL;
      this.sideCProportional = Math.sqrt(
        this.sideAProportional ** 2 + this.sideBProportional ** 2,
      );

      // generate sides displayed to user
      const scale =
        (this.maxSideLength - this.minSideLength) /
        (this.MAX_SIDE_LENGTH_PROPORTIONAL - this.MIN_SIDE_LENGTH_PROPORTIONAL);
      this.sideA = this.sideAProportional * scale + this.minSideLength;
      this.sideB = this.sideBProportional * scale + this.minSideLength;
      this.sideC = this.sideCProportional * scale + this.minSideLength;

      // scales sides down if generated too large
      if (
        this.sideA > this.maxSideLength ||
        this.sideB > this.maxSideLength ||
        this.sideC > this.maxSideLength
      ) {
        const finalScalingFactor = this.maxSideLength / this.sideC;
        this.sideA *= finalScalingFactor;
        this.sideB *= finalScalingFactor;
        this.sideC *= finalScalingFactor;
      }

      // final side c calculation for accuracy
      // this ensures that the answer is calculated the same
      // way a user would calculate this answer
      this.sideC = Math.sqrt(
        parseFloat(this.sideA.toFixed(2)) ** 2 +
          parseFloat(this.sideB.toFixed(2)) ** 2,
      );

      this.result = null;
      this.userInput = "";
      this.reveal = false;
    },

    checkAnswer() {
      const isCorrect =
        parseFloat(this.userInput) === parseFloat(this.sideC.toFixed(2));
      this.result = {
        correct: isCorrect,
        message: isCorrect ? "Correct!" : "Incorrect. Please try again.",
      };
    },
    applySettings() {
      if (this.minSideLength > 0 && this.maxSideLength > 0) {
        this.generateTriangle();
      }
    },
    revealAnswer() {
      this.reveal = true;
    },
    handleAlertDismiss() {
      this.result = null;
    },
  },
  mounted() {
    this.generateTriangle();
    this.reveal = false;
    this.result = null;
  },
});
</script>

<style scoped>
.v-alert {
  margin-top: 1rem;
}
.centered-content {
  text-align: center;
}
.triangle-svg {
  margin: 0 auto;
  display: block;
}
</style>
