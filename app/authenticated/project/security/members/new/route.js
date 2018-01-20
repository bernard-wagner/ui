import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import { hash } from 'rsvp';

export default Route.extend({
  globalStore: service(),

  model() {
    const gs = get(this, 'globalStore');
    const pid = this.paramsFor('authenticated.project');

    return hash({
      users: gs.findAll('user').then(users => users.filter(u => !u.hasOwnProperty('me'))),
      project: gs.find('project', pid.project_id, {forceReload: true}),
      roles: gs.find('roleTemplate', null, {forceReload: true}),
    });
  },
  setupController(controller, model) {
    this._super(controller, model);
    let dfu = get(model, 'users.firstObject');
    controller.setProperties({
      defaultUser: dfu,
    })
  },
});
