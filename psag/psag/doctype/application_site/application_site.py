# -*- coding: utf-8 -*-
# Copyright (c) 2024, libracore AG and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from psag.psag.utils import get_gps_coordinates

class ApplicationSite(Document):
	pass

@frappe.whitelist()	
def set_address_display_and_gps(address):
	address_sql = frappe.db.sql("""SELECT
								`address_line1`,
								`address_line2`,
								`pincode`,
								`city`,
								`country`
								FROM `tabAddress`
								WHERE `name` = '{address}'""".format(address=address), as_dict=True)
	
	html = frappe.db.get_value("Address Template", "Switzerland", "template")
	
	address_display = frappe.render_template(html, address_sql[0])
	
	gps_coordinates = get_gps_coordinates(address_sql[0].address_line1, address_sql[0].city)
	
	return address_display, gps_coordinates
