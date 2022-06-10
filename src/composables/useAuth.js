import { reactive, toRefs } from 'vue';
import { provideApolloClient } from '@vue/apollo-composable';
import { apolloClient } from '@/lib/apollo';
import { useMutation, useQuery } from '@vue/apollo-composable';
import { LOGIN_USER, GET_CART, SIGNUP_USER } from '@/graphql';
import { useToast, POSITION } from 'vue-toastification';
import router from '@/router';

provideApolloClient(apolloClient);
const toast = useToast();

const state = reactive({
  isAuthenticated: localStorage.getItem('accessToken') ? true : false,
});

export const useAuth = () => {
  const login = (email, password) => {
    const {
      mutate: login,
      onDone,
      onError,
    } = useMutation(LOGIN_USER, {
      refetchQueries: [{ query: GET_CART }],
    });

    login({
      email,
      password,
    });

    onDone(({ data }) => {
      const { accessToken } = data.login;
      localStorage.setItem('accessToken', accessToken);
      state.isAuthenticated = true;
      router.push('/');
      useQuery(GET_CART);
    });

    onError(({ graphQLErrors }) => {
      toast.error(graphQLErrors[0].message, {
        position: POSITION.TOP_CENTER,
      });
    });
  };

  const signup = (name, email, password) => {
    const {
      mutate: signup,
      onDone,
      onError,
    } = useMutation(SIGNUP_USER, {
      refetchQueries: [{ query: GET_CART }],
    });

    signup({
      name,
      email,
      password,
    });

    onDone(({ data }) => {
      const { accessToken } = data.signup;
      localStorage.setItem('accessToken', accessToken);
      state.isAuthenticated = true;
      router.push('/');
    });

    onError(({ graphQLErrors }) => {
      toast.error(graphQLErrors[0].message, {
        position: POSITION.TOP_CENTER,
      });
    });
  };
  const logout = () => {
    localStorage.removeItem('accessToken');
    state.isAuthenticated = false;
    router.push('/login');
    apolloClient.resetStore();
    window.location.reload();
  };

  return {
    ...toRefs(state),
    login,
    logout,
    signup,
  };
};
