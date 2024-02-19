
<template>  
  <div id="user-edit-tab-info">
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
      <div class="vx-col md:w-1/2 w-full mt-5">
        <vs-switch v-model="service.active"></vs-switch>
      </div>
    </div>
    <!-- Save & Reset Button -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-8 flex flex-wrap items-center justify-end">
          <vs-button class="ml-auto mt-2" @click="save_changes" :disabled="!validateForm  || !this.service.title['ar'] || !this.service.title['en']">
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
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      service: JSON.parse(JSON.stringify(this.data)),
      locales:this.$store.state.locales,
      logo_changed: false,
    }
  },
  computed: {
    title: {
      get() {
        return { label: this.capitalize(this.service.title),  value: this.service.title  }
      },
      set(obj) {
        this.service.title = obj.value
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
        this.$store.dispatch("serviceManagement/updateService", this.service)
        .then(res => {
          this.showStoreSuccess()
          this.$router.push({name: 'app-service-list'});
        })
        .catch(err => { console.error(err) })
    },
    showStoreSuccess() {
      this.$vs.notify({
        color: 'success',
        title: 'Service',
        text: 'Service was successfully updated'
      })
    },
    reset_data() {
      this.service = JSON.parse(JSON.stringify(this.data))
    },
    updateCurrImg(input) {
      if (input.target.files && input.target.files[0]) {
        var reader = new FileReader()
        reader.onload = e => {
          this.service.logo = e.target.result
          this.service.logo_changed = true;
        }
        reader.readAsDataURL(input.target.files[0])

        // You can update avatar Here
        // For reference you can check dataList example
        // We haven't integrated it here, because data isn't saved in DB
      }
    },
  }
}
</script>
