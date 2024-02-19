
<template>  
  <div id="user-edit-tab-info">
    
    <div class="vx-row">
      <vs-tabs>
        <vs-tab v-for="(value, name, index) in locales " :label="value" :key="index">
          <div class="tab-text">
            <div class="vx-row">
              <div class="vx-col md:w-1/2 w-full">
                <vs-input class="w-full mt-5" label="Title" v-model="category.title[name]" v-validate="'required|min:2'"  :name="'category.title.'+name" />
                <span class="text-danger text-sm"  v-show="errors.has('category.title.'+name)"> {{ errors.first('category.title.'+name) }}</span>
              </div>
            </div>
          </div>
        </vs-tab>
      </vs-tabs>
    </div>
    
    <div class="vx-row">
      <div class="vx-col md:w-1/2 w-full">
          <v-select
            v-model="category.commentators"
            :dir="'ltr' "
            multiple
            placeholder="Choose Commentators"
            label="title"
            :options="commentators"
            :selectable="() => category.commentators.length < 155"
          />
      </div>
    </div>
    <!-- Content Row -->
    <div class="vx-row">
      <div class="vx-col md:w-1/2 w-full mt-5">
        <vs-switch v-model="category.active"></vs-switch>
      </div>
    </div>
    <div class="vx-row">
        <div class="vx-col  w-full">
          <template v-if="category.logo">
              <!-- Image Container -->
              <div class="img-container w-64 mx-auto flex items-center justify-center" >
                <img v-if="category.logo_changed" :src="category.logo" class="mr-8 rounded h-25 w-25" width="250px" height="250px" />
                <img v-else :src="this.$store.state.backendUrl+category.logo" alt="img" class="mr-8 rounded h-25 w-25" width="250px" height="250px" />
            
                  <!-- <img :src="this.$store.state.backendUrl + category.logo" alt="img" class="responsive"> -->
              </div>
              <!-- Image upload Buttons -->
              <div class="modify-img flex justify-between mt-5">
                  <input type="file" class="hidden" ref="updateImgInput" @change="updateCurrImg" accept="image/*">
                  <vs-button class="mr-4" type="flat" @click="$refs.updateImgInput.click()">Update Logo
                  </vs-button>
                  <vs-button type="flat" color="#999" @click="category.logo = null">Remove Logo</vs-button>
              </div>
          </template>
          <div class="upload-img mt-5" v-if="!category.logo">
              <input type="file" class="hidden" ref="uploadImgInput" @change="updateCurrImg" accept="image/*">
              <vs-button @click="$refs.uploadImgInput.click()">Upload Logo</vs-button>
          </div>
        </div>
    </div>
    <!-- Save & Reset Button -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-8 flex flex-wrap items-center justify-end">
          <vs-button class="ml-auto mt-2" @click="save_changes" :disabled="!validateForm  || !this.category.title['ar'] || !this.category.title['en']">
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
      category: JSON.parse(JSON.stringify(this.data)),
      locales:this.$store.state.locales,
      logo_changed: false,
      commentators: []
    }
  },
  computed: {
    title: {
      get() {
        return { label: this.capitalize(this.category.title),  value: this.category.title  }
      },
      set(obj) {
        this.category.title = obj.value
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
        this.$store.dispatch("categoryManagement/updateCategory", this.category)
        .then(res => {
          this.showStoreSuccess()
          this.$router.push({name: 'app-category-list'});
        })
        .catch(err => { console.error(err) })
    },
    showStoreSuccess() {
      this.$vs.notify({
        color: 'success',
        title: 'Category',
        text: 'Category was successfully updated'
      })
    },
    reset_data() {
      this.category = JSON.parse(JSON.stringify(this.data))
    },
    updateCurrImg(input) {
      if (input.target.files && input.target.files[0]) {
        var reader = new FileReader()
        reader.onload = e => {
          this.category.logo = e.target.result
          this.category.logo_changed = true;
        }
        reader.readAsDataURL(input.target.files[0])

        // You can update avatar Here
        // For reference you can check dataList example
        // We haven't integrated it here, because data isn't saved in DB
      }
    },
    fetchCommentators() {
      axios.get("/api/commentators?all=true").then((response) => {
        if (response.status == 200) {
          if (response.data.data.length > 0) {
            let commentators = [];
            response.data.data.forEach(element => {
              console.log(element)
              let obj = {
                'id': element.id,
                'title': element.title,
                'icon': this.$store.state.backendUrl + element.logo,
              };
              commentators.push(obj);
            });
            this.commentators = commentators
          }
        }
      })
    },
  },
  created() {
    this.fetchCommentators()
  }
}
</script>
