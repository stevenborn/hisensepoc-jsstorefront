import { OutletPosition, provideOutlet } from "@spartacus/storefront";
import { PdpImgComponent } from "../components/pdpImg/pdpImg.component";

export const provideOutLet = [
    provideOutlet({
        id: 'Tabs',
        position: OutletPosition.AFTER,
        component: PdpImgComponent,
    }),


]