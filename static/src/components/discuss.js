
import { Component } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { registry } from "@web/core/registry";

export class PartnerSalesPanel extends Component {
    static template = "odoo_facebook_instagram_messenger.PartnerSalesPanel";
    
    setup() {
        this.orm = useService("orm");
        this.state = useState({
            orders: [],
            isLoading: false
        });
    }

    async willStart() {
        await this.loadOrders();
    }

    async loadOrders() {
        this.state.isLoading = true;
        try {
            const currentThread = this.messaging?.discuss?.thread;
            if (currentThread?.correspondent) {
                const partnerId = currentThread.correspondent.id;
                this.state.orders = await this.orm.searchRead(
                    "sale.order",
                    [["partner_id", "=", partnerId]],
                    ["name", "date_order", "state", "amount_total"]
                );
            }
        } catch (error) {
            console.error(error);
        } finally {
            this.state.isLoading = false;
        }
    }
}

registry.category("discuss.side_panel").add("partner_sales", {
    component: PartnerSalesPanel,
});