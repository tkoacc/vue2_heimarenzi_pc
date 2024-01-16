<template>
  <el-dialog title="新增部门" :visible="showDialog" @close="close">
    <!-- 放置弹层内容 -->
    <el-form ref="addDept" :model="formData" :rules="rules" label-width="120px">
      <el-form-item prop="name" label="部门名称">
        <el-input v-model="formData.name" placeholder="2-10个字符" style="width: 80%" size="mini">1</el-input>
      </el-form-item>
      <el-form-item prop="code" label="部门编码">
        <el-input v-model="formData.code" placeholder="2-10个字符" style="width: 80%" size="mini">1</el-input>
      </el-form-item>
      <el-form-item prop="managerId" label="部门负责人">
        <el-select v-model="formData.managerId" placeholder="请选择负责人" style="width: 80%" size="mini">1</el-select>
      </el-form-item>
      <el-form-item prop="introduce" label="部门介绍">
        <el-input v-model="formData.introduce" placeholder="1-100个字符" type="textarea" style="width: 80%" size="mini" :rows="4">1</el-input>
      </el-form-item>
      <el-form-item>
        <!-- 按钮 -->
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button size="mini" type="primary">确认</el-button>
            <el-button size="mini">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        // 部门编码
        code: '',
        // 部门介绍
        introduce: '',
        // 部门负责人id
        managerId: '',
        // 部门名称
        name: '',
        // 父级部门的id
        pid: ''
      },
      rules: {
        // 部门编码
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' }, {
          min: 2,
          max: 10,
          message: '部门编码要求2-10个字符',
          trigger: 'blur'
        }],
        // 部门介绍
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' }, {
          min: 1,
          max: 100,
          message: '部门介绍要求1-100个字符'
        }],
        // 部门负责人id
        managerId: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        // 部门名称
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' }, {
          min: 2,
          max: 10,
          message: '部门名称要求2-10个字符',
          trigger: 'blur'
        }]
        // 父级部门的id
        // pid: ''
      }
    }
  },
  methods: {
    close() {
      // 修改父组件的值
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

<style scoped>

</style>
