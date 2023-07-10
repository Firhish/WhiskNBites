import database from '@react-native-firebase/database';

export default class PromoModel {
    constructor() {
        this.promos = [];
    }

    getPromos() {
        let data = [];
        database()
            .ref('/Promotions')
            .once('value', (snapshot) => {
                
                if (snapshot.exists()) {
                    snapshot.forEach((child) => {
                        temp = child.val()
                        temp.id = child.key
                        data.push(temp)
                    })
                } else {
                }
            }).then((data)=>{return data});
    }
}