import { useRoute } from 'vue-router';

export function getRouteQuery() {

  const { query } = useRoute();

  return query
}