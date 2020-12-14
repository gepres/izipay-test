import Vue from 'vue'
// import { Stack, StackItem } from 'vue-stack-grid'
// import '@aws-amplify/ui-vue';

// Vue.component('Stack', Stack)
// Vue.component('StackItem', StackItem)
import Amplify, * as AmplifyModules from "aws-amplify";
// import { AmplifyPlugin } from "@aws-amplify/ui-vue";
import '@aws-amplify/ui-vue';
import awsmobile from "./awsAuth";

Amplify.configure(awsmobile);

// Vue.use(AmplifyPlugin, AmplifyModules);
