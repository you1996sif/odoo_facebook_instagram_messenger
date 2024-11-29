// odoo.define('odoo_facebook_instagram_messenger.discuss_extension', function (require) {
//     'use strict';

//     const { Component } = owl;
//     const { useState } = owl.hooks;
//     const { patch } = require('web.utils.patch');
//     const Discuss = require('@mail/components/discuss/discuss');

//     class PartnerSalesPanel extends Component {
//         setup() {
//             this.state = useState({
//                 orders: []
//             });
//         }

//         async loadOrders(partnerId) {
//             if (!partnerId) return;
//             const orders = await this.env.services.orm.searchRead(
//                 'sale.order',
//                 [['partner_id', '=', partnerId]],
//                 ['name', 'date_order', 'state', 'amount_total']
//             );
//             this.state.orders = orders;
//         }
//     }
//     PartnerSalesPanel.template = 'mail.PartnerSalesPanel';

//     patch(Discuss.prototype, 'odoo_facebook_instagram_messenger/static/src/discuss_extension.js', {
//         setup() {
//             this._super.apply(this, arguments);
//             this.salesPanel = new PartnerSalesPanel();
//         }
//     });
// });