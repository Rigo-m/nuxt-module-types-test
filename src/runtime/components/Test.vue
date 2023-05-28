<script setup lang="ts" generic="KType extends keyof SomeType">
const props = defineProps({
  myKey: KType,
});
console.log(props.myKey, "should be of type sometype");
</script>

<template>
  <div>Test component</div>
</template>
