<template>
  <div>
    <el-menu-item
      v-if="!item.children && !item.hidden"
      :index="item.name"
      @click="click(item)"
    >
      <i :class="item.meta.icon" />
      <span slot="title">{{ item.meta.title || item.name }}</span>
    </el-menu-item>

    <el-submenu v-if="item.children && !item.hidden" :index="item.name">
      <template slot="title">
        <i :class="item.meta.icon" />
        <span>{{ item.meta.title }}</span>
      </template>
      <div v-for="key in item.children" :key="key.name">
        <menu-item :item="key" @active="click"> </menu-item>
      </div>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: "menuItem",
  props: {
    item: {
      type: Object,
    },
  },
  methods: {
    click(item) {
      this.$emit("active", item);
    },
  },
};
</script>

<style lang="sass" scoped>
</style>