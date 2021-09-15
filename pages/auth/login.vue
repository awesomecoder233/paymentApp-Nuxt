<template>
  <div>
    <v-form
      @submit.prevent="userLogin"
      style="max-width: 500px; margin-top: 10%;"
    >
      <div>
        <h3>User Authentication Information</h3>
      </div>
      <div>
        <label>Username</label>
        <v-text-field type="text" v-model="login.username" id="username" />
      </div>
      <div>
        <label>Password</label>
        <v-text-field type="password" v-model="login.password" id="password" />
      </div>
      <div>
        <v-btn type="submit">Login</v-btn>
      </div>
    </v-form>
  </div>
</template>
<script src="./user.js" type="javascript"></script>
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
