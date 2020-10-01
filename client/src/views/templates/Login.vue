<template>
  <div class="login-container">
    <div class="main">
      <div class="logo">
        <img src="../../assets/lab-logo.svg" />
      </div>

      <v-form
        v-model="form.valid"
        class="login-form w100"
        @submit.prevent="onSubmit"
      >
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                id="email"
                v-model="form.data.email"
                :rules="form.rules.email"
                label="Email"
                required
              >
              </v-text-field>
              <v-text-field
                id="password"
                v-model="form.data.password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="form.rules.password"
                :type="showPassword ? 'text' : 'password'"
                name="input-10-1"
                label="Senha"
                hint="Pelo menos 6 caracteres"
                counter
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-btn
                type="submit"
                :disabled="!form.valid || form.loading"
                block
                color="primary"
                @click="submit"
                :loading="form.loading"
              >
                Entrar
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
  </div>
</template>

<script>
import sessionApi from "@/api/sessionApi";
import session from "@/services/session";
import alerty from "@/services/alerty";

export default {
  name: "Login",
  data() {
    return {
      showPassword: false,
      form: {
        valid: false,
        loading: false,
        data: {
          email: "",
          password: ""
        },
        rules: {
          email: [
            v => !!v || "E-mail é obrigatório",
            v => /\S+@\S+\.\S+/.test(v) || "E-mail não é válido"
          ],
          password: [
            v => v.length >= 6 || "Senha precisa ter no mínimo 6 caracteres"
          ]
        }
      }
    };
  },
  methods: {
    resetForm() {
      this.form.loading = false;
    },
    async submit() {
      this.resetForm();
      this.form.loading = true;

      try {
        const response = await sessionApi.create({
          email: this.form.data.email,
          password: this.form.data.password
        });
        session.setToken(response.data.token);
        session.setUser(response.data.user);
        this.$router.push("/panel");
      } catch (error) {
        await alerty("Erro", "Email e/ou senha inválidos", "error");
        this.resetForm();
      }
    }
  }
};
</script>

<style lang="sass">
.login-container
  display: flex
  position: relative
  justify-content: center
  align-items: center
  width: 100%
  height: 100vh

  .login-form
    padding-left: 12px
    padding-right: 12px

  .main
    display: inline-flex
    flex-wrap: wrap
    position: relative
    width: 400px
    min-height: 300px
    align-items: flex-start
    height: fit-content
    max-width: 96%

  .logo
    display: flex
    width: 100%
    justify-content: center

  .logo img
    max-width: 100%
    margin-bottom: -48px
</style>
