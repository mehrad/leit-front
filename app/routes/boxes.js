import Route from "@ember/routing/route";
import { queryManager } from "ember-apollo-client";
import query from 'leit-ember-apollo/gql/queries/allBoxes.graphql';


export default Route.extend({
    apollo: queryManager(),
  
    model(params) {
      return this.apollo.watchQuery({ query });
    }
  });