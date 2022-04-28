<template>
  <div>
    <el-container>
      <el-header>
        <template v-if="true === loggedRef">
          <LogoutButton />
        </template>
        <template v-else>
          <LoginButton />
        </template>
      </el-header>
      <el-main v-if="true === loggedRef">
        <el-table :data="usersTableData" :row-class-name="getUsersTableRowClass">
          <el-table-column prop="username" label="username" sortable />
          <el-table-column prop="ctime" label="ctime" sortable />
          <el-table-column label="manage">
            <template #default="scope">
              <RemoveButton @remove:done="getUsersTableData" :username="scope.row.username" />
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import LoginButton from "@components/LoginButton.vue";
import LogoutButton from "@components/LogoutButton.vue";
import RemoveButton from "@components/RemoveButton.vue";
import api from "@lib/api";
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";

const loggedRef = ref(true);
const usersTableData = reactive([]);

function getUsers() {
  const apiName = "users";
  const apiHandler = api.user[apiName] || (() => null);

  return apiHandler().then((res) => {
    clearUsersTableData();
    res.data.users.forEach((c) => usersTableData.push(c));
  });
}

function checkLogin() {
  const apiName = "check";
  const apiHandler = api.user[apiName] || (() => null);

  return apiHandler().then((res) => (loggedRef.value = 200 === res.status && true === res.data.success));
}

function clearUsersTableData() {
  usersTableData.splice(0, usersTableData.length);
}

function getUsersTableData() {
  checkLogin()
    .then((logged) => {
      if (true === logged) {
        getUsers();
      } else {
        localStorage.removeItem("username");
        clearUsersTableData();
      }
    })
    .catch((e) => ElMessage({ type: "error", message: e.message || `api server failed`, showClose: true }));
}

function getUsersTableRowClass({ row }) {
  return row.username === localStorage.getItem("username") ? "success-row" : "";
}

getUsersTableData();
</script>
