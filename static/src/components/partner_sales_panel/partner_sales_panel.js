import { Component } from "@odoo/owl";

export class PartnerSalesPanel extends Component {
    setup() {
        this.state = {
            orders: []
        };
    }

    async loadOrders(partnerId) {
        if (!partnerId) return;
        const orders = await this.env.services.orm.searchRead(
            'sale.order',
            [['partner_id', '=', partnerId]],
            ['name', 'date_order', 'state', 'amount_total']
        );
        this.state.orders = orders;
    }
}
PartnerSalesPanel.template = 'mail.PartnerSalesPanel';