
export default class StatsModel {
    name: string;

    date: string;

    value: number;

    constructor(model: StatsModel) {
        this.name = model.name;
        this.date = model.date;
        this.value = model.value;
    }
}