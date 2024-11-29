{
    "name": "asdfnewOdoo Facebook Messenger Integration | Odoo Instagram Messaging Integration | Bidirectional with Facebook/Instagram Graph API by Meta",
    "version": "17.0.0.5",
    "summary": """Odoo Facebook Messenger Integration and Odoo Instagram Messaging Integration (Bidirectional) with Facebook/Instagram Graph API by Meta
        Facebook
        Instagram
        Instagram Messenger
        Instagram connector
        Facebook connector
        Facebook Messenger
        Odoo Facebook
        Odoo Instagram
        Messenger
        Odoo Integration Facebook
        Odoo Integration Instagram
        Odoo Facebook Messenger
        Odoo Instagram Messenger""",
    "description": """Odoo Facebook Messenger Integration and Odoo Instagram Messaging Integration (Bidirectional) with Facebook/Instagram Graph API by Meta
        Facebook
        Instagram
        Instagram Messenger
        Instagram connector
        Facebook connector
        Facebook Messenger
        Odoo Facebook
        Odoo Instagram
        Messenger
        Odoo Integration Facebook
        Odoo Integration Instagram
        Odoo Facebook Messenger
        Odoo Instagram Messenger
    """,
    "category": "Discuss",
    "author": "TechUltra Solutions Private Limited",
    "website": "https://www.techultrasolutions.com",
    "company": "TechUltra Solutions Private Limited",
    "maintainer": "TechUltra Solutions",
    "license": "OPL-1",
    "depends": ["base", "mail","sale_management","helpdesk",'sale', 'mail'],
    "data": [
        "security/ir.model.access.csv",
        "wizard/messenger_compose_message_view.xml",
        "wizard/instagram_compose_message_view.xml",
        'wizard/create_sale_order_wizard_views.xml',
        "views/mail_channel.xml",
        "views/messenger_provider_base.xml",
        "views/messenger_history_views.xml",
        "views/instagram_history_views.xml",
        "views/messenger_channel_provider_line_views.xml",
        "views/res_partner_views_inherit.xml",
        "views/res_users_inherit.xml",
        "views/messenger_template_views.xml",
        "views/template_buttons_views.xml",
        "views/template_components_views.xml",
        "views/template_components_views.xml",
        "views/template_components_views.xml",
        # 'views/helpdesk_ticket_views.xml',
    ],
    "assets": {
        "web.assets_backend": [
            "odoo_facebook_instagram_messenger/static/src/xml/AgentsList.xml",
            "odoo_facebook_instagram_messenger/static/src/js/common/**/*",
            'odoo_facebook_instagram_messenger/static/src/components/**/*',
            'odoo_facebook_instagram_messenger/static/src/discuss_extension.js',
            'odoo_facebook_instagram_messenger/static/src/discuss_extension.xml',
           
        ],
    },
    "demo": [],
    "images": [
        "static/description/instaFbBidiraction.gif",
    ],
    "price": 99,
    "currency": "USD",
    "installable": True,
    "application": True,
    "auto_install": False,
}
