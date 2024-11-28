/** @odoo-module **/

import { registry } from "@web/core/registry";
import { useEffect } from "@web/core/utils/hooks";
import { DiscussSidebar } from "@mail/discuss/sidebar/discuss_sidebar";

const { Component } = owl;

export class DiscussSales extends Component {
    setup() {
        super.setup();
        this.updateSales();
    }

    updateSales() {
        const channel = this.props.thread;
        if (channel) {
            this.props.updateSaleOrders(channel.id);
        }
    }
}

registry.category("discuss").add("sales_section", {
    component: DiscussSales,
    props: { visible: true },
});