<template>
  <!-- element-ui 级联组件 -->
  <el-cascader
    size="mini"
    :options="treeData"
    :props="props"
    separator="-"
  />
</template>

<script>
import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'
export default {
  data() {
    return {
      treeData: [],
      props: {
        value: 'id',
        label: 'name'
      }
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    async getDepartment() {
      // 将组织架构的数据转化成树形 赋值给treeData
      this.treeData = transListToTreeData(await getDepartment(), 0)
    }
  }
}
</script>
