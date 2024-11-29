/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component, useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { ThreadService } from "@mail/core/common/thread_service";

class PartnerSalesPanel extends Component {
    static template = "odoo_facebook_instagram_messenger.PartnerSalesPanel";
    static components = { ThreadService };
    
    setup() {
        this.orm = useService("orm");
        this.threadService = useService("mail.thread");
        this.state = useState({
            orders: [],
            isLoading: false
        });
        this._loadInitialData();
    }

    async _loadInitialData() {
        const thread = await this.threadService.getCurrentThread();
        if (thread?.correspondent) {
            await this.loadOrders(thread.correspondent.id);
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

registry.category("discuss.tools").add("partner_sales", {
    component: PartnerSalesPanel,
    icon: "fa-shopping-cart",
    id: "partner_sales",
    label: "Sales Orders"
});