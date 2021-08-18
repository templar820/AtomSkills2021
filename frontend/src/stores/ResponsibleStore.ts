import {action, makeObservable, observable} from 'mobx';

export default class ResponsibleStore {
  @observable senders: any[] | null = null;
  @observable recipients: any[] | null = null;

  constructor() {
    makeObservable(this);
  }

  @action setResponsibles = (responsibles: any[], field: 'senders' | 'recipients') => {
    this[field] = responsibles;
  };

  @action addResponsibles = (responsible: any, field: 'senders' | 'recipients') => {
    if (!this[field]) {
      this[field] = [responsible];
    } else {
      this[field].unshift(responsible);
    }
  }
};
