<!-- =========================================================================================
  File Name: Profile.vue
  Description: Profile Page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: Pixinvent
  Author URL: https://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div id="profile-page">
        <div class="vx-row">
            <div class="vx-col w-full">
                <vx-card class="mt-base">
                    <div>
                        <div> 
                            <div class="vx-row">
                              <div class="vx-col md:w-1/2 w-full">
                                <vs-input class="w-full mt-5" label="الإســم" v-model="user_info.name" v-validate="'required|min:2'"  :name="'user_info.name'" />
                                <span class="text-danger text-sm"  v-show="errors.has('user_info.name')"> {{ errors.first('user_info.name') }}</span>
                              </div>

                              <div class="vx-col md:w-1/2 w-full">
                                <vs-input class="w-full mt-5" label="الهاتف" v-model="user_info.phone" v-validate="'required|min:2'"  :phone="'user_info.phone'" />
                                <span class="text-danger text-sm"  v-show="errors.has('user_info.phone')"> {{ errors.first('user_info.phone') }}</span>
                              </div>
                            </div>

                            <div class="vx-row">
                              <div class="vx-col md:w-1/2 w-full">
                                <vs-input class="w-full mt-5" label="البريد " v-model="user_info.email" v-validate="'required|min:2'"  :email="'user_info.email'" />
                                <span class="text-danger text-sm"  v-show="errors.has('user_info.email')"> {{ errors.first('user_info.email') }}</span>
                              </div>

                              <div class="vx-col md:w-1/2 w-full">
                                <vs-input class="w-full mt-5" label="الرقم السري" v-model="user_info.password" v-validate="'required|min:2'"  :password="'user_info.password'" />
                                <span class="text-danger text-sm"  v-show="errors.has('user_info.password')"> {{ errors.first('user_info.password') }}</span>
                              </div>
                            </div>
                            <br/>
                            <div class="post-comment">
                                <vs-button @click="updateProfile" size="small">Update</vs-button>
                            </div>
                        </div>
                    </div>
                </vx-card>
            </div>
        </div>
    </div>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'

export default {
  data() {
    return {
      isNavOpen: false,
      userPoll: '',
      user_info: {
        name : null,
        email: null,
        phone: null,
        password: null,
      }, 
    }
  },
  computed: {
    
  },
  methods: {
    updateProfile() {
        alert(7)
    },
  },
  components: {
    videoPlayer,
  },
  mounted() {
    let user_info = JSON.parse(localStorage.getItem('userInfo'))
    this.user_info.name = user_info.name
    this.user_info.phone = user_info.phone
    this.user_info.email = user_info.email
    this.user_info.password = user_info.password

  },
  beforeDestroy() {
    if (!this.wasSidebarOpen) this.$store.commit('TOGGLE_REDUCE_BUTTON', false)
  }
}

</script>


<style lang="scss">
@import "@/assets/scss/vuexy/pages/profile.scss";
</style>
