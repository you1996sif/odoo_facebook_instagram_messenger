/** @odoo-module **/

import { _t } from "@web/core/l10n/translation";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { Component, useState } from "@odoo/owl";
import { ThreadView } from "@mail/core/common/thread_view";

export class PartnerSalesPanel extends Component {
    static template = "odoo_facebook_instagram_messenger.PartnerSalesPanel";
    static components = { ThreadView };

    setup() {
        this.threadService = useService("mail.thread");
        this.orm = useService("orm");
        this.state = useState({
            orders: [],
            isLoading: false
        });
        this.threadService.subscribe("CURRENT_PARTNER_ID_CHANGED", this.onPartnerChanged.bind(this));
    }

    async onPartnerChanged(partnerId) {
        await this.loadOrders(partnerId);
    }

    async loadOrders(partnerId) {
        if (!partnerId) return;
        this.state.isLoading = true;
        try {
            this.state.orders = await this.orm.searchRead("sale.order", [["partner_id", "=", partnerId]], ["name", "date_order", "state", "amount_total"]);
        } finally {
            this.state.isLoading = false;
        }
    }
}

registry.category("mail.discuss.side_panel").add("partner_sales", {
    component: PartnerSalesPanel,
    icon: "fa-shopping-cart",
    label: _t("Sales Orders"),
    order: 15,
});