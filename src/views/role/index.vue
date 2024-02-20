<template>
  <div class="container">
    <div class="app-container">
      <!-- 角色管理 -->
      <div class="role-operate">
        <el-button size="mini" type="primary" @click="showDialog = true">新增角色</el-button>
      </div>
      <!-- 放置table组件 -->
      <el-table :data="list">
        <!-- 放置列 -->
        <el-table-column prop="name" align="center" width="200" label="角色">
          <template v-slot="{ row }">
            <!-- 条件判断 -->
            <el-input v-if="row.isEdit" v-model="row.editRow.name" size="mini" />
            <span v-else>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" align="center" width="200" label="启用">
          <!-- 自定义列结构 -->
          <template v-slot="{ row }">
            <el-switch v-if="row.isEdit" v-model="row.editRow.state" :active-value="1" :inactive-value="0" />
            <span v-else>
              {{ row.state === 1 ? '已启用' : row.state === 0 ? '未启用' : '无' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="description" align="center" label="描述">
          <template v-slot="{ row }">
            <el-input v-if="row.isEdit" v-model="row.editRow.description" size="mini" type="textarea" />
            <span v-else>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <!-- 放置操作按钮 -->
          <template v-slot="{ row }">
            <template v-if="row.isEdit">
              <!-- 编辑状态 -->
              <el-button size="mini" type="primary" @click="btnEditOK(row)">确定</el-button>
              <el-button size="mini" @click="row.isEdit = false">取消</el-button>
            </template>
            <template v-else>
              <!-- 非编辑状态 -->
              <el-button size="mini" type="text" @click="btnPermission">分配权限</el-button>
              <el-button size="mini" type="text" @click="btnEditRow(row)">编辑</el-button>
              <el-popconfirm
                title="这段内容确定删除吗"
                @onConfirm="confirmDel(row.id)"
              >
                <el-button slot="reference" style="margin-left: 10px" size="mini" type="text">删除</el-button>
              </el-popconfirm>
            </template>
          </template>

        </el-table-column>
      </el-table>
      <!-- 放置分页组件 -->
      <el-row type="flex" style="height:60px" align="middle" justify="end">
        <!-- 放置分页组件 -->
        <el-pagination
          :page-size="pageParams.pagesize"
          :current-page="pageParams.page"
          :total="pageParams.total"
          layout="prev, pager, next"
          @current-change="changePage"
        />
      </el-row>
    </div>
    <!-- 放置弹层组件 -->
    <el-dialog width="500px" :visible.sync="showDialog" title="新增角色" @close="btnCancel">
      <!-- 表单内容 -->
      <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
        <el-form-item prop="name" label="角色名称">
          <el-input v-model="roleForm.name" style="width:300px" size="mini" />
        </el-form-item>
        <el-form-item label="启用" prop="state">
          <el-switch v-model="roleForm.state" :active-value="1" :inactive-value="0" size="mini" />
        </el-form-item>
        <el-form-item prop="description" label="角色描述">
          <el-input v-model="roleForm.description" type="textarea" :rows="3" style="width:300px" size="mini" />
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <el-button type="primary" size="mini" @click="btnOK">确定</el-button>
              <el-button size="mini" @click="btnCancel">取消</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 放置权限弹层 -->
    <el-dialog :visible.sync="showPermissionDialog" title="分配权限">
      <!-- 放置权限数据 -->
      <el-tree
        :data="permissionData"
        :props="{label: 'name'}"
        show-checkbox
        default-expand-all
      />
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, addRole, updateRole, delRole } from '@/api/role'
import { getPermissionList } from '@/api/permission'
import { transListToTreeData } from '@/utils'
export default {
  name: 'Role',
  data() {
    return {
      list: [],
      // 控制弹层显示隐藏
      showDialog: false,
      // 将分页信息放置到一个对象中
      pageParams: {
        // 第几页
        page: 1,
        // 每页几条
        pagesize: 5,
        // 总条数
        total: 0
      },
      roleForm: {
        name: '',
        description: '',
        // 默认未启用状态
        state: 0
      },
      rules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '角色描述不能为空', trigger: 'blur' }
        ]
      },
      showPermissionDialog: false,
      permissionData: []
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows, total } = await getRoleList(this.pageParams)
      // 赋值数据
      this.list = rows
      // 赋值总条数
      this.pageParams.total = total
      // 针对每一行数据添加一个编辑标记
      this.list.forEach(item => {
        // 添加一个属性 初始值为false
        this.$set(item, 'isEdit', false)
        this.$set(item, 'editRow', {
          name: item.name,
          description: item.description,
          state: item.state
        })
      })
    },
    // 切换分页时 请求新的数据
    changePage(newPage) {
      // 赋值当前页码
      this.pageParams.page = newPage
      this.getRoleList()
    },
    btnOK() {
      this.$refs.roleForm.validate(async(isOK) => {
        if (isOK) {
          await addRole(this.roleForm)
          this.$message.success('新增角色成功')
          this.getRoleList()
          this.btnCancel()
        }
      })
    },
    btnCancel() {
      // 重置表单数据
      this.$refs.roleForm.resetFields()
      // 关闭弹层
      this.showDialog = false
    },
    // 点击编辑行
    btnEditRow(row) {
      // 改变行的编辑状态
      row.isEdit = true
      // 更新缓存数据
      row.editRow.name = row.name
      row.editRow.description = row.description
      row.editRow.state = row.state
    },
    // 点击确定时触发
    async btnEditOK(row) {
      if (row.editRow.name && row.editRow.description) {
        // 下一步操作
        await updateRole({ ...row.editRow, id: row.id })
        // 更新成功
        this.$message.success('更新角色信息成功')
        // 更新显示数据 退出编辑状态
        // 规避eslint误判
        Object.assign(row, {
          ...row.editRow,
          isEdit: false
        })
      } else {
        this.$message.warning('角色名称和描述不能为空')
      }
    },
    // 点击了确定触发的
    async confirmDel(id) {
      // 后端删除
      await delRole(id)
      this.$message.success('删除角色成功')
      // 删除的如果是最后一个
      if (this.list.length === 1 && this.pageParams.page > 1) {
        this.pageParams.page--
      }
      this.getRoleList()
    },
    async btnPermission() {
      this.showPermissionDialog = true
      this.permissionData = transListToTreeData(await getPermissionList(), 0)
    }
  }
}
</script>

<style scoped>
.role-operate{
  padding:10px;
}
</style>
