import { OutletPosition, provideOutlet } from "@spartacus/storefront";
import { PdpImgComponent } from "../components/pdpImg/pdpImg.component";
import { HomeAdimgComponent } from "../components/home-adimg/home-adimg.component";
import { CartAdimgComponent } from "../components/cart-adimg/cart-adimg.component";

export const provideOutLet = [
    provideOutlet({
        id: 'Tabs',
        position: OutletPosition.AFTER,
        component: PdpImgComponent,
    }),

    provideOutlet({
        id: 'CheckoutComponent',
        position: OutletPosition.REPLACE,
        component: CartAdimgComponent,
    }),

]