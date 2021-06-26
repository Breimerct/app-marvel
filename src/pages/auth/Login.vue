<template>
  <q-page
    class="flex flex-center justify-center content-center full-width"
    :class="{ 'q-pa-lg': isMobile }"
  >
    <q-card class="full-width shadow-2">
      <img src="~/assets/marvel-character-logo.jpg" alt="login-img"/>
      <q-card-section>
        <q-form @submit.prevent="onSubmit" class="q-gutter-md">
          <q-input
            outlined
            label="Email"
            v-model="loginForm.email"
            type="email"
            :rules="[
              val => !!val || 'please enter your email',
              val => /.+@.+\..+/.test(val) || 'invalid email'
            ]"
          />
          <q-input
            outlined
            label="Password"
            v-model="loginForm.password"
            :type="seePassword ? 'text' : 'password'"
            :rules="[val => !!val || 'please enter your password']"
          >
            <template v-slot:append>
              <q-icon
                :name="seePassword ? 'eva-eye-off-outline' : 'eva-eye-outline'"
                @click="seePassword = !seePassword"
                class="cursor-pointer"
              />
            </template>
          </q-input>
          <div class="flex flex-center">
            <q-btn
              class="full-width"
              type="submit"
              color="primary"
              icon-right="send"
              label="LogIn"
            />
          </div>
        </q-form>
        <q-separator class="q-mt-md"/>
        <div class="flex justify-center q-my-md">
          <router-link class="link" :to="{name: 'forgotPassword'}">
            Forgot password
          </router-link>
        </div>
        <div class="flex flex-center q-mt-md">
          <p class="full-width text-center q-ma-none">
            Don't have an account yet?
            <router-link class="link" :to="{name: 'register'}">
              Sign up
            </router-link>
          </p>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: "Login",
  data: () => ({
    seePassword: false,
    loginForm: {
      email: '',
      password: ''
    },
  }),

  computed: {
    isMobile () {
      return this.$q.platform.is.mobile
    }
  },

  methods:{
    ...mapActions('UserModule', ['login']),
    onSubmit () {
      this.login(this.loginForm)
    }
  }
}
</script>

<style scoped lang="scss">
.link {
    color: #1976D2;
}

.q-page {
  min-height: 100vh !important;
}

.q-card {
  max-width: 500px;
}
</style>
