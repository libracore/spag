# Copyright (c) 2024, libracore AG and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.utils import flt
from frappe import _
from frappe.utils.data import getdate

def execute(filters=None):
    columns = get_columns()
    data = get_data()
    return columns, data
    

def get_columns():
    columns = [
        {"label": _("Name"), "fieldname": "name", "fieldtype": "Data", "width": 100},
        {"label": _("Application Site"), "fieldname": "application_site", "fieldtype": "Data", "width": 100},
        {"label": _("Application Site Name"), "fieldname": "application_site_name", "fieldtype": "Data", "width": 200},
        {"label": _("Customer Name"), "fieldname": "customer_name", "fieldtype": "Data", "width": 200},
        {"label": _("Next Date"), "fieldname": "next_date", "fieldtype": "Data", "width": 150}
    ]
    return columns

def get_data():
    #get today
    today = getdate()
    #get all open maintenance events
    data = frappe.db.sql("""
							SELECT
								`name`,
								`application_site`,
								`application_site_name`,
								`customer_name`,
								`next_date`
							FROM `tabMaintenance Event`
							WHERE `next_date` <= '{today}'
							AND `disabled` = 0
							ORDER BY `next_date` DESC""".format(today=today), as_dict=True)
   
    return data
