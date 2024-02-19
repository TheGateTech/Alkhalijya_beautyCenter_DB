<template>
  <div id="user-create-tab-info">
    <div class="vx-row">
      <vs-tabs>
        <vs-tab v-for="(value, name, index) in locales " :label="value" :key="index">
          <div class="tab-text">
            <div class="vx-row">
              <div class="vx-col md:w-1/2 w-full">
                <vs-input class="w-full mt-5" label="Title" v-model="service.title[name]" v-validate="'required|min:2'"  :name="'service.title.'+name" />
                <span class="text-danger text-sm"  v-show="errors.has('service.title.'+name)"> {{ errors.first('service.title.'+name) }}</span>
              </div>
            </div>
          </div>
        </vs-tab>
      </vs-tabs>
    </div>
    <!-- Content Row -->
      
    <div class="vx-row">
      <div class="vx-col md:w-1/2 mt-4 w-full">
        <vs-switch v-model="service.active"></vs-switch>
      </div>
    <!-- </div>
    <div class="vx-row"> -->

    </div>
    <!-- Save & Reset Button -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-8 flex flex-wrap items-center justify-end">
          <vs-button id="button-with-loading" class="ml-auto mt-2 vs-con-loading__container" @click="save_changes" :disabled="!validateForm
          || !this.service.title['ar'] || !this.service.title['en'] || saveButtonLoading">
            Save Changes
          </vs-button>
          <vs-button class="ml-4 mt-2" type="border" color="warning" @click="reset_data">Reset</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import axios from "@/axios.js"

export default {
  components: {
    vSelect
  },
  props: {

  },
  data() {
    return {
      locales:this.$store.state.locales,
      unique: true,
      service: {
        title:{"en" : null, "ar" : null},
        logo: null,
        active: 1,
      },
      backgroundLoading:'primary',
      colorLoading:'#fff',
      saveButtonLoading: false,

      statusOptions: [
        { label: "Active",  value: 1 },
        { label: "in Active",  value: 0 },
      ],
    }
  },
  computed: {
    title: {
      get() {
        return { label: this.capitalize(service.title),  value: service.title  }
      },
      set(obj) {
        service.title = obj.value
      }
    },
    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    capitalize(str) {
      return str.slice(0,1).toUpperCase() + str.slice(1,str.length)
    },
    save_changes() {
      if(!this.validateForm) return
      this.saveButtonLoading = true;
      this.$vs.loading({
        background: this.backgroundLoading,
        color: this.colorLoading,
        container: "#button-with-loading",
        scale: 0.45
      })
      this.apiErrors = [];
      this.$store.dispatch("serviceManagement/addService", this.service)
        .then(res => {
          this.showStoreSuccess()
          this.$router.push({name: 'app-service-list'});
        })
        .catch(err => {
        //console.log(err.response.data.errors)
        this.apiErrors = err.response.data.errors
      })
      .then(()=> {
        this.$vs.loading.close("#button-with-loading > .con-vs-loading")
        this.saveButtonLoading = false;
      });
      // Here will go your API call for updating data
      // You can get data in "this.service"

    },
    showStoreSuccess() {
      this.$vs.notify({
        color: 'success',
        title: 'Service',
        text: 'Service was successfully created'
      })
    },
    reset_data() {
      // this.service = JSON.parse(JSON.stringify(this.data))
    },
    updateCurrImg(input) {
      if (input.target.files && input.target.files[0]) {
          var reader = new FileReader()
          reader.onloadend = e => {
              this.service.logo = reader.result
          }
          reader.readAsDataURL(input.target.files[0])
      }
    }
  }
}
</script>
