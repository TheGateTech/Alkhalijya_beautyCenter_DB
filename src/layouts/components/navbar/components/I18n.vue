<template>
  <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
    <span class="cursor-pointer flex items-center i18n-locale">
      <img class="h-4 w-5" :src="i18n_locale_img" :alt="alt_img" />
      <span class="hidden sm:block ml-2">{{ getCurrentLocaleData.lang }}</span>
    </span>
    <vs-dropdown-menu class="w-48 i18n-dropdown vx-navbar-dropdown">
      <vs-dropdown-item @click="updateLocale('ar')"><img class="h-4 w-5 mr-1" src="@/assets/images/flags/ar.png" alt="ar" /> &nbsp;العربيه</vs-dropdown-item>
      <vs-dropdown-item @click="updateLocale('en')"><img class="h-4 w-5 mr-1" src="@/assets/images/flags/en.png" alt="en" /> &nbsp;English</vs-dropdown-item>
      <!-- <vs-dropdown-item @click="updateLocale('de')"><img class="h-4 w-5 mr-1" src="@/assets/images/flags/de.png" alt="de" /> &nbsp;German</vs-dropdown-item>
      <vs-dropdown-item @click="updateLocale('pt')"><img class="h-4 w-5 mr-1" src="@/assets/images/flags/pt.png" alt="pt" /> &nbsp;Portuguese</vs-dropdown-item> -->
    </vs-dropdown-menu>
  </vs-dropdown>
</template>

<script>
export default {
  computed: {
    i18n_locale_img() {
      return require(`@/assets/images/flags/${localStorage.getItem('locale')? localStorage.getItem('locale'):  this.$i18n.locale}.png`)
    },
    alt_img() {
      return localStorage.getItem('locale')? localStorage.getItem('locale'):  this.$i18n.locale
    },
    getCurrentLocaleData() {
        const locale =  localStorage.getItem('locale')? localStorage.getItem('locale'):  this.$i18n.locale;
        if (locale == "en"){
          return { flag: "us", lang: 'English'    }
        }      
        else if (locale == "ar") {
          return { flag: "ar", lang: 'العربيه'     }
        }
    },
  },
  methods: {
    updateLocale(locale) {
      this.$i18n.locale = locale;
      localStorage.setItem('locale', locale);
      document.documentElement.setAttribute("dir", locale === "ar" ? "rtl" : "ltr")
      window.location.reload()
    },
  }
}
</script>
