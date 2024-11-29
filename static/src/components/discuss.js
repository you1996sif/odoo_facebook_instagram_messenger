/** @odoo-module **/

import { _t } from "@web/core/l10n/translation";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { Component, useState } from "@odoo/owl";

export class PartnerSalesPanel extends Component {
    static template = "odoo_facebook_instagram_messenger.PartnerSalesPanel";

    setup() {
        this.orm = useService("orm");
        this.state = useState({
            orders: [],
            isLoading: false
        });
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

registry.category("discuss.side_panel").add("partner_sales", {
    component: PartnerSalesPanel,
    icon: "fa-shopping-cart",
    label: _t("Sales Orders"),
    order: 15,
});