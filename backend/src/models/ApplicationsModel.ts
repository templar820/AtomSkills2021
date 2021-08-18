import GoodsModel from './GoodsModel';

export default class ApplicationsModel {
    id: number;

    date: string;

    current_status: string;

    dispatch_date: string;

    arrival_date: string;

    price: number;

    appl_return_id: number;

    goods: GoodsModel[];

    sender_id: number;

    recipient_id: number;

    point_from_id: number;

    point_to_id: number;

    senderResponsibleId: number;

    recipientResponsibleId: number;
    
    route_id: number;

    constructor(obj: ApplicationsModel) {
      this.id = obj.id;
      this.current_status = obj.current_status;
      this.dispatch_date = obj.dispatch_date;
      this.arrival_date = obj.arrival_date;
      this.price = obj.price;
      this.appl_return_id = obj.appl_return_id;
      this.goods = obj.goods;
      this.recipient_id = obj.recipient_id;
      this.sender_id = obj.sender_id;
      this.point_from_id = obj.point_from_id;
      this.point_to_id = obj.point_to_id;
      this.recipientResponsibleId = obj.recipientResponsibleId;
      this.senderResponsibleId = obj.senderResponsibleId;
      this.route_id = obj.route_id;
    }
}
