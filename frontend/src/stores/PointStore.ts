import { action, makeObservable, observable } from 'mobx';

export default class PointStore {
  @observable points: any[] | null = null;

  constructor() {
    makeObservable(this);
  }

  @action setPoints = (points: any[]) => {
    this.points = points;
  };
};
