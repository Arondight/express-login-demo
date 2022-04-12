<template>
  <el-card class="box-card">
    <el-row type="flex" justify="center">
      <el-col :span="8">
        <el-form label-position="left" label-width="auto">
          <el-form-item label="username" prop="username">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="password" prop="password" :clearable="true">
            <el-input></el-input>
          </el-form-item>
          <el-form-item>
            <el-row :gutter="3">
              <el-col :span="12">
                <el-button type="primary">login</el-button>
              </el-col>
              <el-col :span="12">
                <router-link to="/register">
                  <el-button>register an account</el-button>
                </router-link>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup></script>
