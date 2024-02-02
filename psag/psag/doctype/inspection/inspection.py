# -*- coding: utf-8 -*-
# Copyright (c) 2024, libracore AG and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class Inspection(Document):
	pass

@frappe.whitelist()
def set_facility_information(facility, area, volume):
	facility_doc = frappe.get_doc("Facility", facility)
	save = False
	if not facility_doc.area:
		facility_doc.area = area
		save = True
	if not facility_doc.volume:
		facility_doc.volume = volume
		save = True
	if save == True:
		facility_doc.save()
	return
	
	
