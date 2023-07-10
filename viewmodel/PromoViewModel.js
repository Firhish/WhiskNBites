import PromoModel from '../model/PromoModel';

export default class PromoViewModel {
  constructor() {
    this.promoModel = new PromoModel();
  }

  getPromos() {
    return this.promoModel.getPromos()
  }
}