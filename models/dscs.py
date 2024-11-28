from odoo import models, fields, api

class DiscussSales(models.Model):
    _name = 'discuss.sales'
    _description = 'Discuss Sales Orders'

    channel_id = fields.Many2one('discuss.channel', string='Channel')
    partner_id = fields.Many2one('res.partner', string='Customer')
    sale_order_ids = fields.One2many('sale.order', 'partner_id', related='partner_id.sale_order_ids')
    sale_count = fields.Integer(compute='_compute_sale_count')

    @api.depends('sale_order_ids')
    def _compute_sale_count(self):
        for record in self:
            record.sale_count = len(record.sale_order_ids)

    @api.model
    def create_from_channel(self, channel):
        partner = channel.channel_partner_ids.filtered(lambda p: p != self.env.user.partner_id)
        if partner:
            return self.create({
                'channel_id': channel.id,
                'partner_id': partner.id
            })