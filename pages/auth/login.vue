<template>
  <div>
    <v-form class="user-form"
      @submit.prevent="userLogin"
    >
      <div>
        <h3 class="text-title">User Authentication Information</h3>
      </div>
      <div class="form-area">
        <label>Username</label>
        <v-text-field type="text" v-model="login.username" id="username" />
      </div>
      <div>
        <label>Password</label>
        <v-text-field type="password" v-model="login.password" id="password" />
      </div>
      <div>
        <v-btn type="submit" class="form-button">Login</v-btn>
      </div>
    </v-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      login: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    async userLogin() {
      try {
        this.$axios({
          method: 'get',
          url: `/api/test/${this.login.username}/${this.login.password}`,
        })
          .then((response) => {
            if (response.data.message === 'Fail')
              alert('User information is incorrect.')
            else if (response.data.message === 'SUCCESS') {
              localStorage.setItem('username', this.login.username)
              this.$router.push('/')
            }
          })
          .catch((err) => {})
        //
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
