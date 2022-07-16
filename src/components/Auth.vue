<template>
  <div class="login">
    <el-row class="background">
      <el-col :span="10" class="col-4"></el-col>
      <el-col :span="14"></el-col>
    </el-row>
    <el-row class="auth-form">
      <el-col :span="8" class="p-5">
        <img alt="Vue logo" src="../assets/logo.png" />
      </el-col>
      <el-col :span="16">
        <slot name="form"></slot>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.login {
  justify-content: center;
  align-items: center;
  position: relative;
  .background {
    position: absolute;
    z-index: -1;
    height: 100vh;
    width: 100%;
    padding: 0;
    margin: 0;
    .col-4 {
      background-color: #6fffbe;
    }
  }
}
</style>
