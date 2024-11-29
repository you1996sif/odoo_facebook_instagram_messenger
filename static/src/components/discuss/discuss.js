// static/src/components/discuss/discuss.js
import { patch } from "@web/core/utils/patch";
import { Discuss } from "@mail/components/discuss/discuss";
import { PartnerSalesPanel } from "../partner_sales_panel/partner_sales_panel";

patch(Discuss.prototype, {
    setup() {
        super.setup();
        this.salesPanel = new PartnerSalesPanel();
    }
});