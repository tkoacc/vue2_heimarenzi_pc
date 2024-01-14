<template>
  <div class="container">
    <div class="app-container">
      <!-- 展示树形结构 -->
      <el-tree default-expand-all :data="depts" :props="defaultProps">
        <!-- 节点结构 -->
        <el-row
          style="width: 100%;height: 40px"
          type="flex"
          justify="space-between"
          align="middle"
        >
          <el-col>传智教育</el-col>
          <el-col :span="4">
            <span class="tree-manager">管理员</span>
            <el-dropdown>
              <!-- 显示区域内容 -->
              <span class="el-dropdown-link">
                操作<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <!-- 下拉菜单选项 -->
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>添加子部门</el-dropdown-item>
                <el-dropdown-item>编辑部门</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Department',
  data() {
    return {
      // 数据属性
      depts: [{ name: '传智教育', children: [{ name: '总裁办' }, { name: '行政部' }, { name: '人事部' }] }],
      defaultProps: {
        label: 'name',
        children: 'children'
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
  width: 50px;
  display: inline-block;
  margin: 10px;
}
</style>
