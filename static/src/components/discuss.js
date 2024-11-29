/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component, useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { onMounted } from "@odoo/owl";

export class PartnerSalesPanel extends Component {
    static template = "odoo_facebook_instagram_messenger.PartnerSalesPanel";
    
    setup() {
        this.orm = useService("orm");
        this.threadService = useService("mail.thread");
        
        this.state = useState({
            orders: [],
            isLoading: false,
            currentPartnerId: null
        });

        onMounted(() => {
            this.threadService.subscribe("THREAD_SELECTED", this.onThreadSelected.bind(this));
        });
    }

    async onThreadSelected(thread) {
        if (thread?.correspondent) {
            this.state.currentPartnerId = thread.correspondent.id;
            await this.loadOrders(this.state.currentPartnerId);
        }
    }

    async loadOrders(partnerId) {
        if (!partnerId) return;
        this.state.isLoading = true;
        try {
            this.state.orders = await this.orm.searchRead(
                "sale.order",
                [["partner_id", "=", partnerId]],
                ["name", "date_order", "state", "amount_total"]
            );
        } finally {
            this.state.isLoading = false;
        }
    }
}

registry.category("discuss.side_panel").add("partner_sales", {
    component: PartnerSalesPanel,
});