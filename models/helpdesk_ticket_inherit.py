# Create a new file named helpdesk_ticket_inherit.py

from odoo import models, fields, api

class HelpdeskTicket(models.Model):
    _inherit = 'helpdesk.ticket'

    instagram_history_id = fields.Many2one('instagram.history', string='Instagram Conversation')
    
    
    
    
   
    
    def action_view_instagram_conversation(self):
        self.ensure_one()
        return {
            'type': 'ir.actions.act_window',
            'name': 'Instagram Conversation',
            'res_model': 'instagram.history',
            'res_id': self.instagram_history_id.id,
            'view_mode': 'form',
            'view_type': 'form',
            'target': 'current',
        }