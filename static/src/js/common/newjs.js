/** @odoo-module **/
import { registerMessagingComponent } from '@mail/utils/messaging_component';

const { Component } = owl;

export class SaleOrders extends Component {
    setup() {
        super.setup();
        this.saleOrders = this.props.thread.saleOrders;
    }
}

Object.assign(SaleOrders, {
    template: 'discuss.channel.SaleOrders',
});

registerMessagingComponent(SaleOrders);