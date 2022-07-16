import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
export default {
  state: {
    user: {
      name: "",
      avatar: "",
    },
  },

  getters: {
    getCurrentUser() {
      try {
        const { currentUser }: any = getAuth();
        return currentUser;
      } catch (err: any) {
        throw new Error(err);
      }
    },
  },

  mutations: {
    setUserDetails: async (state: any) => {
      const { currentUser }: any = await getAuth();
      state.user = { ...state.user, ...currentUser };
    },
  },
  actions: {
    async registerUser({ commit }: any, { email, password }: any) {
      try {
        const auth = getAuth();
        const { user }: any = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        commit("setUserDetails");
        return user;
      } catch (err: any) {
        return err.message;
      }
    },
    async loginUser({ commit }: any, { email, password }: any) {
      try {
        const auth = getAuth();
        const { user }: any = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        commit("setUserDetails");
        return user;
      } catch (err: any) {
        return err.message;
      }
    },
    async saveProfile({ commit, state }: any, payload: any) {
      try {
        await updateProfile(state.user, payload);
        commit("setUserDetails");
      } catch (err: any) {
        throw new Error(err);
      }
    },
    async logout({ commit }: any) {
      try {
        const auth = getAuth();
        signOut(auth);
        commit("setUserDetails", {});
      } catch (err: any) {
        throw new Error(err);
      }
    },
  },
};
