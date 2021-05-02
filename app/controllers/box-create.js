import Controller from '@ember/controller';
import { inject as service } from "@ember/service";
import mutation from 'leit-ember-apollo/gql/mutations/createBox.graphql';

export default Controller.extend({
  actions: {
    createBox() {
      const description = this.get('description');
      const title = this.get('title');
      let variables = { title, description };
        
      return this.get('apollo')
        .mutate(
          {
            mutation,
            variables
          },
          'box'
        )
        .then(() => {
          this.set('description', '');
          this.set('title', '');
          this.transitionToRoute('boxes');
        }).catch(error => alert(error));
    }
  },

  apollo: service()
});