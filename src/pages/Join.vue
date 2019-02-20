  <template>
  <q-layout>
    <div class="join-container">
      <h1 style="margin: 100px auto;text-align:center;color:red">Join</h1>
      <q-field color="black" :error="$v.user.email.$error" :error-label="emailErrorMsg">
        <q-input
          color="black"
          type="email"
          autofocus
          float-label="email"
          v-model.trim.lazy="$v.user.email.$model"
        />
      </q-field>
      <q-field
        color="black"
        :error="$v.user.password.$error"
        helper="비밀번호는 6자 이상 "
        :error-label="passwordErrorMsg"
      >
        <q-input
          color="black"
          type="password"
          float-label="password"
          v-model.trim.lazy="$v.user.password.$model"
        />
      </q-field>
      <q-field
        color="black"
        :error="$v.user.repeatPassword.$error"
        :error-label="repeatPasswordErrorMsg"
      >
        <q-input
          color="black"
          type="password"
          float-label="repeatPassword"
          v-model.trim.lazy="$v.user.repeatPassword.$model"
          @keyup.enter="join"
        />
      </q-field>
      <q-btn
        class="full-width join-btn"
        @click="join"
        :disable="pending"
        color="positive"
        size="lg"
        label="join"
      />
    </div>
  </q-layout>
</template>
<script>
import axios from "axios";
import { AUTH_BASE_URL } from "./../js/global-var";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
        repeatPassword: ""
      },
      pending: false
    };
  },
  computed: {
    emailErrorMsg() {
      if (!this.$v.user.email.required) {
        return "값을 입력해주세요";
      } else if (!this.$v.user.email.email) {
        return "이메일 형식에 맞지 않습니다.";
      }
    },
    passwordErrorMsg() {
      if (!this.$v.user.password.required) {
        return "값을 입력해주세요";
      } else if (!this.$v.user.password.minLength) {
        return "6자 이상 입력해주세요.";
      }
    },
    repeatPasswordErrorMsg() {
      if (!this.$v.user.repeatPassword.required) {
        return "값을 입력해주세요";
      }
      if (!this.$v.user.repeatPassword.sameAsPassword) {
        return "비밀번호가 일치하지 않습니다.";
      }
    }
  },
  validations: {
    user: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      },
      repeatPassword: {
        required,
        sameAsPassword: sameAs("password")
      }
    }
  },
  methods: {
    async join() {
      if (this.$v.$invalid) {
        alert("입력값을 다시 확인해보세요");
      } else {
        this.pending = true;
        try {
          await this.submit(this.user);
          this.user = { email: "", password: "", repeatPassword: "" };
          this.pending = false;
          alert("회원가입 완료! 로그인해주세요!");
          this.$router.replace("/login");
        } catch (error) {
          console.error(error.response.data);
          alert(error.response.data.msg);
          this.user = { email: "", password: "", repeatPassword: "" };
          this.pending = false;
        }
      }
    },
    submit(user) {
      return new Promise(async (resolve, reject) => {
        try {
          let result = await axios({
            method: "post",
            url: "/join",
            data: {
              email: user.email,
              password: user.password
            },
            baseURL: AUTH_BASE_URL
          });
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }
  }
};
</script>
<style>
body {
  background-color: aliceblue;
  overflow: hidden;
}
.join-container {
  margin: 0 auto;
  width: 85%;
}

.join-container .join-btn {
  margin-top: 1rem;
}
</style>
