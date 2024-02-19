<!-- =========================================================================================
  File Name: UserList.vue
  Description: User List page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: https://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>

  <div id="page-user-list">

    <!-- <vx-card ref="filterCard" title="Filters" class="user-list-filters mb-8" actionButtons @refresh="resetColFilters" @remove="resetColFilters">
      <div class="vx-row">
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">Role</label>
          <v-select :options="roleOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="roleFilter" class="mb-4 md:mb-0" />
        </div>
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">Status</label>
          <v-select :options="statusOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="statusFilter" class="mb-4 md:mb-0" />
        </div>
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">Verified</label>
          <v-select :options="isVerifiedOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="isVerifiedFilter" class="mb-4 sm:mb-0" />
        </div>
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">Department</label>
          <v-select :options="departmentOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="departmentFilter" />
        </div>
      </div>
    </vx-card> -->

    <div class="vx-card p-6">

      <div class="flex flex-wrap items-center">

        <!-- ITEMS PER PAGE -->
        <!-- <div class="flex-grow">
          <vs-dropdown vs-trigger-click class="cursor-pointer">
            <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
              <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ chanels.length - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : chanels.length }} of {{ chanels.length }}</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>
            <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button>
            <vs-dropdown-menu>

              <vs-dropdown-item @click="gridApi.paginationSetPageSize(10)">
                <span>10</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">
                <span>20</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(25)">
                <span>25</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(30)">
                <span>30</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div> -->

        <!-- TABLE ACTION COL-2: SEARCH & EXPORT AS CSV -->
          <vs-input class="sm:mr-4 mr-0 sm:w-auto w-full sm:order-normal order-3 sm:mt-0 mt-4" v-model="multiFilterArray.name" @input="updateSearchQuery" placeholder="Search..." />

          <div class="btn-add-new p-2 mb-1 mr-3 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary">
          <span class="feather-icon select-none relative">
            <router-link to="/admin/categories/create">
              <span class="ml-2 text-base text-primary">  إضـافــه  </span>
            </router-link>
              <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus h-4 w-4">
                <line x1="12" y1="5" x2="12" y2="19">
                </line><line x1="5" y1="12" x2="19" y2="12"></line>
              </svg> -->
          </span>
        </div>
          <!-- <vs-button class="mb-4 md:mb-0" @click="gridApi.exportDataAsCsv()">Export as CSV</vs-button> -->

          <!-- ACTION - DROPDOWN -->
          <!-- <vs-dropdown vs-trigger-click class="cursor-pointer">

            <div class="p-3 shadow-drop rounded-lg d-theme-dark-light-bg cursor-pointer flex items-end justify-center text-lg font-medium w-32">
              <span class="mr-2 leading-none">Actions</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>

            <vs-dropdown-menu>

              <vs-dropdown-item>
                <span class="flex items-center">
                  <feather-icon icon="TrashIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>Delete</span>
                </span>
              </vs-dropdown-item>

              <vs-dropdown-item>
                <span class="flex items-center">
                  <feather-icon icon="ArchiveIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>Archive</span>
                </span>
              </vs-dropdown-item>

              <vs-dropdown-item>
                <span class="flex items-center">
                  <feather-icon icon="FileIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>Print</span>
                </span>
              </vs-dropdown-item>

              <vs-dropdown-item>
                <span class="flex items-center">
                  <feather-icon icon="SaveIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>CSV</span>
                </span>
              </vs-dropdown-item>

            </vs-dropdown-menu>
          </vs-dropdown> -->
      </div>


      <!-- AgGrid Table -->
      <ag-grid-vue
        ref="agGridTable"
        :components="components"
        :gridOptions="gridOptions"
        class="ag-theme-material w-100 my-4 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="categoryData"
        colResizeDefault="shift"
        :animateRows="true"
        :floatingFilter="true"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :suppressPaginationPanel="true"
        :enableRtl="!$vs.rtl">
      </ag-grid-vue>

      <vs-pagination
        :total="totalPages"
        :max="10"
        v-model="currentPage" />

    </div>
  </div>

</template>

<script>
import { AgGridVue } from "ag-grid-vue"
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'
import vSelect from 'vue-select'

// Store Module
import moduleCategoryManagement from '@/store/category-management/moduleCategoryManagement.js'

// Cell Renderer
import CellRendererLink from "./cell-renderer/CellRendererLink.vue"
import CellRendererStatus from "./cell-renderer/CellRendererStatus.vue"
import CellRendererVerified from "./cell-renderer/CellRendererVerified.vue"
import CellRendererActions from "./cell-renderer/CellRendererActions.vue"


export default {
  components: {
    AgGridVue,
    vSelect,

    // Cell Renderer
    CellRendererLink,
    CellRendererStatus,
    CellRendererVerified,
    CellRendererActions,
  },
  data() {
    return {
      currentPagee: 1,

      isVerifiedFilter: { label: 'All', value: 'all' },
      multiFilterArray: {
        'page':1,
        'name':null
      },

      searchQuery: "",

      // AgGrid
      gridApi: null,
      gridOptions: {},
      defaultColDef: {
        sortable: true,
        resizable: true,
        suppressMenu: true
      },
      columnDefs: [
        {
          headerName: 'الإجراءات',
          field: 'transactions',
          width: 125,
          cellRendererFramework: 'CellRendererActions',
        },
        {
          headerName: 'العرض بالرئيسيه',
          field: 'display_in_home',
          filter: true,
          width: 350,
          cellRendererFramework: 'CellRendererStatus'
        },
        {
          headerName: "الإســم",
          field: 'name',
          filter: true,
          width: 450,
          cellRendererFramework: 'CellRendererLink'
        },
        {
          headerName: 'التسلسل',
          field: 'id',
          width: 125,
          filter: true,
          checkboxSelection: true,
          headerCheckboxSelectionFilteredOnly: true,
          headerCheckboxSelection: true,
        },
      ],

      // Cell Renderer Components
      components: {
        CellRendererLink,
        CellRendererStatus,
        CellRendererVerified,
        CellRendererActions,
      }
    }
  },
  watch: {
    roleFilter(obj) {
      this.setColumnFilter("role", obj.value)
    },
    statusFilter(obj) {
      this.setColumnFilter("status", obj.value)
    },
    isVerifiedFilter(obj) {
      let val = obj.value === "all" ? "all" : obj.value == "yes" ? "true" : "false"
      this.setColumnFilter("is_verified", val)
    },
    departmentFilter(obj) {
      this.setColumnFilter("department", obj.value)
    },
  },
  computed: {
    categoryData() {
      return this.$store.state.categoryManagement.categories.data
    },
    allData() {
      return this.$store.state.categoryManagement.categories.meta
    },
    paginationPageSize() {
      if(this.allData) return  Number(this.allData.per_page)
      else return 15
    },
    totalPages() {
      if(this.allData) return  Number(this.allData.last_page)
      else return 0
    },
    currentPage: {
      get() {
        // console.log(val)
          // this.$store.dispatch("categoryManagement/fetchCategories", this.currentPagee).catch(err => { console.error(err) })
      },
      set(val) {
          this.multiFilterArray.page = val ;
          this.multiFilter()
      }
    }
  },
  methods: {
    setColumnFilter(column, val) {
      const filter = this.gridApi.getFilterInstance(column)
      let modelObj = null

      if(val !== "all") {
        modelObj = { type: "equals", filter: val }
      }

      filter.setModel(modelObj)
      this.gridApi.onFilterChanged()
    },
    resetColFilters() {
      // Reset Grid Filter
      this.gridApi.setFilterModel(null)
      this.gridApi.onFilterChanged()

      // Reset Filter Options
      this.roleFilter = this.statusFilter = this.isVerifiedFilter = this.departmentFilter = { label: 'All', value: 'all' }

      this.$refs.filterCard.removeRefreshAnimation()
    },
    updateSearchQuery(val) {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        if(this.multiFilterArray.name.length > 2 || this.multiFilterArray.name.length == 0) {
          this.multiFilter();
        }
      }, 700);
    },
    multiFilter(){
      this.$store.dispatch("categoryManagement/fetchCategories", this.multiFilterArray ).catch(err => { console.error(err) })
    },
  },
  mounted() {
    this.gridApi = this.gridOptions.api

    if(this.$vs.rtl) {
      const header = this.$refs.agGridTable.$el.querySelector(".ag-header-container")
      header.style.left = "-" + String(Number(header.style.transform.slice(11,-3)) + 9) + "px"
    }
  },
  created() {
    if(!moduleCategoryManagement.isRegistered) {
      this.$store.registerModule('categoryManagement', moduleCategoryManagement)
      moduleCategoryManagement.isRegistered = true
    }
    this.multiFilterArray.page = 1
  }
}

</script>

<style lang="scss">
#page-user-list {
  .user-list-filters {
    .vs__actions {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-58%);
    }
  }
}
</style>
