<template>
  <div class="flex items-center">
    <vs-avatar :src="this.$store.state.backendUrl + params.data.logo" class="flex-shrink-0 mr-2" size="30px" @click="$router.push(url)" />
    <router-link :to="url" @click.stop.prevent class="text-inherit hover:text-primary">{{ params.value }}</router-link>
  </div>
</template>

<script>
    export default {
        name: 'CellRendererLink',
        computed: {
          url() {
            return "/admin/categories/" + this.params.data.id

            // Below line will be for actual product
            // Currently it's commented due to demo purpose - Above url is for demo purpose
            // return "/apps/user/user-view/" + this.params.data.id
          }
        }
    }
</script>
