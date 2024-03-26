# -*- coding: utf-8 -*-
# Copyright (c) 2024, libracore AG and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class ServiceEvent(Document):
	pass

@frappe.whitelist()
def get_service_events():
	events = frappe.db.sql("""SELECT
		`tabService Event`.`name`,
		`tabService Event`.`planned_start`,
		`tabService Event`.`planned_end`,
		`tabService Event`.`application_site_name`,
		`tabService Event`.`responsible`,
		`tabService Event`.`status`,
		`tabResponsible`.`color` AS `color`
		FROM `tabService Event`
		LEFT JOIN `tabResponsible` ON `tabResponsible`.`name` = `tabService Event`.`responsible`""", as_dict=True)
	
	return events
	
