<template>
  <q-page
    class="flex flex-center justify-center content-center full-width"
    :class="{ 'q-pa-lg': isMobile }"
  >
    <q-card class="full-width">
      <img src="~/assets/marvel-character-logo.jpg" alt="login-img"/>
      <q-card-section>
        <q-form class="q-gutter-md" @submit.prevent="onSubmit">
          <q-input
            v-model="email"
            label="Email"
            outlined
            type="email"
            :rules="[
              val => !!val || 'please enter your email',
              val => /.+@.+\..+/.test(val) || 'invalid email'
            ]"
          />
          <div class="flex flex-center">
            <q-btn
              class="full-width"
              type="submit"
              color="primary"
              icon-right="lock"
              label="rest password"
            />
          </div>
        </q-form>
        <q-separator class="q-mt-md"/>
        <div class="flex flex-center q-mt-md">
            <span>
              Already have an Account?
                <router-link class="link" :to="{name: 'login'}">
                  Sing In
                </router-link>
            </span>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: "ForgotPassword",

  data: () => ({
    email: ''
  }),

  computed: {
    isMobile () {
      return this.$q.platform.is.mobile
    }
  },

  methods: {
    ...mapActions('UserModule', ['resetPassword']),
    onSubmit () {
      console.log(this.email)
      this.resetPassword({
        email: this.email
      })
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
