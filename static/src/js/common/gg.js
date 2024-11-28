/** @odoo-module **/

import { DiscussThread } from '@mail/discuss/thread';
import { patch } from '@web/core/utils/patch';

patch(DiscussThread.prototype, 'sale_orders', {
    setup() {
        this._super(...arguments);
        this.saleOrders = [];
        this.showSales = false;
    },

    async loadSaleOrders() {
        const result = await this.rpc('/discuss/sales/' + this.thread.id);
        this.saleOrders = result.sales;
        this.showSales = true;
        this.render();
    }
});