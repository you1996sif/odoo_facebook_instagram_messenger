
import { PartnerSalesPanel } from "./partner_sales_panel";
import { patch } from "@web/core/utils/patch";
import { Discuss } from "@mail/components/discuss/discuss";

patch(Discuss.prototype, {
    setup() {
        super.setup();
        this.salesPanel = useState(new PartnerSalesPanel());
    }
});

registry.category("discuss.side_panel").add("partner_sales", {
    component: PartnerSalesPanel,
});