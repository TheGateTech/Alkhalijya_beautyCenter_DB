<!-- =========================================================================================
  File Name: UserEditTabInformation.vue
  Description: User Edit Information Tab content
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: https://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="user-create-tab-info">
    <div class="vx-row">
      <vs-tabs>
        <vs-tab v-for="(value, name, index) in locales " :label="value" :key="index">
          <div class="tab-text">
            <div class="vx-row">
              <div class="vx-col md:w-1/2 w-full">
                <vs-input class="w-full mt-5" label="الإســم" v-model="category[`name:${name}`]" v-validate="'required|min:2'"  />
                <!-- <span class="text-danger text-sm"  v-show='errors.has(category["name:"+ name])'> {{ errors.first('category.name.'+name) }}</span> -->
              </div>
            </div>
          </div>
        </vs-tab>
      </vs-tabs>
    </div>
    <!-- Content Row -->
    <div class="vx-row">
      <div class="vx-col  md:w-1/2 w-full">
          <template v-if="category.image">
              <!-- Image Container -->
              <div class="img-container w-64 mx-auto flex items-center justify-center" >
                  <img :src="category.image" alt="img" class="responsive">
              </div>
              <!-- Image upload Buttons -->
              <div class="modify-img flex justify-between">
                  <input type="file" class="hidden" ref="updateImgInput" @change="updateCurrImg" accept="image/*">
                  <vs-button class="mr-image4" type="flat" @click="$refs.updateImgInput.click()">Update Image
                  </vs-button>
                  <vs-button type="flat" color="#999" @click="category.image = null">Remove Image</vs-button>
              </div>
          </template>
          <div class="upload-img text-center" v-if="!category.image">
              <input type="file" class="hidden" ref="updateImgInput" @change="updateCurrImg" accept="image/*">
              <vs-button @click="$refs.updateImgInput.click()">Upload Image</vs-button>
          </div>
      </div>
      <div class="vx-col  md:w-1/2 w-full">
          <template v-if="category.banner">
              <!-- Image Container -->
              <div class="img-container w-64 mx-auto flex items-center justify-center" >
                  <img :src="category.banner" alt="img" class="responsive">
              </div>
              <!-- Image upload Buttons -->
              <div class="modify-img flex justify-between">
                  <input type="file" class="hidden" ref="updateBannerInput" @change="updateCurrBanner" accept="image/*">
                  <vs-button class="mr-4" type="flat" @click="$refs.updateBannerInput.click()">Update Banner</vs-button>
                  <vs-button type="flat" color="#999" @click="category.banner = null">Remove Banner</vs-button>
              </div>
          </template>
          <div class="upload-img text-center" v-if="!category.banner">
              <input type="file" class="hidden" ref="updateBannerInput" @change="updateCurrBanner" accept="image/*">
              <vs-button @click="$refs.updateBannerInput.click()">Upload Banner</vs-button>
          </div>
      </div>
    </div>

    <div class="vx-row">
      <div class="vx-col md:w-1/2 mt-4 w-full">
        <label for="">الحاله</label>
        <vs-switch  v-model="category.active"></vs-switch>
      </div>
      <div class="vx-col md:w-1/2 mt-4 w-full">
        <label for="">العرض بالرئيسيه</label>
        <vs-switch  v-model="category.display_in_home"></vs-switch>
      </div>
    </div>
    <!-- Save & Reset Button -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-8 flex flex-wrap items-center justify-end">
          <vs-button id="button-with-loading" class="ml-auto mt-2 vs-con-loading__container" @click="save_changes" :disabled="!validateForm
          || !this.category[`name:ar`] ||!this.category[`name:en`]  || saveButtonLoading">
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
      category: {
        "name:en" : null,
        "name:ar" : null,
        image: null,
        banner: null,
        display_in_home: 1,
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
    name: {
      get() {
        return { label: this.capitalize(category.name),  value: category.name  }
      },
      set(obj) {
        category.name = obj.value
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
      this.$store.dispatch("categoryManagement/addCategory", this.category)
        .then(res => {
          this.showStoreSuccess()
          this.$router.push({name: 'app-category-list'});
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
      // You can get data in "this.category"

    },
    showStoreSuccess() {
      this.$vs.notify({
        color: 'success',
        title: 'Category',
        text: 'Category was successfully created'
      })
    },
    reset_data() {
      // this.category = JSON.parse(JSON.stringify(this.data))
    },
    updateCurrImg(input) {
      if (input.target.files && input.target.files[0]) {
          var reader = new FileReader()
          reader.onloadend = e => {
              this.category.image = reader.result
          }
          reader.readAsDataURL(input.target.files[0])
      }
    },
    updateCurrBanner(input) {
      if (input.target.files && input.target.files[0]) {
          var reader = new FileReader()
          reader.onloadend = e => {
              this.category.banner = reader.result
          }
          reader.readAsDataURL(input.target.files[0])
      }
    },
  },
   created() {
  }
}
</script>
