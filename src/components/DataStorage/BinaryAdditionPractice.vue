<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="5">
          <h1 class="text-center">Find the result of the binary addition</h1>

          <v-row class="mt-8">
            <v-col>
              <h3 class="text-center">
                <strong class="text-blue">{{ binaryNumber1 }}</strong>
                +
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
            <v-col class="d-flex" cols="auto">
              <v-btn class="mr-6 pr-6 pl-6"@click="performAddition" color="primary">New Number</v-btn>
              <v-btn class="mr-6" @click="checkAnswer" color="success">Check Answer</v-btn>
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
              <h2 class="text-center">The Correct Answer is: <strong v-if="reveal">{{ additionResult.toString(2) }}</strong></h2>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
</template>
  
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  
  export default defineComponent({
    name: 'BinaryGame',
    setup() {
      const binaryNumber1 = ref<string>('');
      const binaryNumber2 = ref<string>('');
      const userInput = ref<string | null>(null);
      const result = ref<{ correct: boolean; message: string } | null>(null);
      const reveal = ref<boolean>(false);
      const binaryDecimal1 = ref<number | null>(null);
      const binaryDecimal2 = ref<number | null>(null);
      const additionResult = ref<number | null>(null);
  
      const rules = {
        required: (v: any) => !!v || 'Required.',
        binary: (v: string) => /^[01]+$/.test(v) || 'Input must be a binary number (0 or 1)',
      };

      function performAddition() {
        const randomBinary1 = Array.from({ length: 8 }, () => Math.round(Math.random())).join('');
        const randomBinary2 = Array.from({ length: 8 }, () => Math.round(Math.random())).join('');
        binaryNumber1.value = randomBinary1;
        binaryNumber2.value = randomBinary2;
       
        binaryDecimal1.value = parseInt(binaryNumber1.value, 2);
        binaryDecimal2.value = parseInt(binaryNumber2.value, 2);

        userInput.value = null;
        reveal.value = false;
        result.value = null;

        additionResult.value = (binaryDecimal1.value || 0) + (binaryDecimal2.value || 0);
      }
  
      function checkAnswer() {
        if (additionResult.value === null || userInput.value === null) return;
        
        const userDecimal = parseInt(userInput.value, 2);
        if (userDecimal == additionResult.value) {
          result.value = { correct: true, message: 'Correct!' };
        } else {
          result.value = { correct: false, message: `Incorrect. Please try again.` };
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
      
      onMounted(() => {
        performAddition();
        reveal.value = false;
      })

      return {
        binaryNumber1,
        binaryNumber2,
        userInput,
        result,
        rules,
        reveal,
        additionResult,
        performAddition,
        checkAnswer,
        handleAlertDismiss,
        revealAnswer
      };
    },
  });
  </script>
  
  <style scoped>
  .v-alert {
    margin-top: 1rem;
  }
  </style>
  