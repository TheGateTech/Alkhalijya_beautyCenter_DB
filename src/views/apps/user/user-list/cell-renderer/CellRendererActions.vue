<template>
    <div :style="{'direction': $vs.rtl ? 'rtl' : 'ltr'}">
      <router-link :to="{ path: '/apps/user/user-edit/' + 268}" >
        <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary text-dark cursor-pointer"/>
      </router-link>
      <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger text-dark cursor-pointer" @click="confirmDeleteRecord" />
    </div>
</template>

<script>
    export default {
        name: 'CellRendererActions',
        methods: {
          confirmDeleteRecord() {
            this.$vs.dialog({
              type: 'confirm',
              color: 'danger',
              title: `Confirm Delete`,
              text: `You are about to delete "${this.params.data.username}"`,
              accept: this.deleteRecord,
              acceptText: "Delete"
            })
          },
          deleteRecord() {
            /* Below two lines are just for demo purpose */
            this.showDeleteSuccess()

            /* UnComment below lines for enabling true flow if deleting user */
            // this.$store.dispatch("userManagement/removeRecord", this.params.data.id)
            //   .then(()   => { this.showDeleteSuccess() })
            //   .catch(err => { console.error(err)       })
          },
          showDeleteSuccess() {
            this.$vs.notify({
              color: 'success',
              title: 'User Deleted',
              text: 'The selected user was successfully deleted'
            })
          }
        }
    }
</script>
