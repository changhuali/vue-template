<template>
  <label
    :style="cssStyle"
    :class="$style['checkbox-wrapper']"
  >
    <span
      :class="[
        $style['checkbox'],
        {[$style['checkbox-checked']]: checked},
      ]"
    >
      <input
        :class="$style['checkbox-input']"
        :checked="checked"
        type="checkbox"
        @click="handleChecked($event)"
      >
      <span :class="$style['checkbox-inner']" />
    </span>
    <span
      v-if="hasSlot"
      :class="$style['label']"
    >
      <slot />
    </span>
  </label>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    onChange: {
      type: Function,
      default: undefined,
    },
    cssStyle: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      checked: this.value,
      hasSlot: !!Object.keys(this.$slots).length,
    };
  },
  watch: {
    value(newValue) {
      this.checked = newValue;
    },
  },
  methods: {
    handleChecked(evt) {
      this.checked = evt.target.checked;
      if (this.onChange) {
        this.onChange(evt);
      }
    },
  },
};
</script>

<style src="./index.less" module></style>
