

    
 /** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { registry } from "@web/core/registry";

export class PartnerSalesPanel extends Component {
    static template = "odoo_facebook_instagram_messenger.PartnerSalesPanel";
    
    setup() {
        this.notification = useService("notification");
        this.orm = useService("orm");
        this.state = useState({ 
            orders: [],
            isLoading: false,
            error: null
        });
    }

    async loadOrders(partnerId) {
        if (!partnerId) return;
        
        this.state.isLoading = true;
        this.state.error = null;
        
        try {
            this.state.orders = await this.orm.searchRead(
                "sale.order",
                [["partner_id", "=", partnerId]],
                ["name", "date_order", "state", "amount_total"]
            );
        } catch (error) {
            this.state.error = error;
            this.notification.add(error.message, {
                type: "danger",
                sticky: true,
            });
        } finally {
            this.state.isLoading = false;
        }
    }
}

registry.category("discuss.side_panel").add("partner_sales", {
    component: PartnerSalesPanel,
});