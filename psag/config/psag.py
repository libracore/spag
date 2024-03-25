from __future__ import unicode_literals
from frappe import _

def get_data():
    return[
        {
            "label": _("Selling"),
            "icon": "fa fa-tools",
            "items": [
				{
                   "type": "doctype",
                   "name": "Item",
                   "label": _("Item"),
                   "description": _("Item")
                },
                {
                   "type": "doctype",
                   "name": "Customer",
                   "label": _("Customer"),
                   "description": _("Customer")
                },
                {
                   "type": "doctype",
                   "name": "Quotation",
                   "label": _("Quotation"),
                   "description": _("Quotation")
                },
                {
                   "type": "doctype",
                   "name": "Sales Order",
                   "label": _("Sales Order"),
                   "description": _("Sales Order")
                },
                {
                   "type": "doctype",
                   "name": "Delivery Note",
                   "label": _("Delivery Note"),
                   "description": _("Delivery Note")
                },
                {
                   "type": "doctype",
                   "name": "Sales Invoice",
                   "label": _("Sales Invoice"),
                   "description": _("Sales Invoice")
                }
            ]
        },
        {
            "label": _("Field Service"),
            "icon": "fa fa-tools",
            "items": [
                {
                   "type": "doctype",
                   "name": "Application Site",
                   "label": _("Application Site"),
                   "description": _("Application Site")
                },
                {
                   "type": "doctype",
                   "name": "Maintenance Event",
                   "label": _("Maintenance Event"),
                   "description": _("Maintenance Event")
                },
                {
                   "type": "report",
                   "name": "Open Maintenance Events",
                   "doctype": "Maintenance Event",
                   "is_query_report": True
                },
                {
                   "type": "doctype",
                   "name": "Service Event",
                   "label": _("Service Event"),
                   "description": _("Service Event")
                },
                {
                   "type": "page",
                   "name": "service-map",
                   "label": _("Service Map"),
                   "description": _("Service Map")
                }
                
            ]
        },
        {
            "label": _("Settings"),
            "icon": "fa fa-tools",
            "items": [
                {
                   "type": "doctype",
                   "name": "Responsible",
                   "label": _("Responsible"),
                   "description": _("Responsible")
                }
            ]
        }
    ]
