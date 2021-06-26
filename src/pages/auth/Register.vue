<template>
  <q-page
    class="flex flex-center justify-center content-center full-width"
    :class="{ 'q-pa-lg': isMobile }"
  >
    <q-card class="full-width">
      <q-card-section>
        <q-form class="q-gutter-md" @submit.prevent="register">
          <div class="row">
            <div class="col-6 q-pa-sm">
              <q-input
                outlined
                label="Name"
                v-model="registerForm.name"
                :rules="[
                  val => !!val || 'please enter your name',
                ]"
              />
            </div>
            <div class="col-6 q-pa-sm">
              <q-input
                outlined
                label="First lastname"
                v-model="registerForm.firstLastname"
                :rules="[
                  val => !!val || 'please enter your lastname',
                ]"
              />
            </div>
            <div class="col-12 q-pa-sm">
              <q-input
                outlined
                label="Email"
                v-model="registerForm.email"
                type="email"
                :rules="[
                  val => !!val || 'please enter your email',
                  val => /.+@.+\..+/.test(val) || 'invalid email'
                ]"
              />
            </div>
            <div class="col-12 q-pa-sm">
              <q-input
                outlined
                label="Password"
                v-model="registerForm.password"
                :type="seePassword ? 'text' : 'password'"
                :rules="passwordRules"
              >
                <template v-slot:append>
                  <q-icon
                    :name="seePassword ? 'eva-eye-off-outline' : 'eva-eye-outline'"
                    @click="seePassword = !seePassword"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </div>
            <div class="col-12 q-pa-sm">
              <q-input
                outlined
                label="Confirm password"
                v-model="registerForm.confirmPassword"
                :type="seeConfirmPassword ? 'text' : 'password'"
                :rules="[
                  val => !!val || 'please enter your password',
                  val => val === this.registerForm.password || 'Passwords do not match'
                ]"
              >
                <template v-slot:append>
                  <q-icon
                    :name="seeConfirmPassword ? 'eva-eye-off-outline' : 'eva-eye-outline'"
                    @click="seeConfirmPassword = !seeConfirmPassword"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </div>
          </div>
          <div class="flex flex-center">
            <q-btn
              class="full-width"
              color="red"
              icon-right="person"
              label="sign Up"
              type="submit"
            />
          </div>
          <q-separator/>
          <div class="flex flex-center">
            <span>
              Already have an Account?
                <router-link class="link" :to="{name: 'login'}">
                  Sing In
                </router-link>
            </span>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: "Register",
  data: () => ({
    seePassword: false,
    seeConfirmPassword: false,
    registerForm: {
      name: '',
      firstLastname: '',
      secondLastname: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    passwordRules: [
      val => !!val || 'please enter your password',
      val => (val && val.length >= 7) || 'Password must be longer than 8 characters',
      val => /(?=.*[A-Z])/.test(val) || 'Must have at least one uppercase character',
      val => /(?=.*\d)/.test(val) || 'Must have at least one number'
    ]
  }),

  computed: {
    isMobile () {
      return this.$q.platform.is.mobile
    }
  },

  methods: {
    ...mapActions('UserModule', ['registerUser']),
    register () {
      this.registerUser(this.registerForm)
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
