<template>
  <v-text-field
    class="search-text-field"
    label="Search"
    prepend-inner-icon="search"
    flat
    :autofocus="autofocus"
    solo-inverted
    hide-details
    v-model="searchText"
    clearable
    @keydown.stop=""
    @blur="onBlur"
  ></v-text-field>
</template>

<script lang="ts">
import Vue from 'vue';
import { Watch, Prop, Component } from 'vue-property-decorator';
import debounce from 'lodash/debounce';

@Component
export default class SearchTextField extends Vue {
  private searchText = '';
  private debouncedHandleSearchTextChanged!: () => void;

  @Prop({ default: false }) autofocus!: boolean;

  @Watch('searchText')
  onSearchTextChanged(newVal: string, oldVal: string) {
    this.debouncedHandleSearchTextChanged();
  }

  created() {
    this.debouncedHandleSearchTextChanged = debounce(
      this.handleSearchTextChanged,
      350
    );
  }

  handleSearchTextChanged() {
    if (this.searchText && this.searchText.trim().length > 0) {
      this.$router.push({ name: 'search', query: { q: this.searchText } });
    }
  }

  onBlur() {
    this.$emit('on-blur');
  }
}
</script>

<style lang="scss">
.v-input.v-text-field.search-text-field .v-input__control {
  min-height: 4rem;
  align-items: flex-end;
}

.v-input.v-text-field.search-text-field .v-input__slot {
  border-radius: 2rem;
  // width: 35rem;
}
</style>
