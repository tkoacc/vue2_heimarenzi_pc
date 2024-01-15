<template>
  <div class="container">
    <div class="app-container">
      <!-- 展示树形结构 -->
      <el-tree :expand-on-click-node="false" default-expand-all :data="depts" :props="defaultProps">
        <!-- 节点结构 -->
        <!-- v-slot -->
        <template v-slot="{data}">
          <el-row
            style="width: 100%;height: 40px"
            type="flex"
            justify="space-between"
            align="middle"
          >
            <el-col>传智教育-{{ data.name }}</el-col>
            <el-col :span="6">
              <span class="tree-manager">{{ data.managerName }}</span>
              <el-dropdown @command="operateDept">
                <!-- 显示区域内容 -->
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <!-- 下拉菜单选项 -->
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="del">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
    <!-- 放置弹层 -->
    <add-dept :show-dialog.sync="showDialog" />
  </div>
</template>

<script>
import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'
import AddDept from './components/add-dept'
export default {
  name: 'Department',
  components: { AddDept },
  data() {
    return {
      showDialog: false,
      // 数据属性
      depts: [],
      defaultProps: {
        label: 'name',
        children: 'children'
      }
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    async getDepartment() {
      const res = await getDepartment()
      this.depts = transListToTreeData(res, 0)
    },
    // 操作部门方法
    operateDept(type) {
      if (type === 'add') {
        // 添加子部门
        // 显示弹层
        this.showDialog = true
      }
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 30px 140px;
  font-size: 14px;
}
.tree-manager{
  width: 100px;
  display: inline-block;
  margin: 15px;
}
</style>
