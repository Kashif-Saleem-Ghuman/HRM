<template>
    <custom-table :fields="tableFields" class="border-gray4 bg-white"  :sections="tableSections"
        @item-clicked="handleItemClick_Table" :hide-no-column="true">
        <template #cell(name)="data">
            <div class="d-flex align-center text-left gap-05">
                <bib-avatar class="mt-auto mb-auto" shape="circle" :src="data.value.preview" size="3rem">
                </bib-avatar>
                <div class="info_wrapper">
                    <div class="title">
                    {{ data.value.name }}
                </div>
                <div class="description">
                    {{ data.value.desc }}
                </div>
                </div>
            </div>
        </template>
        <template  #cell(department)="data">
            <div class="justify-between text-dark">
                <span>{{ data.value.department }}</span>
            </div>
        </template>
        <template #cell(attendance)="data">
            <div class="justify-center text-dark">
                <circle-text :title="data.value.attendance" :className="data.value.bgColor"></circle-text>
            </div>
        
        </template>
        <template #cell(satisfaction)="data">
            <div class="justify-center text-dark">
                <circle-text :title=data.value.satisfaction :className="data.value.bgColor"></circle-text>
            </div>
        </template>
        <template #cell(performance)="data">
            <div class="justify-between text-dark">
                <span>{{ data.value.performance }}
                </span>
            </div>
        </template>
        <!-- <template #cell_action="data">
                      <bib-button pop="horizontal-dots">
                          <template v-slot:menu>
                              <div class="list">
                                  <span class="list__item" @click="handleAction_Table(data)">View profile</span>
                                  <span class="list__item">Edit</span>
                                  <span class="list__item">Delete</span>
                              </div>
                          </template>
                      </bib-button>
                    </template>
                 -->
    </custom-table>
</template>
  
<script>
  import { TABLE_SECTIONS, TABLE_FIELDS} from '../../../utils/constant/Constant.js'

export default {
    data() {
        return {
            tableFields:TABLE_FIELDS,
            tableSections:TABLE_SECTIONS,
            attendanceClass:[],
            satisfaction:""
        }

    },
    mounted(){
        for (let i = 0; i < this.tableSections.length; i++) {
            var percentageValue = this.tableSections[i].attendance.replace(/%\s?/g, '');
            //  this.attendanceValue.push(percentageValue )
            if(percentageValue >=70){
                this.attendanceClass.push('variant_green')
            }
            if(percentageValue <=50){
                this.attendanceClass.push('variant_gray')
            }
    }
    console.log(this.attendanceClass, "class")
    },
    methods: {
        handleItemClick_Table(item) {
            console.log('table item clicked:', item)
        },
        handleAction_Table(data) {
            console.log(data)
        }
    }

}
</script>
  
<style lang="scss">
.info_wrapper{
    color:$black;
    font-weight: normal;
}
.title{
        font-size: 14px;
        font-weight: 600;
    }
    .description{
        font-size: 14px;
        font-weight: normal;
        color:$black;
}
.variant_green{
    background: #D6F7D5;
}
.variant_yellow{
    background: #F7F3D5;
}
.variant_light_pink{
    background: #F6D5D5;
}
.variant_gray{
    background: #F2F2F5;
}
</style>