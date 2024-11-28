/** @odoo-module **/

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";

class DiscussSalesSection extends Component {
    static template = "odoo_facebook_instagram_messenger.DiscussSalesSection";
    static props = {
        thread: Object,
    };

    setup() {
        this.saleOrders = [];
        this.loadSaleOrders();
    }

    async loadSaleOrders() {
        if (this.props.thread) {
            const result = await this.env.services.rpc({
                model: 'discuss.channel',
                method: 'get_sale_orders',
                args: [this.props.thread.id],
            });
            this.saleOrders = result || [];
        }
    }
}

registry.category("discuss").add("sales_section", {
    component: DiscussSalesSection,
});