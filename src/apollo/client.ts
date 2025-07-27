import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://odeon-backend-env.eba-urkfazg5.us-east-1.elasticbeanstalk.com//graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("spotify_access_token");
  const refreshToken = localStorage.getItem("spotify_refresh_token");
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
      "x-refresh-token": refreshToken,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
