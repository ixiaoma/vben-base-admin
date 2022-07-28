<template>
  <a-card title="当事人">
    <div class="list-item" v-for="(item, index) in litigantList" :key="index">
      <div class="item-header">
        <div class="row">
          <div>
            <user-outlined :style="{ color: getColor(item.itemData?.litigantType)}" fill/>
            <span class="litigant-title">{{getEnum('LitigantTypeEnum', false, item.itemData?.litigantType)}}</span>
          </div>
          <a href="#" v-if="['accuser', 'accused'].includes(item.itemData?.litigantType)">添加代理人</a>
          <div v-else>
            <a href="#">编辑</a>
            <a-divider type="vertical" />
            <a href="#">删除</a>
          </div>
        </div>
        <div class="row bottom-row">
          <span class="litigant-name">{{item.itemData?.litigantName}}</span>
        </div>
      </div>
      <a-descriptions :column="1" size="small" class="item-content">
        <a-descriptions-item
          v-for="(child, childIndex) in item.fieldInfo"
          :key="childIndex"
          :label="child.label"
          :contentStyle="{ fontSize: '14px' }"
        >
          <div class="ellipsis-text">{{ item.itemData[child.field] }}</div>
        </a-descriptions-item>
      </a-descriptions>
    </div>
  </a-card>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { UserOutlined } from '@ant-design/icons-vue';

  import { getEnum } from '/@/utils/commonUtil';

  import { getLitigantInfo } from './casedetail.data';
  import { getWorkPlaceLitigantInfo, getCaseLitigantInfo } from '/@/api/manage/caseallocation';

  const litigantInfo = getLitigantInfo()
  const litigantList = ref<any[]>([])
  
  async function getLitigantList() {
    const { query } = useRoute();
    const { caseNo } = query;
    const params = { caseNo }
    const res = await getCaseLitigantInfo(params)
    litigantList.value = res.list?.map(ele => {
      const fieldInfo = Reflect.has(litigantInfo, ele.litigantType) ? litigantInfo[ele.litigantType] : litigantInfo['default_list']
      return {
        fieldInfo,
        itemData: ele
      }
    })
  }
  getLitigantList()

  function getColor(type){
    return type === 'accuser' ? '#448EF7' : type === 'accused' ? '#F39B49' : '#7573F2'
  }
  
</script>
<style lang="less" scoped>
  .list-item{
    box-shadow: 0px 2px 4px 1px @weak-primay-color;

    .item-header{
      padding: 16px;
      background-color: @weak-primay-color;

      .row{
        display: flex;
        justify-content: space-between;

        .litigant-title{
          margin-left: 8px;
          color: @weak-grey-color
        }

        .litigant-name{
          padding-left: 22px;
          font-size: 18px;
        }
      }
    }

    .item-content{
      padding: 16px 30px;
    }
  }
</style>