from odoo import models, fields, api

class InstagramHistoryInherit(models.Model):
    _inherit = 'instagram.history'
    
    
    # partner_id = fields.Many2one('res.partner', string='حساب العميل', required=True)
    # facebook_id = fields.Char(related='partner_id.facebook_id', string='ID', store=True)
    client_name = fields.Char(string='اسم العميل ')
    note = fields.Char( string='ملاحظات')
    last_message_date = fields.Datetime(string='Last Message Date')
    conversation_status = fields.Selection([
        ('active', 'Active'),
        ('archived', 'Archived')
    ], default='active', string='Status')
    sale_order_ids = fields.One2many('sale.order', 'partner_id', string='Sale Orders', related='author_id.sale_order_ids')
    order_line_ids = fields.One2many('sale.order.line', compute='_compute_order_lines')
    
    
    street = fields.Char(related='author_id.street', string='Street', readonly=False, required=True)
    street2 = fields.Char(related='author_id.street2', string='Street 2', readonly=False)
    state_id = fields.Many2one(related='author_id.state_id', string='State', readonly=False, required=True)
    city = fields.Char(related='author_id.city', string='City', readonly=False, required=True)
    zip = fields.Char(related='author_id.zip', string='ZIP', readonly=False)
    country_id = fields.Many2one(related='author_id.country_id', string='Country', readonly=False, required=True)
    phone = fields.Char(related='author_id.phone', string='Phone', readonly=False, required=True)
    mobile = fields.Char(related='author_id.mobile', string='Mobile')
    email = fields.Char(related='author_id.email', string='Email', readonly=False)
    website = fields.Char(related='author_id.website', string='Website', readonly=False)
    lang = fields.Selection(related='author_id.lang', string='Language', readonly=False)
    category_id = fields.Many2many(related='author_id.category_id', string='Tags', readonly=False)
    district_id = fields.Many2one(related='author_id.district_id', string='District', readonly=False, required=True)
    
    helpdesk_ticket_ids = fields.One2many('helpdesk.ticket', 'instagram_history_id', string='Helpdesk Tickets')
    ticket_count = fields.Integer(compute='_compute_ticket_count', string='Ticket Count')

    
    
    
    def action_open_create_sale_order_wizard(self):
        self.ensure_one()
        return {
            'type': 'ir.actions.act_window',
            'name': 'Create Sale Order',
            'res_model': 'create.sale.order.wizard',
            'view_mode': 'form',
            'target': 'new',
            'context': {'default_partner_id': self.author_id.id},
        }
    @api.depends('sale_order_ids.order_line')
    def _compute_order_lines(self):
        for record in self:
            record.order_line_ids = record.sale_order_ids.mapped('order_line')
    
        
        
        
    def action_add_sale_order(self):
        return {
            'name': _('Add Sale Order'),
            'type': 'ir.actions.act_window',
            'res_model': 'sale.order',
            'view_mode': 'form',
            'context': {
                'default_partner_id': self.author_id.id,
                'default_origin': f'Facebook Conversation: {self.id}',
            },
            'target': 'new',
        }

    def action_add_order_line(self):
        if not self.sale_order_ids:
            return {
                'type': 'ir.actions.client',
                'tag': 'display_notification',
                'params': {
                    'title': _('No Sale Order'),
                    'message': _('Please create a sale order first.'),
                    'type': 'warning',
                }
            }
        return {
            'name': _('Add Order Line'),
            'type': 'ir.actions.act_window',
            'res_model': 'sale.order.line',
            'view_mode': 'form',
            'context': {
                'default_order_id': self.sale_order_ids[0].id,
            },
            'target': 'new',
        }
        
    def name_get(self):
        return [(rec.id, f"{rec.author_id.name} - Facebook Chat") for rec in self]
    
    def action_archive(self):
        self.write({'conversation_status': 'archived'})

    def action_unarchive(self):
        self.write({'conversation_status': 'active'})
        
        
    
    # def _compute_ticket_count(self):
    #     for record in self:
    #         record.ticket_count = len(record.helpdesk_ticket_ids)

    # def action_create_ticket(self):
    #     """Create a helpdesk ticket from the Facebook conversation."""
    #     self.ensure_one()
        
    #     # Get the last message for the ticket description
    #     last_message = self.message_ids and self.message_ids[0].message or ''
        
    #     # Create the helpdesk ticket
    #     ticket_vals = {
    #         'name': _('Support Request from Facebook - %s') % self.partner_id.name,
    #         'partner_id': self.partner_id.id,
    #         'facebook_conversation_id': self.id,
    #         'description': last_message,
    #         'partner_email': self.partner_id.email,
    #         'partner_phone': self.partner_id.phone or self.partner_id.mobile,
    #     }
        
    #     ticket = self.env['helpdesk.ticket'].create(ticket_vals)
        
    #     # Add a note in the ticket about its creation from Facebook
    #     ticket.message_post(
    #         body=_('This ticket was created from a Facebook conversation'),
    #         message_type='notification'
    #     )
        
    #     # Show the created ticket to the user
    #     return {
    #         'type': 'ir.actions.act_window',
    #         'name': _('Helpdesk Ticket'),
    #         'res_model': 'helpdesk.ticket',
    #         'res_id': ticket.id,
    #         'view_mode': 'form',
    #         'view_type': 'form',
    #         'target': 'current',
    #     }

    # def action_view_tickets(self):
    #     """View all tickets related to this conversation."""
    #     self.ensure_one()
    #     return {
    #         'name': _('Helpdesk Tickets'),
    #         'view_mode': 'tree,form',
    #         'res_model': 'helpdesk.ticket',
    #         'domain': [('instagram_history_id', '=', self.id)],
    #         'type': 'ir.actions.act_window',
    #         'context': {'default_facebook_conversation_id': self.id},
    #     }
        