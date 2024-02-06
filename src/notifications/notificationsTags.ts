import OneSignal from "react-native-onesignal";

export function tagUserEmailCreate(email: string){
    OneSignal.sendTag('user_email', email);
}

export function tagsUserInfoCreate(){
    OneSignal.sendTags({
        'user_name': 'Fábio Rocha',
        'user_email' : 'rochafabio462@gmail.com'
    });
}

export function tagCartUpdate(itemsCount: string){
    OneSignal.sendTag('cart_itens_count', itemsCount);
}