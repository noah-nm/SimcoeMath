<template>
    <h1 class="display-2 text-center mt-2">Data Storage Practice</h1>
    <h2 class="text-center font-italic">Practice converting and performing arithmetic on different bases</h2>

    <v-row class="pa-7">
        <v-col cols="12" md="3">
            <v-card
            class="pa-4 align-center"
            height="200"
            title="Binary to Decimal"
            text="practice converting binary numbers to a decimal format"
            >

            <v-card-action >
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
    </v-row>
    
</template>