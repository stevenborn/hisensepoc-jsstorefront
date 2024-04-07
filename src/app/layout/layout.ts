import { LayoutConfig } from "@spartacus/storefront";

export const customerLayoutConfig: LayoutConfig=  {
    layoutSlots:{
        CartPageTemplate:{
            slots: [
                'TopContent',
                'CenterRightContentSlot',
                'CenterLeftContentSlot',
                'EmptyCartMiddleContent',
                'AdImgContentSlot',
                'BottomContentSlot',                
            ],
        },
    },
    
}