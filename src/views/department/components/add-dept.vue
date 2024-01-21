<template>
  <el-dialog :title="showTitle" :visible="showDialog" @close="close">
    <!-- 放置弹层内容 -->
    <el-form ref="addDept" :model="formData" :rules="rules" label-width="120px">
      <el-form-item prop="name" label="部门名称">
        <el-input v-model="formData.name" placeholder="2-10个字符" style="width: 80%" size="mini" />
      </el-form-item>
      <el-form-item prop="code" label="部门编码">
        <el-input v-model="formData.code" placeholder="2-10个字符" style="width: 80%" size="mini" />
      </el-form-item>
      <el-form-item prop="managerId" label="部门负责人">
        <el-select v-model="formData.managerId" placeholder="请选择负责人" style="width: 80%" size="mini">
          <!-- 下拉选项 循环 负责人数据 label表示显示的字段 value存储字段 -->
          <el-option
            v-for="item in managerList"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="introduce" label="部门介绍">
        <el-input v-model="formData.introduce" placeholder="1-100个字符" type="textarea" style="width: 80%" size="mini" :rows="4" />
      </el-form-item>
      <el-form-item>
        <!-- 按钮 -->
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button size="mini" type="primary" @click="btnOK">确认</el-button>
            <el-button size="mini" @click="close">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { updateDepartment, getDepartmentDetail, getDepartment, getManagerList, addDepartment } from '@/api/department'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    currentNodeId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      managerList: [],
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
        }, {
          trigger: 'blur',
          // 自定义校验模式
          validator: async(rule, value, callback) => {
            // value 就是我们输入的值
            let res = await getDepartment()
            // 判断是否是编辑模式
            if (this.formData.id) {
              // 编辑模式
              res = res.filter(item => item.id !== this.formData.id)
            }
            // result 数组中是否存在 value
            if (res.some(item => item.code === value)) {
              callback(new Error('部门编码不能重复'))
            } else {
              callback()
            }
          }
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
        }, { trigger: 'blur',
          // 自定义校验模式
          validator: async(rule, value, callback) => {
            // value 就是我们输入的值
            let res = await getDepartment()
            if (this.formData.id) {
              // 编辑模式 需要排除自己
              res = res.filter(item => item.id !== this.formData.id)
            }
            // result 数组中是否存在 value
            if (res.some(item => item.name === value)) {
              callback(new Error('部门中已经有该名称了'))
            } else {
              callback()
            }
          }
        }]
        // 父级部门的id
        // pid: ''
      }
    }
  },
  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '新增部门'
    }
  },
  created() {
    this.getManagerList()
  },
  methods: {
    close() {
      // 修改父组件的值
      // 重置表单
      this.formData = {
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
      }
      this.$refs.addDept.resetFields()
      this.$emit('update:showDialog', false)
    },
    async getManagerList() {
      this.managerList = await getManagerList()
    },
    // 点击确定时调用
    btnOK() {
      this.$refs.addDept.validate(async(isOK) => {
        if (isOK) {
          let msg = '新增'
          // 通过formData中的id判断是新增还是修改
          if (this.formData.id) {
            // 编辑场景
            msg = '更新'
            await updateDepartment(this.formData)
          } else {
            // 新增场景
            await addDepartment({ ...this.formData, pid: this.currentNodeId })
          }
          // 通知父组件更新
          this.$emit('updateDepartment')
          // 提示消息
          this.$message.success(`${msg}部门成功`)
          // 关闭弹层
          this.close()
        }
      })
    },
    // 获取组织的详情
    async getDepartmentDetail() {
      this.formData = await getDepartmentDetail(this.currentNodeId)
    }
  }
}
</script>

<style scoped>

</style>
