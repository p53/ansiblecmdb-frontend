import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('property-pie-chart', 'Integration | Component | property pie chart', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{property-pie-chart}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#property-pie-chart}}
      template block text
    {{/property-pie-chart}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
