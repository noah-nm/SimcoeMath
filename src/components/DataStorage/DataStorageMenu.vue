<template>
  <h1 class="display-2 text-center mt-2">Data Storage Practice</h1>
  <h2 class="text-center font-italic">
    Practice converting and performing arithmetic on different bases
  </h2>
  <v-divider
    :thickness="2"
    class="border-opacity-25 mt-5 ml-8 mr-8"
  ></v-divider>
  <h2 class="text-center mt-5 text-decoration-underline">Binary</h2>
  <v-row class="pt-8 pr-8 pl-8 pb-5">
    <v-col cols="12" md="3">
      <v-card
        class="pa-4 align-center"
        height="200"
        title="Binary to Decimal"
        text="practice converting binary numbers to a decimal format"
      >
        <v-card-action>
          <v-btn :to="'/binary-to-decimal'">Start Practicing!</v-btn>
        </v-card-action>
      </v-card>
    </v-col>
    <v-col cols="12" md="3">
      <v-card
        class="pa-4 align-center"
        height="200"
        title="Decimal to Binary"
        text="practice converting decimal numbers to a binary format"
      >
        <v-card-action>
          <v-btn :to="'/decimal-to-binary'">Start Practicing!</v-btn>
        </v-card-action>
      </v-card>
    </v-col>
    <v-col cols="12" md="3">
      <v-card
        class="pa-4 align-center"
        height="200"
        title="Binary Addition"
        text="practice adding binary numbers"
      >
        <v-card-action>
          <v-btn class="mt-5" :to="'/binary-addition'">Start Practicing!</v-btn>
        </v-card-action>
      </v-card>
    </v-col>
    <v-col cols="12" md="3">
      <v-card
        class="pa-4 align-center"
        height="200"
        title="Binary Multiplication"
        text="practice multiplying binary numbers"
      >
        <v-card-action>
          <v-btn class="mt-5" :to="'/binary-multiplication'"
            >Start Practicing!</v-btn
          >
        </v-card-action>
      </v-card>
    </v-col>
  </v-row>

  <v-divider
    :thickness="2"
    class="border-opacity-25 ml-8 mr-8 mb-5"
  ></v-divider>
  <h2 class="text-center mt-5 mb-7 text-decoration-underline">Octal</h2>
  <v-row class="pr-8 pl-8 pb-5">
    <v-col cols="12" md="3">
      <v-card
        class="pa-4 align-center"
        height="200"
        title="Octal to Decimal"
        text="practice converting octal numbers to a decimal format"
      >
        <v-card-action>
          <v-btn :to="'/octal-to-decimal'">Start Practicing!</v-btn>
        </v-card-action>
      </v-card>
    </v-col>
    <v-col cols="12" md="3">
      <v-card
        class="pa-4 align-center"
        height="200"
        title="Decimal to Octal"
        text="practice converting decimal numbers to an octal format"
      >
        <v-card-action>
          <v-btn :to="'/decimal-to-octal'">Start Practicing!</v-btn>
        </v-card-action>
      </v-card>
    </v-col>
  </v-row>

  <v-divider
    :thickness="2"
    class="border-opacity-25 ml-8 mr-8 mb-5"
  ></v-divider>
  <h2 class="text-center mt-5 mb-7 text-decoration-underline">Hexadecimal</h2>
  <v-row class="pr-8 pl-8 pb-5">
    <v-col cols="12" md="3">
      <v-card
        class="pa-4 align-center"
        height="200"
        title="Hexadecimal to Decimal"
        text="practice converting hexadecimal numbers to a decimal format"
      >
        <v-card-action>
          <v-btn :to="'/hexadecimal-to-decimal'">Start Practicing!</v-btn>
        </v-card-action>
      </v-card>
    </v-col>
    <v-col cols="12" md="3">
      <v-card
        class="pa-4 align-center"
        height="200"
        title="Decimal to Hexadecimal"
        text="practice converting decimal numbers to a hexadecimal format"
      >
        <v-card-action>
          <v-btn :to="'/decimal-to-hexadecimal'">Start Practicing!</v-btn>
        </v-card-action>
      </v-card>
    </v-col>
  </v-row>
  <v-divider
    :thickness="2"
    class="border-opacity-25 ml-8 mr-8 mb-5"
  ></v-divider>
  <h2 class="text-center mt-5 text-decoration-underline">Miscellaneous</h2>
  <v-row class="pt-8 pr-8 pl-8 pb-5">
    <v-col cols="12" md="3">
      <v-card
        class="pa-4 align-center"
        height="200"
        title="Binary to Octal"
        text="practice converting binary numbers to an octal format"
      >
        <v-card-action>
          <v-btn :to="'/binary-to-octal'">Start Practicing!</v-btn>
        </v-card-action>
      </v-card>
    </v-col>
    <v-col cols="12" md="3">
      <v-card
        class="pa-4 align-center"
        height="200"
        title="Octal to Binary"
        text="practice converting octal numbers to a binary format"
      >
        <v-card-action>
          <v-btn :to="'/octal-to-binary'">Start Practicing!</v-btn>
        </v-card-action>
      </v-card>
    </v-col>
    <v-col cols="12" md="3">
      <v-card
        class="pa-4 align-center"
        height="200"
        title="Binary to Hexadecimal"
        text="practice converting binary numbers to a hexadecimal format"
      >
        <v-card-action>
          <v-btn :to="'/binary-to-hexadecimal'">Start Practicing!</v-btn>
        </v-card-action>
      </v-card>
    </v-col>
    <v-col cols="12" md="3">
      <v-card
        class="pt-4 pr-4 pl-4 align-center"
        height="200"
        title="Hexadecimal to Binary"
        text="practice converting hexadecimal numbers to a binary format"
      >
        <v-card-action>
          <v-btn :to="'/hexadecimal-to-binary'">Start Practicing!</v-btn>
        </v-card-action>
      </v-card>
    </v-col>
  </v-row>
</template>
