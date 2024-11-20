<template>
  <h1 class="display-2 text-center mt-2">Grade 10 Practice</h1>
  <h2 class="text-center font-italic">
    Selection of various games related to topics covered in the Grade 10
    academic math curriculum
  </h2>
  <v-divider
    :thickness="2"
    class="border-opacity-25 mt-5 ml-8 mr-8"
  ></v-divider>
  <h2 class="text-center mt-5 text-decoration-underline">Trigonometry</h2>
  <v-row class="pt-8 pr-8 pl-8 pb-5">
    <v-col cols="12" md="3">
      <v-card
        class="pa-4 align-center"
        height="200"
        title="Find Hypotenuse"
        text="practice finding the hypotenuse of a right-angled triangle"
      >
        <v-card-action>
          <v-btn :to="'/find-hypotenuse'">Start Practicing!</v-btn>
        </v-card-action>
      </v-card>
    </v-col>
  </v-row>
</template>
