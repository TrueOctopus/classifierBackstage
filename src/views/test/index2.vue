<template>
  <div class="test2">
    <SlideDiv>
      <template v-slot:left>
        <div style="height: 300px;background-color: red; width:100%;" />
      </template>
      <template v-slot:right>
        <div style="height: 300px;background-color: green; width: 100%" />
      </template>
    </SlideDiv>
  </div>
</template>
<script>
import SlideDiv from './slideDiv'
export default {
  name: 'Test2',
  components: {
    SlideDiv
  },
  props: {},
  data() {
    return {

    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
</style>
