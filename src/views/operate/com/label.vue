<template>
    <div class="label-box">
      <div class="title-text">{{ title }}:</div>
      <slot></slot>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        default() {
          return "";
        },
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .label-box {
    width: 500px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 40px;
    margin-right: 50px;
    .title-text {
      width: 120px;
      height: 40px;
       display: flex;
       flex-direction: row;
       align-items: center;
       justify-content: flex-start;
       font-size: 14px;
    }
  }
  </style>