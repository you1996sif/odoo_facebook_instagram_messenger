
import { Component } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { registry } from "@web/core/registry";

export class PartnerSalesPanel extends Component {
    static template = "discuss_sales.PartnerSalesPanel";
    
    setup() {
        this.orm = useService("orm");
        this.state = useState({ orders: [] });
    }

    async loadOrders(partnerId) {
        if (!partnerId) return;
        this.state.orders = await this.orm.searchRead(
            "sale.order",
            [["partner_id", "=", partnerId]],
            ["name", "date_order", "state", "amount_total"]
        );
    }
}